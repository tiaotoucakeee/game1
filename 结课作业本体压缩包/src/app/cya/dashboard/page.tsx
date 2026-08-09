import { redirect } from "next/navigation";

export default function CyaDashboardRedirectPage() {
  redirect("/student/home");
}
