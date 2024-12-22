import React, { Suspense } from "react";
import Card from "../components/Card/card";
import { Header } from "../components/header";
import { Footer } from "../components/footer";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <main className="w-full min-h-screen relative sm:border-x border-gray-200 ">
      <Toaster />
      <Header />
      <section className="flex flex-col items-center w-full  h-[calc(100vh-8rem)] overflow-scroll px-4 ">
        <Suspense fallback={<div>Loading...</div>}>
          <Card />
        </Suspense>
      </section>
      <Footer />
    </main>
  );
};

export default page;
