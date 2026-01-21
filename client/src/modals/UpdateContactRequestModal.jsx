import React, { useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Textarea, Button, Label } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const UpdateContactRequestModal = ({ show, onClose, editData, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [state, setState] = useState("New");
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (editData) {
      setState(editData.state || "New");
      setComments(editData.comments || []);
    }
  }, [editData]);

  /* ADD COMMENT → AUTO SET TO IN-PROGRESS */
  const handleAddComment = async () => {
    if (!comment.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/contact/update/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newComment: comment,
          state: "In-progress",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      toast.success("Comment added");
      setComment("");
      onSubmit();
    } catch (error) {
      console.error(error);
      toast.error("Error adding comment");
    } finally {
      setIsLoading(false);
    }
  };

  /* RESOLVE REQUEST */
  const handleResolve = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/contact/update/${editData._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: "Resolved",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to resolve request");
      }

      toast.success("Request resolved");
      onSubmit();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Error resolving request");
    } finally {
      setIsLoading(false);
    }
  };

  if (!editData) return null;

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <Toaster richColors position="top-center" />

      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Contact Request Details
            </Dialog.Title>

            {/* DETAILS */}
            <div className="space-y-2 text-sm mb-4">
              <p>
                <strong>Name:</strong> {editData.name}
              </p>
              <p>
                <strong>Email:</strong> {editData.email}
              </p>
              <p>
                <strong>Phone:</strong> {editData.phone}
              </p>
              <p>
                <strong>Issue Type:</strong> {editData.issueType}
              </p>
              {editData.otherIssue && (
                <p>
                  <strong>Other Issue:</strong> {editData.otherIssue}
                </p>
              )}
              <p>
                <strong>Address:</strong> {editData.address}
              </p>
              <p>
                <strong>Message:</strong> {editData.message}
              </p>
              <p>
                <strong>Submitted:</strong>{" "}
                {new Date(editData.createdAt).toLocaleString()}
              </p>

              {/* STATE DISPLAY */}
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`font-semibold ${
                    state === "New"
                      ? "text-blue-600"
                      : state === "In-progress"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {state}
                </span>
              </p>
            </div>

            <hr className="my-4" />

            {/* COMMENTS HISTORY */}
            <div className="mb-4">
              <Label value="Comments" />
              <div className="space-y-2 max-h-40 overflow-y-auto border rounded p-2 text-sm">
                {comments.length === 0 ? (
                  <p className="text-gray-500 italic">No comments yet.</p>
                ) : (
                  comments.map((c, index) => (
                    <div key={index} className="border-b pb-1">
                      <p>{c.message}</p>
                      <small className="text-gray-400">
                        {new Date(c.commentedAt).toLocaleString()}
                      </small>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* ADD COMMENT */}
            {state !== "Resolved" && (
              <div className="mb-4">
                <Textarea
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                />
                <div className="flex justify-end mt-2">
                  <Button size="sm" onClick={handleAddComment}>
                    Post Comment
                  </Button>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2 mt-4">
              {state === "In-progress" && (
                <Button color="blue" onClick={handleResolve}>
                  Resolve
                </Button>
              )}
              <Button color="gray" onClick={onClose}>
                Close
              </Button>
            </div>
          </Dialog.Panel>
        </div>
      )}
    </Dialog>
  );
};

export default UpdateContactRequestModal;
