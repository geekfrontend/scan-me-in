import { auth } from "@/configs/firebase";

const Hero = () => {
  const currentUser = auth.currentUser;

  return (
    <div className="px-8 pt-8 pb-16 bg-[url('https://preline.co/assets/svg/examples/abstract-bg-1.svg')] bg-no-repeat bg-cover bg-center space-y-6">
      <div className="space-y-3">
        <div className="text-neutral-800">
          Hi{currentUser?.displayName && ","} {currentUser?.displayName}
        </div>
        <h1 className="text-neutral-950 text-2xl leading-snug font-semibold">
          The Easy Way to <br /> Confirm Your Attendance
        </h1>
      </div>
    </div>
  );
};

export default Hero;
