import './createLabel.scss';
import React, { useState, useContext } from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';
import { BsPlus } from 'react-icons/bs';
import KeepContext from '../../../context/KeepContext';
import Button from '../../../UI/Button/Button';

export default function CreateLabel() {

    const { addLabel } = useContext(KeepContext);
    const [name, setName] = useState('');
    const [edit, setEdit] = useState(false);
  
    const handleOnBlur = event => {
      setEdit(false);
    };
  
    const handleChange = event => {
      setName(event.target.value);
    };
  
    const clearName = () => {
      setName('');
      setEdit(false);
    };
  
    const saveLabel = () => {
      if (name !== '') {
        addLabel(name);
        setName('');
      }
    };



  return (
    <div>
    <div className="create_label_root">
      {edit || name !== '' ? (
        <Button small clicked={clearName}>
          <FaTimes />
        </Button>
      ) : (
        <Button small>
          <BsPlus />
        </Button>
      )}

      <div className="create_label_inputs">
        <input
          type="text"
          value={name}
          placeholder="Create Label"
          className={`${
            edit ? 'border-gray-400' : 'border-transparent'
          } border-b w-full text-gray-700 font-semibold text-sm`}
          onChange={handleChange}
          onFocus={() => setEdit(true)}
          onBlur={handleOnBlur}
        />
      </div>
      {edit || (!edit && name !== '') ? (
        <Button small clicked={saveLabel}>
          <FaCheck />
        </Button>
      ) : null}
    </div>
  </div>
  )
}
