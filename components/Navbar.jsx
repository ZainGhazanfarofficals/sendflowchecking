"use client"
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import './Nav.css'
export default function Navbar({ session }) {
  useEffect(() => {}, [session]);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav>
      <div>
        <Link href="/">
          <div>
            <span>
              <Image
                src="https://res.cloudinary.com/dpkkaacjk/image/upload/v1693990468/text-1674847270073_gshlaz.png"
                alt="Send Flow"
                width='100%'
                height='50%'
              />
            </span>
          </div>
        </Link>
      </div>
      <div>
        {session !== null ? (
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
            {session?.user?.image ? (
              <Image
                className="rounded-full"
                src={session?.user?.image}
                alt=""
                width={50}
                height={50}
              />
            ) : null}
            <div>
              <span>{session?.user?.name}</span>
            </div>
          </div>
        ) : (
          <Link href="/login">Get Started</Link>
        )}
      </div>
      <div>
        <ul>
          <li>
            <Link href="#">
              <div>DOCS</div>
            </Link>
          </li>
          <li>
            <Link href="#">
              <div>FAQs</div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
