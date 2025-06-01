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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import Link from "next/dist/client/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { undefined, z } from "zod";
import { use } from "react";

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

export default function EditNews({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [newsData, setNewsData] = useState<News>();
  const form = useForm<EditNewsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: { id: 0, title: "", body: "", status: 0, userId: 1 },
  });

  const news = async () => {
    const news = await axios.get(`http://localhost:8000/news/${id}`);
    form.reset({
      id: news.data.id,
      title: news.data.title,
      body: news.data.body,
      status: news.data.status,
      userId: news.data.userId,
    });
    setNewsData(news.data);
  };

  const router = useRouter();
  const onSubmit = async (data: EditNewsForm) => {
    try {
      const response = await axios.put("http://localhost:8000/news", data);
      router.push("/news");
    } catch (error) {
      alert("エラーが起きました");
      console.log(error);
    }
  };

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

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => {
                  return (
                    <FormItem className="mt-6">
                      <FormLabel>ステータス</FormLabel>
                      <FormControl>
                        <Select
                          value={String(field.value)} // フォームの値をSelectにバインド
                          onValueChange={(value) => field.onChange(Number(value))} // 値が変更されたときにフォームの状態を更新>
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="選択してください" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel></SelectLabel>
                              <SelectItem value="1">公開</SelectItem>
                              <SelectItem value="0">非公開</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </div>

            <Button className="mt-6">更新</Button>
          </form>
        </Form>
        <Button asChild>
          <Link href="/news">一覧に戻る</Link>
        </Button>
      </Card>
    </>
  );
}
