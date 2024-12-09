import React from "react";
import { Toaster } from "react-hot-toast";
import Card from "../components/Card/card";
import { Footer } from "../components/footer";
import { Header } from "../components/header";

const Page = () => {
  return (
    <main className="w-full min-h-screen relative sm:border-x border-gray-200 ">
      <Toaster />
      <Header />
      <section className="flex flex-col items-center w-full  h-[calc(100vh-8rem)] overflow-scroll ">
        <Card />
      </section>
      <Footer />
    </main>
  );
};

export default Page;
