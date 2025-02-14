import RegisterForm from "@/components/forms/register-form";
import Link from "next/link";

export default function Register() {
  return (
    <>
      <div>
        <p className="font-bold text-3xl text-center">Create an Account</p>
        <p className=" text-center text-sm">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="font-bold text-primary hover:underline"
          >
            Log in
          </Link>
        </p>
      </div>
      <RegisterForm />
    </>
  );
}
