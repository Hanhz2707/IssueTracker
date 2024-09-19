import { Button } from "@radix-ui/themes";
import React from "react";

const DeleteIssueButton = ({ IssueID }: { IssueID: number }) => {
  return (
    <>
      <Button color="red"> Delete Issue</Button>
    </>
  );
};

export default DeleteIssueButton;
