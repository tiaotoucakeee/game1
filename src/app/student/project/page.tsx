import { StudentGate } from "@/components/game/SystemGate";
import { StudentProjectPageClient } from "@/components/student/StudentProjectPageClient";
import "@/styles/student-portal.css";

export default function StudentProjectPage() {
  return (
    <StudentGate>
      <StudentProjectPageClient />
    </StudentGate>
  );
}
