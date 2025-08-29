// hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // acá podés traerlo de localStorage, cookies o un endpoint
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return { user };
}