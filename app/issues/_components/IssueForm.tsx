"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";
import { error } from "console";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { issueSchema } from "@/app/validationSchema";
import { set, z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import delay from "delay";
import { Issue } from "@prisma/client";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    // allow to use external validation schema such as zod
    resolver: zodResolver(issueSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    // Creating handling error
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, data);
      } else {
        await axios.post("/api/issues", data);
      }
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error occured. Please try again later.");
    }
  });

  return (
    <>
      <div className="max-w-xl">
        {error && (
          <Callout.Root className="mb-5 font-medium">
            <Callout.Icon>
              <AiFillInfoCircle />
            </Callout.Icon>
            <Callout.Text color="red">{error}</Callout.Text>
          </Callout.Root>
        )}
        <form className="max-w-xl space-y-3" onSubmit={onSubmit}>
          <TextField.Root
            defaultValue={issue?.title}
            placeholder="Title"
            {...register("title")}
          ></TextField.Root>

          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Controller
            defaultValue={issue?.description}
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Type something here..." {...field} />
            )}
          />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit"} {""}
            {isSubmitting && <Spinner />}
          </Button>
        </form>
      </div>
    </>
  );
};

export default IssueForm;
