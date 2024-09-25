"use client";

import { Issue, User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneSelect = ({ issue }: { issue: Issue }) => {
  const {
    data: users,
    error,
    isLoading,
  } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60000,
    retry: 3,
  });

  if (isLoading) return <Skeleton />;

  if (error) return null;

  const valueChange = (userID: string) => {
    axios.patch(`/api/issues/${issue.id}`, {
      assignedToUserId: userID === "unassigned" ? null : userID,
    });
  };

  return (
    <>
      <Select.Root onValueChange={valueChange}>
        <Select.Trigger placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            <Select.Item value="unassigned">Unassigned</Select.Item>
            {users?.map((u) => (
              <Select.Item key={u.id} value={u.id}>
                {u.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </>
  );
};

export default AssigneSelect;
