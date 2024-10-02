export interface HistoryItemProps {
  date: string;
  checkInTime: string;
  checkOutTime: string;
  status: "ontime" | "late" | "absent";
}
