import React from "react";

const LuponMultiSelect = ({ allOptions, selected, setSelected }) => {
  // Ensure selected is an array
  const selectedIds = Array.isArray(selected) ? selected : [];

  // Get the actual objects from selected IDs
  const selectedMembers = allOptions.filter((member) =>
    selectedIds.includes(member._id)
  );

  // Filter out selected options from dropdown
  const availableOptions = allOptions.filter(
    (member) => !selectedIds.includes(member._id)
  );

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    if (!selectedIds.includes(selectedId)) {
      setSelected([...selectedIds, selectedId]);
    }
  };

  const handleRemove = (idToRemove) => {
    setSelected(selectedIds.filter((id) => id !== idToRemove));
  };

  return (
    <div>
      <select
        onChange={handleSelect}
        value=""
        className="block w-full p-2 mb-2 border border-gray-300 rounded"
      >
        <option value="">Select member</option>
        {availableOptions.map((member) => (
          <option key={member._id} value={member._id}>
            {member.name} ({member.position})
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2 mt-2">
        {selectedMembers.map((member) => (
          <span
            key={`pill-${member._id}`} // use prefix to avoid raw duplicate key
            className="inline-flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
          >
            {member.name}
            <button
              type="button"
              onClick={() => handleRemove(member._id)}
              className="ml-2 text-blue-500 hover:text-blue-700"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default LuponMultiSelect;
