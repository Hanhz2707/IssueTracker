import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssueSummary from "./IssueSummary";
import LatestIssue from "./LatestIssue";
import React from "react";
import IssueChart from "./IssueChart";

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
      {/* <LatestIssue /> */}
      <IssueChart open={open} inProgress={inProgress} closed={closed} />
    </>
  );
}
