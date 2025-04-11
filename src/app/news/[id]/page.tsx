"use client";

import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { undefined, z } from "zod";

type Params = {
  params: {
    id: string;
  };
};

interface News {
  id: number;
  title: string;
  body: string;
  status: number;
  userId: number;
}

interface EditNewsForm {
  id: number;
  title: string;
  body: string;
  status: number;
  userId: number;
}
const formSchema = z.object({
  id: z.number(),
  title: z.string().min(1, "タイトルは必須です"),
  body: z.string().min(1, "内容は必須です"),
  status: z.number(),
  userId: z.number(),
});

export default function EditNews({ params }: Params) {
  const [newsData, setNewsData] = useState<News>();
  const form = useForm<EditNewsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: 0, title: "", body: "", status: 0, userId: 1 },
  });

  const news = async () => {
    const news = await axios.get("http://localhost:8000/news/13");
    setNewsData(news.data);
  };
  const onSubmit = async () => {};

  useEffect(() => {
    news();
  }, []);

  return (
    <>
      <div>EditNews</div>
      <div>{newsData?.id}</div>
      <Card className="w-96 mx-auto p-7 mt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>タイトル</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>
          </form>
        </Form>
      </Card>
    </>
  );
}
