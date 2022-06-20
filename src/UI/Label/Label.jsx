import './label.scss';
import React, { useState, useContext } from 'react';
import { MdLabel, MdCheck } from 'react-icons/md';
import { IoMdTrash } from 'react-icons/io';
import { GoPencil } from 'react-icons/go';
import KeepContext from '../../context/KeepContext';
import Button from '../Button/Button';





export default function Label({ label }) {
    const { editLabel, deleteLabel } = useContext(KeepContext);
  const [hover, setHover] = useState(false);
  const [name, setName] = useState(label);
  const [edit, setEdit] = useState(false);
  const handleMouseHovered = () => {
    setHover(!hover);
  };


  
  const handleOnBlur = event => {
    setEdit(false);
    if (name !== label && name !== '') {
      editLabel(label, name);
    }
  };

  const handleChange = event => {
    setName(event.target.value);
  };



  return (
    <div
      className="label_root"
      onMouseEnter={handleMouseHovered}
      onMouseLeave={handleMouseHovered}
    >
        
        <div>
        {hover | edit ? (
          <Button small clicked={() => deleteLabel(label)}>
            <IoMdTrash />
          </Button>
        ) : (
          <Button small>
            <MdLabel />
          </Button>
        )}
      </div>


      <div className="label_input">
        <input
          type="text"
          value={name}
          placeholder="Enter the name of the label"
          className={`${
            edit ? 'border-gray-400' : 'border-transparent'
          }`}
          onChange={handleChange}
          onFocus={() => setEdit(true)}
          onBlur={handleOnBlur}
        />
      </div>


      <div>
        {!edit ? (
          <Button small>
            <GoPencil />
          </Button>
        ) : (
          <Button small clicked={handleOnBlur}>
            <MdCheck />
          </Button>
        )}
      </div>

        </div>
  )
}
