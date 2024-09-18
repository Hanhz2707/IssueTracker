import prisma from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
// We need to grab the id from the URL

interface Props {
  params: {
    id: string;
  };
}

const IssueDetailPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap={"2"}>
      {/* Left column */}
      <Box>
        <IssueDetail issue={issue} />
      </Box>

      {/* Right column */}
      <Box>
        <EditIssueButton IssueID={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
