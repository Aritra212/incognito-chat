import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyAccount() {
  return (
    <div className="space-y-6 text-center">
      <p>Please verify your mail by clicking on the link in the mail.</p>

      <div>
        <Link href="/login">
          <Button>Already verified? Login</Button>
        </Link>
      </div>
    </div>
  );
}
