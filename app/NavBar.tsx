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
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";

const NavBar = () => {
  const { status, data: session } = useSession();

  return (
    <>
      <nav className=" space-x-6 border-b-4 h-14 mb-5 py-3 ">
        <Container>
          <Flex justify={"between"}>
            <Flex align={"center"} gap={"3"}>
              <Link href="/">
                <AiFillBug />
              </Link>
              {/* Here is the navlink */}
              <NavLinks />
            </Flex>
            <AuthStatus />
          </Flex>
        </Container>
      </nav>
    </>
  );
};

export default NavBar;
