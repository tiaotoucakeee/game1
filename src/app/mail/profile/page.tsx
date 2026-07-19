import { redirect } from "next/navigation";

export default function MailProfilePage() {
  redirect("/?profile=1");
}
