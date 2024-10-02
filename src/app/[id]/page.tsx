import Wrapper from "@/common/components/Wrapper";

const DoctorDetailPage = ({ params }: { params: { id: string } }) => {
  return (
    <Wrapper>
      <h1>{params.id}</h1>
    </Wrapper>
  );
};

export default DoctorDetailPage;
