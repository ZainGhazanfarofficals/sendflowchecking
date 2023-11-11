"use client";

import { HiOutlineTrash } from "react-icons/hi";
import { useRouter } from "next/navigation";


// Delete Button Component to Delete Campaigns
export default function RemoveBtn({ id, refreshData }) {
  const router = useRouter();

  // Function Trigger when click on Trash(DELETE) Button
  const removeTopic = async () => {
    const confirmed = confirm("Are you sure?");

    if (confirmed) {
      try {
        // API Endpoint to Delete Selected Campaign...
        const res = await fetch(`/api/campaign?id=${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
            refreshData();
        } else {
          console.error("Error deleting campaign:", res.statusText);
        }
      } catch (error) {
        console.error("Error deleting campaign:", error);
      }
    }
  };

  return (
    <button onClick={removeTopic} className="text-red-400">
      <HiOutlineTrash size={24} />
    </button>
  );
}
