"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function About() {
  const [calculationResult, setCalculationResult] = useState<number>();
  const [data, setData] = useState();
  const [count, setCount] = useState(11);
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const fetch = async () => {
    const result = await calculate(1, 2);
    console.log(result);
    const hello = await axios.get("http://localhost:8000/hello/5", {
      withCredentials: true,
    });
    setData(hello.data);
    console.log("hello", hello);
    console.log("data", hello.data);
    console.log("status", hello.status);
    setCalculationResult(result);
  };
  useEffect(() => {
    fetch();
    console.log("aaa");
  },[]);

  const calculate = async (a: number, b: number) => {
    return a + b;
    console.log(a + b);
    console.log("a", a);
    console.log("b", b);
  };
  calculate(1, 2);
  useEffect(() => {
    calculate(1, 2);
  },[]);

  const helloName = (name: string) => {
    return `goodmoring ${name}`;
  };

  helloName("takuya");

  const plusCount = (a: number, b: number) => {
    setCount(count + a - b);
    console.log("plus");
    
    
  };

  const minusCount = (a: number) =>{
    setCount(count -a);
  
  };

  const makeSelfIntroduction = (name: string,age: number) => {
    setSelfIntroduction( "私の名前は成美です。年齢は24歳です。")
    return ` 私の名前は${name}です。年齢は${age}です。`;
    
  };
  // makeSelfIntroduction("成美",24);

  return (
    <>
    <div></div>
      <div className="flex justify-center" 
      >
        <div>{count}</div>
        <button onClick={() => plusCount(3, 2)}>+</button>
        <button onClick={() => minusCount(1)}>-</button>

      </div>
      <div>{makeSelfIntroduction("成美",24)}</div>
      {/* <div>{helloName("takuya")}</div>
      <div>{hel loName("narumi")}</div>
      <div className="text-red-400">{data}</div>
      <div>{calculationResult}</div>
      <div>user</div> */}
    </>
  );
}
 