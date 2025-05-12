
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// Define the schema to ensure content is required
const formSchema = z.object({
  content: z.string().min(1, "Comment cannot be empty"),
});

// Define the form data type based on the schema
type FormData = z.infer<typeof formSchema>;

type BlogCommentFormProps = {
  onSubmit: (data: { content: string }) => void;
};

const BlogCommentForm = ({ onSubmit }: BlogCommentFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmit = (values: FormData) => {
    // Since FormData is derived from the schema, content is guaranteed to be a string
    onSubmit({ content: values.content });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit Comment</Button>
      </form>
    </Form>
  );
};

export default BlogCommentForm;
