"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { AiFillBug } from "react-icons/ai";
import classNames from "classnames";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Grid,
  Text,
} from "@radix-ui/themes";

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
      <nav className=" space-x-6 border-b-4 h-14 mb-5 py-3 ">
        <Container>
          <Flex justify={"between"}>
            <Flex align={"center"} gap={"3"}>
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
            </Flex>
            <Box>
              {status === "authenticated" ? (
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Avatar
                      src={session.user?.image!}
                      fallback="avatar picture"
                      size={"2"}
                      radius="full"
                      className="cursor-pointer"
                    />
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Group>
                      <DropdownMenu.Label>
                        <Flex direction={"column"}>
                          <Text>{session.user?.name}</Text>
                          <Text>{session.user?.email}</Text>
                        </Flex>
                      </DropdownMenu.Label>
                      <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Sign out</Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Group>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              ) : (
                <Link href="/api/auth/signin">Sign in</Link>
              )}
            </Box>
          </Flex>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;
