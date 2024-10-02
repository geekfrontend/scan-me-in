import PageHeader from "@/common/components/PageHeader";
import PageWrapper from "@/common/components/PageWrapper";

import HistoryList from "./HistoryList";

const History = () => {
  return (
    <>
      <PageHeader title="History" />
      <PageWrapper className="bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
        <HistoryList />
      </PageWrapper>
    </>
  );
};

export default History;
