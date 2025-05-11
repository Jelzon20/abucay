import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import { toast, Toaster } from "sonner";
import LoadingSpinner from "../components/LoadingSpinner";
import {
  ArrowDownTrayIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import AddActivityModal from "../modals/AddActivityModal";
import UpdateActivityModal from "../modals/UpdateActivityModal";
import DeleteActivityModal from "../modals/DeleteActivityModal";
import AddOfficialModal from "../modals/AddOfficialModal";

const BarangayOfficialsTab = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [officials, setOfficials] = useState([]);
  const [sortField, setSortField] = useState("name");
  const [isLoading, setIsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // or any default value
  const [sortOrder, setSortOrder] = useState("asc"); // default sort direction
  const [editModalOpen, setEditModalOpen] = useState(false); // boolean
  const [editData, setEditData] = useState(null); // data to edit
  const [deleteModalOpen, setDeleteModalOpen] = useState(false); // boolean
  const [deleteData, setDeleteData] = useState(null); // data to edit

  const columns = [
    { label: "Official Picture", key: "officialPicture" },
    { label: "Name", key: "name" },
    { label: "Additional Details", key: "additionalDetails" },
    { label: "Position", key: "position" },
    { label: "Contact Number", key: "contactNumber" },
    { label: "Term", key: "term" },
  ];

  const fetchOfficials = async () => {
    setIsLoading(true);
    const res = await fetch("/api/officials/getOfficials");
    const data = await res.json();
    setOfficials(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOfficials();
  }, []);

  const filtered = officials.filter((official) => {
    const fullText = `
      ${official.officialPicture}
      ${official.name}
      ${official.additionalDetails}
      ${official.position}
       ${official.contactNumber}
        ${official.term}

    `
      .toLowerCase()
      .replace(/\s+/g, " ");

    return fullText.includes(search.toLowerCase());
  });

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (typeof aVal === "string") {
      return sortOrder === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
  });

  const paginated = sorted.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const convertToCSV = (data) => {
    if (!data.length) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [
      headers.join(","),
      ...data.map((row) =>
        headers
          .map((field) => {
            const val = row[field];
            if (val instanceof Date) return val.toISOString();
            return `"${String(val || "").replace(/"/g, '""')}"`;
          })
          .join(",")
      ),
    ];
    return csvRows.join("\n");
  };

  const handleExport = () => {
    const csv = convertToCSV(filtered); // filtered is your final filtered+searched array
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const now = new Date();
    const pad = (n) => n.toString().padStart(2, "0");

    const datePart = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(
      now.getDate()
    )}`;
    const timePart = `${pad(now.getHours())}-${pad(now.getMinutes())}`;

    const filename = `officials-${datePart} ${timePart}.csv`;

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleDelete = (act) => {
    setDeleteData(act);
    setDeleteModalOpen(true);
  };

  const handleUpdate = (act) => {
    setEditData(act);
    setEditModalOpen(true);
  };
  //   const formatDateForInput = (dateString) => {
  //     if (!dateString) return "";

  //     const date = new Date(dateString);
  //     if (isNaN(date.getTime())) {
  //       console.error("Invalid date string:", dateString);
  //       return "";
  //     }

  //     const pad = (n) => n.toString().padStart(2, "0");

  //     const year = date.getFullYear();
  //     const month = pad(date.getMonth() + 1);
  //     const day = pad(date.getDate());

  //     let hours = date.getHours();
  //     const minutes = pad(date.getMinutes());
  //     const ampm = hours >= 12 ? "PM" : "AM";
  //     hours = hours % 12;
  //     hours = hours ? hours : 12; // 0 should be 12

  //     return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
  //   };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <Toaster richColors position="top-center" expand={true} />

      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <Button onClick={() => setShowAddModal(true)}>
            {" "}
            + Add Barangay Official
          </Button>
          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export CSV
            </button>
          </div>
        </div>
        {/* Table */}
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
            <table className="min-w-full bg-white dark:bg-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                <tr>
                  {columns.map(({ label, key }) => (
                    <th
                      key={key}
                      className="px-6 py-3 text-left font-medium tracking-wide cursor-pointer"
                      onClick={() => {
                        if (sortField === key) {
                          setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        } else {
                          setSortField(key);
                          setSortOrder("asc");
                        }
                      }}
                    >
                      {label}{" "}
                      {sortField === key && (sortOrder === "asc" ? "🔼" : "🔽")}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((official) => (
                  <tr
                    key={official._id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={official.officialPicture}
                        alt={official.officialPicture}
                      />
                    </td>

                    <td className="px-6 py-3">{official.name}</td>
                    <td className="px-6 py-3">{official.position}</td>
                    <td className="px-6 py-3">{official.additionalDetails}</td>
                    <td className="px-6 py-3">{official.contactNumber}</td>
                    <td className="px-6 py-3">{official.term}</td>
                    {/* <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => handleUpdate(official)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(official)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {showAddModal && (
          <AddOfficialModal
            show={showAddModal}
            onClose={() => setShowAddModal(false)}
            onSubmit={() => {
              toast.success("New record saved!");
              fetchOfficials();
              setShowAddModal(false);
            }}
          />
        )}
        {/* Update Document Modal */}
        {editModalOpen && editData && (
          <UpdateActivityModal
            show={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            editData={editData}
            setEditData={setEditData}
            onSubmit={() => {
              toast.success("Record has been updated.");
              fetchActivities();
              setEditModalOpen(false);
            }}
          />
        )}
        {deleteModalOpen && (
          <DeleteActivityModal
            show={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            deleteData={deleteData}
            setDeleteData={setDeleteData}
            onConfirm={() => {
              toast.success("Record has been deleted.");
              fetchActivities();
              setDeleteModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default BarangayOfficialsTab;
