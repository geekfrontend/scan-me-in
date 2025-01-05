"use client";

import clsx from "clsx";
import { format, parse } from "date-fns";
import { useState } from "react";
import {
  HiOutlineCheckCircle as CompletedIcon,
  HiOutlineClock as LateIcon,
  HiOutlineUser as PatientIcon,
} from "react-icons/hi";

import Image from "@/common/components/Image";
import { HistoryItemProps } from "@/common/types";

const HistoryCard = ({
  date,
  checkInTime,
  checkOutTime,
  status,
}: HistoryItemProps) => {
  const [isShowAction, setIsShowAction] = useState(false);

  const appointmentDate = parse(date, "yyyy-MM-dd", new Date());
  const formattedDate = format(appointmentDate, "EEE, MMM dd, yyyy");
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);

  const getStatusIcon = () => {
    switch (status) {
      case "ONTIME":
        return <CompletedIcon size={14} className="text-green-500" />;

      case "LATE":
        return <LateIcon size={14} className="text-yellow-500" />;

      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "ONTIME":
        return "bg-green-500";

      case "LATE":
        return "bg-yellow-500";

      default:
        return "bg-neutral-500";
    }
  };

  return (
    <div
      onClick={() => setIsShowAction(!isShowAction)}
      className="flex flex-col items-center"
    >
      <div className="w-full p-5 border bg-white border-neutral-100 shadow-t-sm space-y-5 rounded-3xl cursor-pointer transition-all duration-300">
        <div className="flex gap-x-3 items-center pb-3 border-b border-neutral-100">
          <div className="p-1 bg-purple-50 rounded-full">
            <Image
              src="/images/calendar.png"
              width={40}
              height={40}
              alt="history"
              rounded="rounded-full"
            />
          </div>
          <div className="space-y-1">
            <h5 className="font-medium">{formattedDate}</h5>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2 text-xs">
            <PatientIcon size={14} />
            <div>Check In: {checkInTime}</div>
          </div>
          <div className="flex gap-2 text-xs">
            <PatientIcon size={14} />
            <div>Check Out: {checkOutTime}</div>
          </div>
          <div className="flex gap-2 text-xs">
            {getStatusIcon()}
            <div className="flex items-center gap-2">
              Status:
              <div
                className={clsx(
                  "py-0.5 px-2 text-white rounded-full text-[11px]",
                  getStatusColor(),
                )}
              >
                {formattedStatus}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isShowAction && (
        <div className="bg-white w-max p-3 rounded-b-3xl shadow-b-sm border-neutral-100">
          <button className="px-3 py-2 bg-blue-500 text-white rounded-full text-sm">
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryCard;
