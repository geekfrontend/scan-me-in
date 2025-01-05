import { supabase } from "@/utils/supabase";

export const checkIn = async (userId: string) => {
  try {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const checkInTime = new Date().toISOString();

    let status = "ONTIME";
    if (now.getHours() > 9 || (now.getHours() === 9 && now.getMinutes() > 0)) {
      status = "LATE";
    }

    const { data, error } = await supabase.from("histories").insert([
      {
        user_id: userId,
        date: today.toISOString().split("T")[0],
        check_in_time: checkInTime,
        status: status,
      },
    ]);

    if (error) {
      throw error;
    }

    console.log("Inserted check-in data:", data);
  } catch (error) {
    console.error("Error inserting check-in data:", error);
  }
};

export const checkOut = async (userId: string) => {
  try {
    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));
    const checkOutTime = new Date().toISOString();

    const { data, error } = await supabase
      .from("histories")
      .update({
        check_out_time: checkOutTime,
      })
      .eq("user_id", userId)
      .eq("date", today.toISOString().split("T")[0]);

    if (error) {
      throw error;
    }

    console.log("Updated check-out data:", data);
  } catch (error) {
    console.error("Error updating check-out data:", error);
  }
};
