import Image from "next/image";
import React from "react";
import NavBar from "@/components/header/NavBar"
export default function Home() {
  return (
      <main className= "flex min-h-screen flex-col">
            <NavBar></NavBar>
      </main>
  );
}
