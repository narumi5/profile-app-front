"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface News {
  id: number;
  title: string;
  body: string;
  status: number;
  userId: number;
}

export default function News() {
  const [loading, setLoading] = useState(true);

  const [newsData, setNewsData] = useState<News[]>([]);

  const deleteNews = async (id: number) => {
    const response = await axios.delete("http://localhost:8000/news/delete", {
      data: { id: id },
    });
    fetch();
  };

  const fetch = async () => {
    setLoading(true);
    const news = await axios.get("http://localhost:8000/news");
    setNewsData(news.data);
    setLoading(false);
  }; 

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="flex flex-row justify-center">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          <div className="flex justify-end items-center mb-4">
            <Button>
              <Link href="/news/create">
                <div>新規作成</div>
              </Link>
            </Button>
          </div>
          <Table className="w-24">
            <TableHeader>
              <TableRow>
                <TableHead className="max-w-32 font-bold">タイトル</TableHead>
                <TableHead className="max-w-48 font-bold">内容</TableHead>
                <TableHead className="max-w-48 font-bold"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {newsData.map((news, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    {news.title}
                  </TableCell>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    {news.body}
                  </TableCell>
                  <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis max-w-[200px]">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>削除</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>
                            本当に削除してもよいですか？
                          </DialogTitle>
                        </DialogHeader>

                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="submit"
                              onClick={() => deleteNews(news.id)}
                            >
                              はい
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button type="button" variant="secondary">
                              閉じる
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
