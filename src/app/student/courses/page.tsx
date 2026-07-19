import { StudentGate } from "@/components/game/SystemGate";
import { StudentCoursesPageClient } from "@/components/student/StudentCoursesPageClient";
import "@/styles/student-portal.css";

export default function StudentCoursesPage() {
  return (
    <StudentGate>
      <StudentCoursesPageClient />
    </StudentGate>
  );
}
