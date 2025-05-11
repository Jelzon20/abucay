import React, { useEffect, useState } from "react";
import { Modal, Button, TextInput } from "flowbite-react";
import UpdateDocumentModal from "../modals/UpdateDocumentModal";
import LoadingSpinner from "../components/LoadingSpinner";
import AddDocumentModal from "../modals/AddDocumentModal";
import { toast, Toaster } from "sonner";
import DeleteDocumentModal from "../modals/DeleteDocumentModal";

const DocumentsTab = () => {
  const [docs, setDocuments] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    files: [],
  });

  const [editModalOpen, setEditModalOpen] = useState(false); // boolean
  const [editData, setEditData] = useState(null); // data to edit
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [docToDelete, setDocToDelete] = useState(null);

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const docsPerPage = 6;

  const filteredDocs = docs.filter(
    (doc) =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDocs.length / docsPerPage);
  const indexOfLastDoc = currentPage * docsPerPage;
  const indexOfFirstDoc = indexOfLastDoc - docsPerPage;
  const currentDocs = filteredDocs.slice(indexOfFirstDoc, indexOfLastDoc);
  const [isLoading, setIsLoading] = useState(false);

  const fetchDocuments = async () => {
    setIsLoading(true);
    const res = await fetch("/api/documents/getDocuments");
    const data = await res.json();
    setDocuments(data.documents);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleDelete = (doc) => {
    setDocToDelete(doc);
    setShowDeleteModal(true);
  };

  const handleUpdate = (doc) => {
    setEditData(doc);
    setEditModalOpen(true);
  };
  const handleAdd = () => {
    setShowAddModal(true);
  };

  const isImage = (url) => {
    return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
  };

  return (
    <div className="p-6">
      <Toaster richColors position="top-center" expand={true} />
      <div className="flex justify-between items-center mb-4">
        <Button onClick={() => setShowAddModal(true)}> + Add Document</Button>
        <TextInput
          type="text"
          placeholder="Search documents..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentDocs.map((doc) => (
            <div key={doc._id} className="bg-white shadow-md rounded p-4">
              <h2 className="text-lg font-semibold">{doc.title}</h2>
              <p className="text-gray-600">{doc.description}</p>
              <div className="mt-2">
                <strong>Files:</strong>
                {doc.files.length > 0 ? (
                  <ul className="list-disc list-inside">
                    {doc.files.map((fileUrl, idx) => {
                      const decodedUrl = decodeURIComponent(fileUrl);
                      const filename =
                        decodedUrl.split("/files/")[1]?.split("?")[0] ||
                        "Unknown";
                      const truncated =
                        filename.length > 30
                          ? filename.slice(0, 27) + "..."
                          : filename;

                      return (
                        <li key={idx}>
                          <a
                            href={fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                            title={filename}
                          >
                            {truncated}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-gray-500">No files available</p>
                )}
              </div>
              <div className="flex justify-end mt-4 space-x-2">
                <Button size="sm" onClick={() => handleUpdate(doc)}>
                  Update
                </Button>
                <Button
                  size="sm"
                  color="failure"
                  onClick={() => handleDelete(doc)}
                  className="bg-red-500 text-white"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Update Document Modal */}
      {editModalOpen && editData && (
        <UpdateDocumentModal
          show={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          editData={editData}
          setEditData={setEditData}
          onSubmit={() => {
            toast.success("Record has been updated.");
            fetchDocuments();
            setEditModalOpen(false);
          }}
        />
      )}
      {showDeleteModal && (
        <DeleteDocumentModal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          deleteData={docToDelete}
          onConfirm={() => {
            toast.success("Record has been deleted.");
            fetchDocuments();
            setShowDeleteModal(false);
          }}
        />
      )}

      {/* Add Document Modal */}
      {showAddModal && (
        <AddDocumentModal
          show={showAddModal}
          onClose={() => setShowAddModal(false)}
          onSubmit={(data) => {
            toast.success(data);
            fetchDocuments();
            setShowAddModal(false);
          }}
        />
      )}
    </div>
  );
};

export default DocumentsTab;
