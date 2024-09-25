import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    {
      name: "Dashboard",
      href: "/",
    },
    {
      name: "Issues",
      href: "/issues/list",
    },
  ];
  return (
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
  );
};

export default NavLinks;
