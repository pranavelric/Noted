import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './badge.scss';


export default function Badge({ classes, label, clicked }) {

    const [hovered, setHovered] = useState(false);
    const handleHovered = () => {
      setHovered(!hovered);
    };

  return (
    <div
    className={`badge_root ${classes}`}
    onMouseEnter={handleHovered}
    onMouseLeave={handleHovered}
  >
     <div className="badge_label">
        {label}
      </div>

      {hovered && (
        <div className="badge_content">
          <span className="">...</span>
          <div
            className="badge_button"
            onClick={() => clicked(label)}
          >
            <FaTimes size="0.8em" />
          </div>
        </div>
      )}
    </div>
  )
}
