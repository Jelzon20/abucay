// Breadcrumb.jsx
import { useLocation } from "react-router-dom";

const Breadcrumb = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <div className="text-sm text-gray-500 dark:text-gray-300 mb-4">
      {segments.map((seg, i) => (
        <span key={i}>
          {i > 0 && " / "}
          {seg.charAt(0).toUpperCase() + seg.slice(1)}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumb;
