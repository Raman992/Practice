"use client";

import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

export default function Home() {
  const count = useSelector((state: RootState) => state.counter.value);

  return (
    <div className="flex min-h-[90vh] flex-col justify-center items-center">
      <h1 className="text-green-800 text-9xl">hello world</h1>
      <br />
      <br />
      <br />
      <div className="text-white">
        The count is currently at {count}
      </div>
    </div>
  );
}
