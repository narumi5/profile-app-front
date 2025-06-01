"use client";
import { createContext } from "react";
import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);
  const router = useRouter();
  const currentPath = usePathname();
  useEffect(() => {
    const checkAuth = async () => {
    const token = localStorage.getItem("token");


    if (!token) {
        // トークンがない場合、ログインページにリダイレクト
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:8000/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`, // Bearer Token をヘッダーに設定
          },
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("認証エラー:", error);
        router.push("/login");
      }
    };

    checkAuth(); // 非同期関数を呼び出す
  }, [currentPath, router]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
      <div>Loading...</div>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
