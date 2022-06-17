import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import Button from './../../../UI/Button/Button';


export default function SearchBar({classes,isFocused}) {
  return (
    <div className={classes}>

    {/* <Button classes="hidden">
        <BsSearch size="1.2em" />
    </Button> */}

    <div
    className={`searchbar-content hidden  ${
    isFocused? 'bg-white':'bg-gray-300'
    } bg-transparent`}
    >
        <div>
        <BsSearch className="text-gray-600" size="1.2em" />
        </div>

        <input
          type="text"
          className="hidden"
          placeholder="search"
        />

        <div>
          <FaTimes className="hidden block text-gray-600" size="2.2" />
        </div>
   
    </div>

    </div>
  );
};
