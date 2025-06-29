"use client";

import { Button } from "@/components/ui/button";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface NewsForm {
  title: string;
  body: string;
  userId: number;
}
const formSchema = z.object({
  title: z.string().min(1, "タイトルは必須です"),
  body: z.string().min(1, "内容は必須です"),
  userId: z.number(),
});

export default function NewsCreate() {
  const form = useForm<NewsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", body: "", userId: 1 },
  });
  const router = useRouter();
  const onSubmit = async (data: NewsForm) => {
    try {
      const response = await axios.post("http://localhost:8000/news", data);
      router.push("/news");
    } catch (error) {
      alert("エラーが起きました");
      console.log(error);
    }
  };
  return (
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

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => {
                return (
                  <FormItem className="mt-6">
                    <FormLabel>内容</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <Button className="mt-6">作成</Button>
        </form>
      </Form>
      <Button asChild>
        <Link href="/news">一覧に戻る</Link>
      </Button>
    </Card>
  );
}
