export interface HistoryItemProps {
  date: string;
  check_in_time: string;
  check_out_time: string;
  status: "ONTIME" | "LATE" | "ABSENT";
}
