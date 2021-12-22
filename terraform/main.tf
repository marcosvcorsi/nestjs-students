terraform {
  backend "s3" {}

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~>3.0"
    }
  }
}

provider "aws" {
  profile = "default"
  region  = var.region
}

data "aws_caller_identity" "current" {}

locals {
  account_id = data.aws_caller_identity.current.account_id
}

resource "aws_iam_role" "ecs_task_execution_role" {
  name = "ecsTaskExecutionRole"
  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Sid    = ""
        Principal = {
          Service = [
            "lambda.amazonaws.com",
            "ecs-tasks.amazonaws.com",
            "batch.amazonaws.com"
          ]
        }
      },
    ]
  })
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role_ssm_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"
}

resource "aws_iam_role_policy_attachment" "ecs_tasks_execution_role_ecs_attachment" {
  role       = aws_iam_role.ecs_task_execution_role.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_cloudwatch_log_group" "log_group" {
  name = var.service_name
}

resource "aws_ecs_task_definition" "task_definition" {
  family                   = "${var.environment}-${var.service_name}-td"
  requires_compatibilities = ["EC2"]
  memory                   = "128"
  execution_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  container_definitions = jsonencode([
    {
      name  = "podcast-api"
      image = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${var.region}.amazonaws.com/podcasts-api:${var.image_tag}"
      portMappings = [
        {
          containerPort = 3000
        }
      ]
      secrets = [
        {
          name      = "JWT_SECRET"
          valueFrom = "arn:aws:ssm:${var.region}:${data.aws_caller_identity.current.account_id}:parameter/JWT_SECRET"
        }
      ]
      logConfiguration = {
        logDriver = "awslogs"
        options = {
          "awslogs-group"         = "${var.environment}-${var.service_name}",
          "awslogs-region"        = var.region,
          "awslogs-stream-prefix" = "ecs"
        }
      }
    }
  ])
}

resource "aws_ecs_service" "service" {
  name            = "${var.environment}-${var.service_name}"
  cluster         = var.cluster_name
  launch_type     = "EC2"
  desired_count   = 1
  task_definition = aws_ecs_task_definition.task_definition.arn
}