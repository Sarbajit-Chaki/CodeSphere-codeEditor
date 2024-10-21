import React, { useState } from "react";

const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onClick={() => setVisible(false)}
    >
      {children}
      <div
        className={`absolute left-[120%] top-0 ml-2 bg-black text-gray-200 text-sm font-mono rounded-lg py-2 px-6 z-50 whitespace-nowrap border-[1px] border-gray-700 shadow-lg
                    transform transition-all duration-300 ease-in-out 
                    ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"}`}
        style={{ pointerEvents: visible ? "auto" : "none" }}
      >
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
