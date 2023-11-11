"use client"
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);

  const router = useRouter();
  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setEmail(inputEmail);
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    setIsValidEmail(emailPattern.test(inputEmail));
  };

  const handlePasswordChange = (e) => {
    const inputpassword = e.target.value;
    setPassword(inputpassword);
    setIsValidPassword(password.length >= 8);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length >= 8 && isValidEmail) {
      try {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res.error) {
          setError("Invalid Credentials");
          return;
        }

        router.replace("dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmailChange}
            required
          />
          {!isValidEmail && (
            <p style={{ color: "red" }}>Please enter a valid email address.</p>
          )}
          <input
            onChange={handlePasswordChange}
            type="password"
            placeholder="Password"
            required
          />
          {!isValidPassword && (
            <p style={{ color: "red" }}>Please enter a valid password with 8 letters.</p>
          )}
          <button>Login</button>
          {error && (
            <div>
              {error}
            </div>
          )}

          <Link href={"/register"}>
            <span>Don't have an account? Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
