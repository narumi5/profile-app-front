"use client";
import {
  calculate,
  makeSelfIntroduction,
  useMakeSelfIntroduction,
} from "@/utiles/common";
import axios from "axios";
import { useEffect, useState } from "react";

export default function About() {
  const [calculationResult, setCalculationResult] = useState<number>();
  const [data, setData] = useState();
  const [count, setCount] = useState(11);
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [workExperienceYear, setWorkExperienceYear] = useState("");
  const fetch = async () => {
    const result = await calculate(1, 2);
    const hello = await axios.get("http://localhost:8000/hello/5", {
      withCredentials: true,
    });
    setData(hello.data);
    setCalculationResult(result);
  };
  useEffect(() => {
    setWorkExperienceYear(useMakeSelfIntroduction("成美", 2));
    setSelfIntroduction(makeSelfIntroduction("拓哉", 27));
    makeSelfIntroduction("拓哉", 27);
    fetch();
  }, []);

  const plusCount = (a: number, b: number) => {
    setCount(count + a - b);
  };

  const minusCount = (a: number) => {
    setCount(count - a);
  };

  return (
    <>
      <div></div>
      <div>{workExperienceYear}</div>
      <div className="flex justify-center">
        <div>{count}</div>
        <button onClick={() => plusCount(3, 2)}>+</button>
        <button onClick={() => minusCount(1)}>-</button>
      </div>
      <div>{selfIntroduction}</div>

      <div className="text-red-400">{data}</div>
      <div>{calculationResult}</div>
      <div>user</div>
    </>
  );
}
