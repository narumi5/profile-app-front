"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function About() {
  const [data,setData]=useState()
  const fetch=async()=>{
    
     const hello=await axios.get("http://localhost:8000/hello/5",{withCredentials:true})
     setData(hello.data)
console.log(hello)
}
  useEffect(()=>{fetch();
     console.log("aaa")
})
    return (
      <>
        <div className="text-red-400">{data}</div>
        <div>user</div> 

      </> 
    ) 
}