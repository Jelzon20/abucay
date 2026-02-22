import React, { useState } from "react";

const operators = [
  { label: "is", value: "is" },
  { label: "is not", value: "isNot" },
  { label: "contains", value: "contains" },
  { label: "does not contain", value: "notContains" },
  { label: "starts with", value: "startsWith" },
  { label: "does not start with", value: "notStartsWith" },
];

const emptyFilter = {
  field: "",
  operator: "is",
  value: "",
  condition: "AND", // AND or OR
};

const CustomFilter = ({ columns, onApply }) => {
  const [filters, setFilters] = useState([{ ...emptyFilter }]);

  const handleChange = (index, key, value) => {
    const updated = [...filters];
    updated[index][key] = value;
    setFilters(updated);
  };

  const addFilterRow = () => {
    setFilters([...filters, { ...emptyFilter }]);
  };

  const removeFilterRow = (index) => {
    const updated = filters.filter((_, i) => i !== index);
    setFilters(updated);
  };

  const handleApply = () => {
    onApply(filters);
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border space-y-4">
      {filters.map((filter, index) => (
        <div key={index} className="grid md:grid-cols-5 gap-3 items-center">
          {index > 0 && (
            <select
              value={filter.condition}
              onChange={(e) => handleChange(index, "condition", e.target.value)}
              className="p-2 border rounded"
            >
              <option value="AND">AND</option>
              <option value="OR">OR</option>
            </select>
          )}

          {/* Field */}
          <select
            value={filter.field}
            onChange={(e) => handleChange(index, "field", e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Field</option>
            {columns.map((col) => (
              <option key={col.key} value={col.key}>
                {col.label}
              </option>
            ))}
          </select>

          {/* Operator */}
          <select
            value={filter.operator}
            onChange={(e) => handleChange(index, "operator", e.target.value)}
            className="p-2 border rounded"
          >
            {operators.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>

          {/* Value */}
          <input
            type="text"
            placeholder="Value"
            value={filter.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
            className="p-2 border rounded"
          />

          <button
            onClick={() => removeFilterRow(index)}
            className="text-red-500"
          >
            ✕
          </button>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          onClick={addFilterRow}
          className="bg-gray-500 text-white px-4 py-2 rounded"
        >
          + Add Condition
        </button>

        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Apply Filters
        </button>
        <button
          onClick={() => {
            setFilters([{ ...emptyFilter }]);
            onApply([]);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default CustomFilter;
