"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "@/app/components/Skeleton";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneSelect = () => {
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

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
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
