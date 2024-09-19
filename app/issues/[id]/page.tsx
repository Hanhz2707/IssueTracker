import prisma from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssueDetail from "./IssueDetail";
import DeleteIssueButton from "./DeleteIssueButton";
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
    <Grid columns={{ initial: "1", sm: "5" }} gap={"2"}>
      {/* Left column */}
      {/* Take 4/5 columns */}
      <Box className="md:col-span-4">
        <IssueDetail issue={issue} />
      </Box>

      {/* Right column */}
      <Box>
        <Flex direction={"column"} gap={"4"}>
          <EditIssueButton IssueID={issue.id} />
          <DeleteIssueButton IssueID={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
