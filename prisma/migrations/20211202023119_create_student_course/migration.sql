-- CreateTable
CREATE TABLE "student_course" (
    "studentId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "student_course_pkey" PRIMARY KEY ("studentId","courseId")
);

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_course" ADD CONSTRAINT "student_course_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
