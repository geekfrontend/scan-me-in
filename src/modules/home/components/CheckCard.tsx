import React from "react";

interface CheckCardProps {
  title: string;
  icon: React.ReactNode;
  time: string;
}
const CheckCard = ({ title, icon, time }: CheckCardProps) => {
  return (
    <div className="w-full p-5 border bg-white border-neutral-100 shadow-t-sm space-y-5 rounded-3xl cursor-pointer transition-all duration-300">
      <div className="flex gap-3 items-center">
        <span>{icon}</span>
        <h5 className="font-medium">{title}</h5>
      </div>
      <p className="font-bold text-2xl">{time}</p>
    </div>
  );
};

export default CheckCard;
