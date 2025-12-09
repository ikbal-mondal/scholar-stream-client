import { useState, useRef, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";

const CustomDropdown = ({ label, options = [], onSelect }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(label);
  const dropdownRef = useRef(null);

  
  useEffect(() => {
    function handler(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSelect = (item) => {
    setValue(item);
    setOpen(false);
    if (onSelect) onSelect(item);
  };

  return (
    <div ref={dropdownRef} className="relative w-full">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center px-4 py-3 border border-gray-300 rounded-md text-gray-700 bg-white hover:border-primary transition"
      >
        {value}
        <FiChevronDown className="text-lg" />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <ul className="absolute left-0 right-0 mt-1 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden z-50">
          {options.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer transition"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomDropdown;
