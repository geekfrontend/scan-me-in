/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

import Loading from "@/common/components/Loading";

import { auth } from "@/configs/firebase";
import { supabase } from "@/utils/supabase";

import HistoryCard from "./HistoryCard";

const HistoryList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [histories, setHistories] = useState<any[]>([]);

  const userId = auth.currentUser?.uid;

  const fetchHistory = async () => {
    try {
      const { data, error } = await supabase
        .from("histories")
        .select("*")
        .range(0, 9)
        .eq("user_id", userId);
      if (error) {
        throw error;
      }
      setHistories(data);
      console.log("Fetched data:", data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="flex justify-center mt-2">
          <Loading />
        </div>
      ) : histories.length ? (
        <div className="flex flex-col gap-y-4">
          {histories.map((history) => (
            <HistoryCard key={history.id} {...history} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-neutral-500">
          Tidak ada riwayat
        </div>
      )}
    </div>
  );
};

export default HistoryList;
