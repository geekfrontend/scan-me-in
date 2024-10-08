import ProtectedRoute from "@/common/components/ProtectedRoute";
import Wrapper from "@/common/components/Wrapper";
import Home from "@/modules/home";

export default function HomePage() {
  return (
    <ProtectedRoute>
      <Wrapper>
        <Home />
      </Wrapper>
    </ProtectedRoute>
  );
}
