"use client";

import { User } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const AssigneSelect = () => {
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUser(data);
      console.log("is this data: ???", data);
      //   const { data } = await axios.get<User[]>("/api/users");
      //   setUser(data);
    };
    fetchUsers();
  }, []);

  return (
    <>
      <Select.Root>
        <Select.Trigger placeholder="Assign..." />

        <Select.Content>
          <Select.Group>
            <Select.Label>Suggestions</Select.Label>
            {user.map((u) => (
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
