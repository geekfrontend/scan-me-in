"use client";

import clsx from "clsx";
import moment from "moment";
import {
  HiOutlineCheckCircle as CompletedIcon,
  HiOutlineClock as LateIcon,
  HiOutlineUser as PatientIcon,
} from "react-icons/hi";
import "moment/locale/id";

import Image from "@/common/components/Image";
import { HistoryItemProps } from "@/common/types";

const HistoryCard = ({
  date,
  check_in_time,
  check_out_time,
  status,
}: HistoryItemProps) => {
  moment.locale("id");

  const formattedDate = moment(date, "YYYY-MM-DD").format("dddd, DD MMMM YYYY");
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
    <div className="flex flex-col items-center">
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
            <div>
              Masuk: {moment(check_in_time).locale("id").format("hh:mm A")}{" "}
            </div>
          </div>
          <div className="flex gap-2 text-xs">
            <PatientIcon size={14} />
            <div>
              Keluar: {moment(check_out_time).locale("id").format("hh:mm A")}
            </div>
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
    </div>
  );
};

export default HistoryCard;
