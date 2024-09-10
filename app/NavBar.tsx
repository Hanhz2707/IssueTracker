import Link from "next/link";
import React from "react";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues",
    },
  ];

  return (
    <>
      <nav className="flex space-x-6 border-b-4 h-14 mb-5  items-center px-5 ">
        <Link href="/">
          <AiFillBug />
        </Link>
        <ul className="flex space-x-5">
          {/* <li>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href="/"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href="/issues"
            >
              Issues
            </Link>
          </li> */}
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-zinc-500 hover:text-zinc-800 transition-colors"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
