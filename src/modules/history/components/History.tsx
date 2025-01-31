"use client";

import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";

import HistoryList from "./HistoryList";

const History = () => {
  return (
    <>
      <PageHeader title="Riwayat" />
      <PageWrapper>
        <HistoryList />
      </PageWrapper>
    </>
  );
};

export default History;
