import { useState, useRef, useEffect } from "react";

export default function CustomDropdown({ options, onSelect, placeholder = "Select" }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const ref = useRef();

  // 👇 click outside close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    setSelected(option.label);
    setOpen(false);
    onSelect(option.value); // 🔥 yahan tera sort call hoga
  };

  return (
    <div ref={ref} className="relative w-48">

      {/* HEADER */}
      <div
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg cursor-pointer 
                   bg-white/10 border border-white/20 
                   flex justify-between items-center
                   hover:bg-white/20 transition"
      >
        <span>{selected || placeholder}</span>
        <span className={`transition ${open ? "rotate-180" : ""}`}>⬇️</span>
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute w-full mt-2 
                        bg-[#020617] border border-white/20 
                        rounded-lg shadow-lg overflow-hidden z-50">

          {options.map((opt) => (
            <div
              key={opt.value}
              onClick={() => handleSelect(opt)}
              className="p-2 cursor-pointer 
                         hover:bg-blue-500/20 transition"
            >
              {opt.label}
            </div>
          ))}

        </div>
      )}
    </div>
  );
}