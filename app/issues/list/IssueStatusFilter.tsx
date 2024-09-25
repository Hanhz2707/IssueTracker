"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";

const IssueStatusFilter = () => {
  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "DONE" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Filter by status..."></Select.Trigger>
        <Select.Content>
          {status.map((s) => (
            <Select.Item key={s.label} value={s.value || "..."}>
              {s.label}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default IssueStatusFilter;
