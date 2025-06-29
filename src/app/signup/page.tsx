"use client";
import { Calendar } from "@/components/ui/calendar";
import { LoginForm } from "@/components/login-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { undefined, z } from "zod";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

type LoginForm = {
  email: string;
  password: string;
  username: string;
  birthday: Date;
  gender: number;
  prefecture: string;
  hobbiies: string;
};
const formSchema = z.object({
  email: z.string().email("有効なメールアドレスを入力してください"),
  password: z
    .string()
    .regex(/^[a-zA-Z0-9]+$/, "英数字で入力してください")
    .min(8, "パスワードは8文字以上で入力してください"),
  username: z.string().min(1, "ユーザー名を入力してください"),
  birthday: z.date({ required_error: "生年月日を選択してください" }),
  gender: z
    .number()
    .min(0)
    .max(1)
    .refine((value) => value === 0 || value === 1, {
      message: "性別を選択してください",
    }),
  prefecture: z.string().min(1, "都道府県を選択してください"),
  hobbiies: z.string().min(1, "趣味を入力してください"),
});

export default function SignUpCreate() {
  const now = new Date();
  const form = useForm<LoginForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      birthday: now,
      gender: 0,
      prefecture: "",
      hobbiies: "",
    },
  });
  const router = useRouter();
  const onSubmit = async (data: LoginForm) => {
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/signup",
        data
      );
      toast("成功しました！", {
        description: "ログインしてください",
        style: {
          backgroundColor: "#4caf50", // 緑色
          color: "#ffffff", // 白文字
        },
      });

      router.push("/login");
    } catch (error: any) {
      toast("失敗しました", {
        description: "フォームを再確認してください",
        style: {
          backgroundColor: "#FF0000", // 緑色
          color: "#ffffff", // 白文字
        },
      });
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        form.setError("email", {
          type: "manual",
          message: error.response.data.message, // メールフィールドにエラーを設定
        });
      } else {
        alert("エラーが起きました");
      }
      console.log(error);
    }
  };

  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className={cn("flex flex-col gap-6")}>
          <Card>
            <CardHeader>
              <CardTitle>新規登録</CardTitle>
              <CardDescription>
                メールとパスワードを入力してください
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-6">
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>メール</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="メールを入力してください"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>パスワード</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="パスワードを入力してください"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>ユーザー名</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="ユーザー名を入力してください"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>生年月日</FormLabel>
                              <FormControl>
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className="rounded-lg border"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />

                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>性別</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                              defaultValue={String(field.value)}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="性別を選択してください" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="0">男性</SelectItem>
                                <SelectItem value="1">女性</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="prefecture" // 都道府県用のフィールド名
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>都道府県</FormLabel>
                            <Select
                              onValueChange={(value) => field.onChange(value)} // 値をそのまま渡す
                              defaultValue={field.value} // 初期値を設定
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="都道府県を選択してください" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="北海道">北海道</SelectItem>
                                <SelectItem value="青森県">青森県</SelectItem>
                                <SelectItem value="岩手県">岩手県</SelectItem>
                                <SelectItem value="宮城県">宮城県</SelectItem>
                                <SelectItem value="秋田県">秋田県</SelectItem>
                                <SelectItem value="山形県">山形県</SelectItem>
                                <SelectItem value="福島県">福島県</SelectItem>
                                <SelectItem value="茨城県">茨城県</SelectItem>
                                <SelectItem value="栃木県">栃木県</SelectItem>
                                <SelectItem value="群馬県">群馬県</SelectItem>
                                <SelectItem value="埼玉県">埼玉県</SelectItem>
                                <SelectItem value="千葉県">千葉県</SelectItem>
                                <SelectItem value="東京都">東京都</SelectItem>
                                <SelectItem value="神奈川県">
                                  神奈川県
                                </SelectItem>
                                <SelectItem value="新潟県">新潟県</SelectItem>
                                <SelectItem value="富山県">富山県</SelectItem>
                                <SelectItem value="石川県">石川県</SelectItem>
                                <SelectItem value="福井県">福井県</SelectItem>
                                <SelectItem value="山梨県">山梨県</SelectItem>
                                <SelectItem value="長野県">長野県</SelectItem>
                                <SelectItem value="岐阜県">岐阜県</SelectItem>
                                <SelectItem value="静岡県">静岡県</SelectItem>
                                <SelectItem value="愛知県">愛知県</SelectItem>
                                <SelectItem value="三重県">三重県</SelectItem>
                                <SelectItem value="滋賀県">滋賀県</SelectItem>
                                <SelectItem value="京都府">京都府</SelectItem>
                                <SelectItem value="大阪府">大阪府</SelectItem>
                                <SelectItem value="兵庫県">兵庫県</SelectItem>
                                <SelectItem value="奈良県">奈良県</SelectItem>
                                <SelectItem value="和歌山県">
                                  和歌山県
                                </SelectItem>
                                <SelectItem value="鳥取県">鳥取県</SelectItem>
                                <SelectItem value="島根県">島根県</SelectItem>
                                <SelectItem value="岡山県">岡山県</SelectItem>
                                <SelectItem value="広島県">広島県</SelectItem>
                                <SelectItem value="山口県">山口県</SelectItem>
                                <SelectItem value="徳島県">徳島県</SelectItem>
                                <SelectItem value="香川県">香川県</SelectItem>
                                <SelectItem value="愛媛県">愛媛県</SelectItem>
                                <SelectItem value="高知県">高知県</SelectItem>
                                <SelectItem value="福岡県">福岡県</SelectItem>
                                <SelectItem value="佐賀県">佐賀県</SelectItem>
                                <SelectItem value="長崎県">長崎県</SelectItem>
                                <SelectItem value="熊本県">熊本県</SelectItem>
                                <SelectItem value="大分県">大分県</SelectItem>
                                <SelectItem value="宮崎県">宮崎県</SelectItem>
                                <SelectItem value="鹿児島県">
                                  鹿児島県
                                </SelectItem>
                                <SelectItem value="沖縄県">沖縄県</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="hobbiies"
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel>趣味</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="趣味を入力してください"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Button type="submit" className="w-full">
                        新規登録
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
