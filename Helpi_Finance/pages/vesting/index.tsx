import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import Sidebar from "../../components/app/Sidebar";
import Navbar from "../../components/app/Navbar";
import Vesting from "../../components/app/Vesting";

const Swap: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Vesting - Helpi Finance</title>
        <meta name="description" content="Next Level Financial Dapp" />
        <link rel="icon" href="/icons/favicon.png" />
      </Head>
      <main>
        <div className="flex">
          <div className="hidden md:block w-3/12 xl:w-2/12 p-4">
            <Sidebar />
          </div>
          <div className="w-full pl-4 md:pl-0 py-4 pr-4">
            <Navbar />
            <Vesting />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Swap;
