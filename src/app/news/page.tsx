"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function News() {
  const [loading, setLoading] = useState(true);

  const [newsData, setNewsData] = useState([]);

  const fetch = async () => {
    const news = await axios.get("http://localhost:8000/news", {
      withCredentials: true,
    });
    console.log(news.data);
    setNewsData(news.data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div>
      <Link href="/news/create">
        <div>新規作成</div>
      </Link>
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div>
          {newsData.map((news, index) => {
            return (
              <div key={index}>
                <div>タイトル:{news.title}</div>
                <div>内容:{news.body}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
