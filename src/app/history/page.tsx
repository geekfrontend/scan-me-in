import ProtectedRoute from "@/common/components/ProtectedRoute";
import Wrapper from "@/common/components/Wrapper";
import History from "@/modules/history";

const HistoryPage = () => {
  return (
    <ProtectedRoute>
      <Wrapper>
        <History />
      </Wrapper>
    </ProtectedRoute>
  );
};

export default HistoryPage;
