"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { Status } from "@prisma/client";
import { useRouter } from "next/navigation";

const IssueStatusFilter = () => {
  const router = useRouter();

  const status: { label: string; value?: Status }[] = [
    { label: "All" },
    { label: "Open", value: "OPEN" },
    { label: "Closed", value: "DONE" },
    { label: "In Progress", value: "IN_PROGRESS" },
  ];

  const handleStatusChange = (value: Status) => {
    const query = value ? `?status=${value}` : "";
    router.push("/issues/list" + query);
  };

  return (
    <>
      <Select.Root onValueChange={handleStatusChange}>
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
