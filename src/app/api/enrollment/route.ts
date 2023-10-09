import { EnrollmentSection } from "@/components/EnrollmentSection";
import { getPrisma } from "@/libs/getPrisma";
import { Course, Enrollment, Student } from "@prisma/client";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

type EnrollmentWithRelation = Enrollment & {
  student: Student;
  course: Course;
};

export type EnrollmentGetResponse = {
  enrollments: EnrollmentWithRelation[];
};

export const GET = async () => {
  const prisma = getPrisma();
  
  const enrollments = await prisma.enrollment.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      student: true,
      course: true,
    },
  });

  // 3. display enrollment data (showing student data and course data)
  // const enrollments = await prisma...

  return NextResponse.json<EnrollmentGetResponse>({
    enrollments, //replace empty array with result from DB
  });
};
