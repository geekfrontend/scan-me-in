"use client";

import { FiArrowLeft as BackIcon } from "react-icons/fi";

interface CameraHeaderProps {
  title: string;
  isBackButton?: boolean;
  handleBack?: () => void;
}

const CameraHeader = ({
  title,
  isBackButton = false,
  handleBack,
}: CameraHeaderProps) => {
  return (
    <div className="flex gap-5 items-center bg-white pt-8 px-8 pb-16">
      {isBackButton && (
        <div
          className="absolute bg-white rounded-full p-2 cursor-pointer"
          onClick={handleBack}
        >
          <BackIcon size={20} />
        </div>
      )}
      <div className="flex-grow text-center font-medium">{title}</div>
    </div>
  );
};

export default CameraHeader;
