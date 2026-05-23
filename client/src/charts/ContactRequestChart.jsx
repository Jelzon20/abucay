import React, { useEffect, useState } from "react";
import {
  ChatBubbleBottomCenterIcon,
  DocumentArrowUpIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";

const ContactRequestChart = () => {
  const [contactRequestCount, setContactRequestCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactRequestCount = async () => {
      try {
        const response = await fetch("/api/dashboard/getContactRequestCount");

        if (!response.ok) {
          throw new Error("Failed to fetch contact request count");
        }

        const data = await response.json();

        setContactRequestCount(data.totalContactRequests);
      } catch (error) {
        console.error("Error fetching contact request count:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContactRequestCount();
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex items-center justify-between hover:shadow-lg transition">
      <div>
        <p className="text-gray-500 text-sm font-medium">Contact Request</p>

        <h2 className="text-3xl font-bold text-gray-800 mt-2">
          {loading ? "..." : contactRequestCount}
        </h2>
      </div>

      <div className="bg-blue-500 p-3 rounded-full flex items-center justify-center">
        <ChatBubbleBottomCenterIcon className="h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default ContactRequestChart;
