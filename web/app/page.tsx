import Image from "next/image";
import React, {Suspense} from "react";
import NavBar from "@/components/header/NavBar"
import Header from "@/components/header/header";
import {FullPageSection} from "@/components/common/fullPageSection";
import FinanceHero from "@/components/home/financeHero";
import SideMenu from "@/components/home/side-menu";
export default function Home() {
  return (
      <main className= "container mx-auto flex flex-col py-10">
          <FullPageSection className="flex-col">
                <FinanceHero/>
                <SideMenu/>
              <Suspense fallback={""}>

              </Suspense>
          </FullPageSection>

          <Suspense fallback={""}>

          </Suspense>


          <Suspense fallback={""}>

          </Suspense>
      </main>
  );
}
