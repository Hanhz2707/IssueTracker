import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";

const EditIssueButton = ({ IssueID }: { IssueID: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/edit/${IssueID}`}>Edit</Link>
    </Button>
  );
};

export default EditIssueButton;
