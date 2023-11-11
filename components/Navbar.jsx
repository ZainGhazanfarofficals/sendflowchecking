"use client";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useEffect } from "react";


export default function Navbar({session}) {
  useEffect(() => {
  }, [session]);
  const  handleSignOut =async ()=>{
      await signOut();
  }
  return (
    <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/">
          <div className="flex items-center">
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-primary">
              <Image src="https://res.cloudinary.com/dpkkaacjk/image/upload/v1693990468/text-1674847270073_gshlaz.png" alt="Send Flow" width={200} height={200} />
            </span>
          </div>
        </Link>
        <div className="flex md:order-2 ">
          {session !== null ? (
            <div className="flex justify-around gap-4">
              <button
                onClick={handleSignOut}
                className="bg-slate-900 text-white px-6 py-2 rounded-md"
              >
                Sign Out
              </button>
              {session?.user?.image ?
              <Image
                className="rounded-full"
                src={session?.user?.image}
                alt=""
                width={50}
                height={50}
              /> : null
              }
              <div>
                <span className="font-bold text-center">
                  {session?.user?.name}
                </span>
              </div>
            </div>
          ) : (
            <Link href="/login"
              className="bg-slate-900 text-white px-6 py-2 rounded-md"
            >
              Get Started
            </Link>
          )}
          {/* other button code ... */}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white">
            <li>
              <Link href="#">
                <div className="block py-2 pl-3 pr-4 text-primary">DOCS</div>
              </Link>
            </li>
            <li>
              <Link href="#">
                <div className="block py-2 pl-3 pr-4 text-primary">FAQs</div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
