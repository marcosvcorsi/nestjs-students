variable "environment" {
  default = "dev"
}

variable "region" {
  default = "us-east-1"
}

variable "cluster_name" {
  description = "Name of ECS cluster"
  type        = string
  default     = "default"
}

variable "service_name" {
  description = "Name of ECS Service"
  type        = string
  default     = "nestjs-students"
}

variable "image_tag" {
  description = "Image tag version"
  type        = string
  default     = "latest"
}
