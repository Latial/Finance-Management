import Image from "next/image";
import React from "react";
import NavBar from "@/components/header/NavBar"
import Header from "@/components/header/header";
export default function Home() {
  return (
      <main className= "flex flex-col pb-10">
            <Header></Header>
      </main>
  );
}
