import { StudentGate } from "@/components/game/SystemGate";
import { StudentResourcesPageClient } from "@/components/student/StudentResourcesPageClient";
import "@/styles/student-portal.css";

export default function StudentResourcesPage() {
  return (
    <StudentGate>
      <StudentResourcesPageClient />
    </StudentGate>
  );
}
