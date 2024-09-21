"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import { Box } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();
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
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={classNames({
                  "text-zinc-900 font-bold": link.href === currentPath,
                  "text-zinc-500": link.href !== currentPath,
                  "hover:text-zinc-800": true,
                  "transition-colors": true,
                })}
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <Box>
          {status === "authenticated" ? (
            <Link href="/api/auth/signout">Sign out</Link>
          ) : (
            <Link href="/api/auth/signin">Sign in</Link>
          )}
        </Box>
      </nav>
    </>
  );
};

export default NavBar;
