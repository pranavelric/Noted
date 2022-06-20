import React from 'react';
import { useState } from 'react';
import { FaPalette } from 'react-icons/fa';
import { BsCheck } from 'react-icons/bs';
import Button from '../Button/Button';
import './paletteButton.scss';

export default function PaletteButton({ classes, clicked, spacing, small, change }) {
  const [hovered,setHovered] = useState(false);
  const [color,setColor] = useState('bg-white');
  const colors = [
    'bg-white',
    'bg-red-500',
    'bg-orange-400',
    'bg-yellow-400',
    'bg-teal-300',
    'bg-green-300',
    'bg-blue-400',
    'bg-indigo-200',
    'bg-purple-400',
    'bg-red-300',
    'bg-yellow-500',
    'bg-gray-200',
  ];
  const handleChangeColor = color => {
    setColor(color);
    change(color);
  };
  const handleMouseEntered = () => {
    setHovered(true);
  };

  const handleMouseLeaved = () => {
    setHovered(false);
  };

  return (
    <div
    className={`root_palette_btn ${spacing}`}
    onMouseEnter={handleMouseEntered}
    onMouseLeave={handleMouseLeaved}
  >
    <Button small={small}>
      <FaPalette />
    </Button>
    <div
      className={`${
        hovered ? '' : 'hidden'
      } palette_content`}
    >
      <div className="palette_colors_content">
        {colors.map(c => (
          <div
            className={`${c} palette_color_items ${
              color === c
                ? 'border-gray-800'
                : c === 'bg-white'
                ? 'border-gray-600'
                : 'border-transparent'
            }`}
            key={c}
            onClick={() => handleChangeColor(c)}
          >
            {color === c && <BsCheck />}
          </div>
        ))}
      </div>
    </div>
  </div>
  )
}
