import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import React from "react";
import IssueChart from "./IssueChart";
import { Flex, Grid } from "@radix-ui/themes";

export default async function Home() {
  const open = await prisma.issue.count({
    where: {
      status: "OPEN",
    },
  });

  const inProgress = await prisma.issue.count({
    where: {
      status: "IN_PROGRESS",
    },
  });

  const closed = await prisma.issue.count({
    where: {
      status: "DONE",
    },
  });

  return (
    <>
      <Grid columns={{ initial: "1", md: "2" }} gap={"5"}>
        <Flex direction={"column"} gap={"5"}>
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />

          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssue />
      </Grid>
    </>
  );
}
