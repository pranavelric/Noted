import React, { useState } from 'react';
import './checkmark.scss';

import { BsCheck } from 'react-icons/bs';



export default function Checkmark({ clicked, altText, checked }) {
 
    const [hovered, setHovered] = useState(false);
    const handleMouseEnter = () => {
    setHovered(true);
    };

    const handleMouseLeave = () => {
    setHovered(false);
    };

    return (
        <button
        className={`checkmark${
          checked ? ' text-white' : ' text-gray-600'
        }`}
        onClick={clicked}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BsCheck />
        {altText && hovered && (
          <div
            className={`checkmark_alt_txt`}
          >
            {altText}
          </div>
        )}
      </button>
  )
}
