"use client"
import axios from "axios"
import { useEffect } from "react"

export default function About() {
  const fetch=async()=>{
    
    const hello=await axios.get("http://localhost/8000/hello")
console.log(hello)
}
  useEffect(()=>{fetch();
     console.log("aaa")
})
    return (
      <>
        {/* <div>{hello}</div> */}
        <div>user</div> 

      </> 
    ) 
}