import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { Button, Card, Badge } from "flowbite-react";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast, Toaster } from "sonner";

const ProfileCard = ({ resident, isTarget = false }) => {
  if (!resident) return null;

  return (
    <Card className="w-full">
      <div className="flex items-center gap-4">
        <img
          src={resident.residentPicture}
          alt="Resident"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {resident.first_name} {resident.middle_name} {resident.last_name}
          </h2>
          <p className="text-sm text-gray-500">{resident.occupation}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge color="info">{resident.age}</Badge>
            <Badge color="gray">{resident.gender}</Badge>
            <Badge color="success">{resident.relationship}</Badge>
          </div>
          <p className="mt-2 text-sm">
            {resident.cur_address} • {resident.purok}
          </p>
          {isTarget && (
            <p className="text-xs text-blue-600 mt-1">Target Resident</p>
          )}
        </div>
      </div>
    </Card>
  );
};

const ViewHouseholdModal = ({ show, onClose, viewData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [householdMembers, setHouseholdMembers] = useState(null);

  const fetchHouseholdMembers = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/residents/sameHousehold/${viewData._id}`);
      const data = await res.json();
      setHouseholdMembers(data);
    } catch (err) {
      toast.error("Failed to load household members");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (show) fetchHouseholdMembers();
  }, [show]);

  return (
    <Dialog open={show} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" />
      <Toaster richColors position="top-center" expand={true} />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-5xl rounded-lg bg-white p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold text-center mb-6">
            Household Members
          </Dialog.Title>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            householdMembers && (
              <div className="space-y-4">
                <ProfileCard resident={householdMembers.target} isTarget />
                <div className="grid md:grid-cols-2 gap-4">
                  {householdMembers.othersInSameHousehold?.map((member) => (
                    <ProfileCard key={member._id} resident={member} />
                  ))}
                </div>
              </div>
            )
          )}

          <div className="mt-6 flex justify-end gap-2">
            <Button color="gray" onClick={onClose}>
              Close
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewHouseholdModal;
