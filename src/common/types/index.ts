export interface HistoryItemProps {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: "ONTIME" | "LATE" | "ABSENT";
}
