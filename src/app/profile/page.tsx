import ProtectedRoute from "@/common/components/ProtectedRoute";
import Wrapper from "@/common/components/Wrapper";
import Profile from "@/modules/profile";

const ProfilPage = () => {
  return (
    <ProtectedRoute>
      <Wrapper>
        <Profile />
      </Wrapper>
    </ProtectedRoute>
  );
};

export default ProfilPage;
