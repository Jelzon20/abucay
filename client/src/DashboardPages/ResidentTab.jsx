import React, { useState, useEffect } from "react";
import {
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { toast, Toaster } from "sonner";
import AddResidentModal from "../modals/AddResidentModal";
import UpdateResidentModal from "../modals/UpdateResidentModal";
import LoadingSpinner from "../components/LoadingSpinner";
import DeleteResidentModal from "../modals/DeleteResidentModal";
import ViewHouseholdModal from "../modals/ViewHouseholdModal";

const ResidentsPage = () => {
  const [residents, setResidents] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [deleteModal, setDeleteModal] = useState(null);
  const itemsPerPage = 10;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewData, setViewData] = useState(null); // for resident object
  const [editModal, setEditModal] = useState(null); // for resident object
  const [isLoading, setIsLoading] = useState(false);
  const [filterPurok, setFilterPurok] = useState("");
  const [filterSenior, setFilterSenior] = useState(false);
  const [filterSingleParent, setFilterSingleParent] = useState(false);

  const fetchResidents = async () => {
    setIsLoading(true);
    const res = await fetch("/api/residents/getResidents");
    const data = await res.json();
    setResidents(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResidents();
  }, []);

  const columns = [
    { label: "Photo", key: "residentPicture" },
    { label: "First Name", key: "first_name" },
    { label: "Middle Name", key: "middle_name" },
    { label: "Last Name", key: "last_name" },
    { label: "Age", key: "age" },
    { label: "Purok", key: "purok" },
    { label: "Address", key: "cur_address" },
  ];
  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const ageDiff = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const filtered = residents.filter((resident) => {
    const fullText = `
      ${resident.first_name}
      ${resident.middle_name}
      ${resident.last_name}
      ${resident.purok}
      ${resident.cur_address}
      ${resident.singleParent}
    `
      .toLowerCase()
      .replace(/\s+/g, " ");

    const age = calculateAge(resident.birthday);

    const isSenior = filterSenior ? age >= 60 : true;
    const isSingleParent = filterSingleParent
      ? resident.singleParent === "Yes"
      : true;

    return (
      fullText.includes(search.toLowerCase()) &&
      (filterPurok ? resident.purok === filterPurok : true) &&
      isSenior &&
      isSingleParent
    );
  });

  const totalResidents = filtered.length;

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

    const filename = `residents-${datePart} ${timePart}.csv`;

    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddResident = async (resident) => {
    console.log(resident); // Example: send this data to your backend API

    try {
      const res = await fetch("/api/residents/createResident", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resident),
      });

      if (!res.ok) {
        throw new Error("Failed to submit form");
      }

      const result = await res.json();
      toast.success("Resident added successfully!");

      // ✅ Refresh the resident list
      await fetchResidents();
      // Optional: reset form, image, etc.
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit resident data.");
    }
  };

  const handleView = (resident) => {
    setViewData(resident);
    setShowViewModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <Toaster richColors position="top-center" expand={true} />

      <div className="max-w-full mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 space-y-6">
        {/* Header actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition"
          >
            + Add Resident
          </button>

          <div className="flex flex-wrap gap-3">
            <input
              type="text"
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              value={filterPurok}
              onChange={(e) => setFilterPurok(e.target.value)}
              className="p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">All Puroks</option>
              {[...new Set(residents.map((r) => r.purok))].map((purok) => (
                <option key={purok} value={purok}>
                  {purok}
                </option>
              ))}
            </select>
            <div className="flex items-center gap-4 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={filterSenior}
                  onChange={(e) => setFilterSenior(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2">Senior Citizen</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={filterSingleParent}
                  onChange={(e) => setFilterSingleParent(e.target.checked)}
                  className="form-checkbox"
                />
                <span className="ml-2">Single Parent</span>
              </label>
            </div>
            <button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 transition"
            >
              <ArrowDownTrayIcon className="h-5 w-5" />
              Export CSV
            </button>
          </div>
        </div>

        {/* Add Modal */}
        <AddResidentModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddResident={handleAddResident}
        />

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
                {paginated.map((resident) => (
                  <tr
                    key={resident._id}
                    className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                  >
                    <td className="px-6 py-3">
                      <img
                        className="w-10 h-10 rounded-full"
                        src={resident.residentPicture}
                        alt={resident.residentPicture}
                      />
                    </td>
                    <td className="px-6 py-3">{resident.first_name}</td>
                    <td className="px-6 py-3">{resident.middle_name}</td>
                    <td className="px-6 py-3">{resident.last_name}</td>
                    <td className="px-6 py-3">
                      {resident.age.replace(/\s?(years|months)\sold/i, "")}
                    </td>
                    <td className="px-6 py-3">{resident.purok}</td>
                    <td className="px-6 py-3">{resident.cur_address}</td>
                    <td className="px-6 py-3 flex gap-2">
                      <button
                        onClick={() => handleView(resident)}
                        className="text-green-600 hover:text-green-800 dark:text-blue-300 dark:hover:text-blue-500"
                      >
                        View Household
                      </button>
                      <button
                        onClick={() => setEditModal(resident)}
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setDeleteModal(resident)}
                        className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-500"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!isLoading && (
          <div className="flex justify-center items-center gap-4 pt-4">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Previous
            </button>
            <span className="text-gray-600 dark:text-gray-400">
              Page {currentPage} of {Math.ceil(filtered.length / itemsPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={
                currentPage === Math.ceil(filtered.length / itemsPerPage)
              }
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Next
            </button>
          </div>
        )}

        <div className="mt-2 font-semibold text-gray-700">
          Total Residents Found: {totalResidents}
        </div>

        {/* View Modal */}
        {showViewModal && (
          <ViewHouseholdModal
            show={showViewModal}
            onClose={() => setShowViewModal(null)}
            viewData={viewData}
            onUpdated={() => {
              setViewData(null);
              fetchResidents();
            }}
          />
        )}

        {/* Edit Modal */}
        {editModal && (
          <UpdateResidentModal
            resident={editModal}
            onClose={() => setEditModal(null)}
            onUpdated={() => {
              setEditModal(null);
              fetchResidents();
            }}
          />
        )}

        {/* Delete Modal */}
        {deleteModal && (
          <DeleteResidentModal
            resident={deleteModal}
            onClose={() => setDeleteModal(null)}
            onDeleted={() => {
              setDeleteModal(null);
              fetchResidents();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ResidentsPage;
