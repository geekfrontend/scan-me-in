"use client";

import { useEffect, useState } from "react";

import Loading from "@/common/components/Loading";

import { dummyHistory } from "@/utils/dummy";

import HistoryCard from "./HistoryCard";

const HistoryList = () => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-2">
          <Loading />
        </div>
      ) : dummyHistory.length ? (
        <div className="flex flex-col gap-y-4">
          {dummyHistory.map((history) => (
            <HistoryCard key={history.date} {...history} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-neutral-500">
          No history found
        </div>
      )}
    </div>
  );
};

export default HistoryList;
