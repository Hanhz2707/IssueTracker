"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";

const NavBar = () => {
  const currentPath = usePathname();
  console.log(currentPath);

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
            <Link
              key={link.href}
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
          ))}
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
