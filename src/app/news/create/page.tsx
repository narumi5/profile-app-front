"use client";

import Link from "next/link";

export default function NewsCreate() {
  return (
    <div>
      <h1>create</h1>
      <Link href="/news">一覧に戻る</Link>
      <form>
        <div>
          <input type="text" className="border-2"/>
        </div>
      </form>
    </div>
  );
}
