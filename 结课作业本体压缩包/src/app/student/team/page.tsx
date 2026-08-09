import { StudentGate } from "@/components/game/SystemGate";
import { StudentTeamPageClient } from "@/components/student/StudentTeamPageClient";
import "@/styles/student-portal.css";

export default function StudentTeamPage() {
  return (
    <StudentGate>
      <StudentTeamPageClient />
    </StudentGate>
  );
}
