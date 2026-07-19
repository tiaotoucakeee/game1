import { redirect } from "next/navigation";

export default function StudentAniRedirectPage() {
  redirect("/student/home?chat=ani");
}
