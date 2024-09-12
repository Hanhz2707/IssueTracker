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
import { CreateIssueSchema } from "@/app/validationSchema";
import { z } from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type IssueForm = z.infer<typeof CreateIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    // allow to use external validation schema such as zod
    resolver: zodResolver(CreateIssueSchema),
  });

  const [error, setError] = useState("");

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
        <form
          className="max-w-xl space-y-3"
          onSubmit={handleSubmit(async (data) => {
            // Creating handling error
            try {
              await axios.post("/api/issues", data);
              router.push("/issues");
            } catch (error) {
              setError("An unexpected error occured. Please try again later.");
            }
          })}
        >
          <TextField.Root
            placeholder="Title"
            {...register("title")}
          ></TextField.Root>

          <ErrorMessage>{errors.title?.message}</ErrorMessage>

          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <SimpleMDE placeholder="Type something here..." {...field} />
            )}
          />

          <ErrorMessage>{errors.description?.message}</ErrorMessage>

          <Button>Submit</Button>
        </form>
      </div>
    </>
  );
};

export default NewIssuePage;
