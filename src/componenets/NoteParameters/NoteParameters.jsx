
import React, { useState, useRef, useEffect, useContext } from 'react';
import { BsThreeDotsVertical, BsSearch, BsPlus, BsCheck } from 'react-icons/bs';
import KeepContext from '../../context/KeepContext';
import Button from '../../UI/Button/Button';

import './noteParameter.scss';

export default function NoteParameters({
    classes,
    children,
    spacing,
    small,
    search,
    selectedLabels,
    selectLabel,
    note,
    checked,
    check,
  }) {

    const { labels, addLabel, deleteNote } = useContext(KeepContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [dropped, setDropped] = useState(false);
    const [droppedLabelOptions, setDroppedLabelOptions] = useState(false);

    const wrapperRef = useRef(null);


    
  const handleCloseDropdown = () => {
    setDropped(!dropped);
  };

  const showLabelOptions = () => {
    setDropped(false);
    setDroppedLabelOptions(!droppedLabelOptions);
  };

  const handleSearchLabel = event => {
    setSearchTerm(event.target.value);
  };

  
  const handleClickOutside = event => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDropped(false);
      setDroppedLabelOptions(false);
    }
  };

  const handleDelete = () => {
    deleteNote(note.id);
  };


  const handleAddLabel = () => {
    addLabel(searchTerm);
    selectLabel(searchTerm);
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', () => {});
    };
  }, []);


  let filteredLabels = labels;

  if (searchTerm !== '') {
    filteredLabels = labels.filter(l =>
      l.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }



  
  return (
    <div className={`noteparam_root ${classes}`} ref={wrapperRef}>
        <Button small={small} clicked={handleCloseDropdown}>
            <BsThreeDotsVertical/>
        </Button>

        <div className={`${
          dropped ? '' : 'hidden'
        } noteparameter_options`}>
            <div className="noteparameter_option_content">
            {!note ? (
            <div className="">
              <div
                className="noteparamater_label"
                onClick={showLabelOptions}
              > 
                Add a label
              </div>
              <div className="noteparamater_label" onClick={check}>
                {!checked
                  ? 'Show checkboxes'
                  : 'Hide checkboxes'}
              </div>
            </div>
          ) : (
            <div>
              <div
                className="noteparamater_label"
                onClick={handleDelete}
              >
                Delete note
              </div>

              <div
                className="noteparamater_label"
                onClick={showLabelOptions}
              >
               Edit labels
              </div>
              <div className="noteparamater_label">
              Make a copy
              </div>
              <div className="noteparamater_label">
                {!checked
                  ? 'Show checkboxes'
                  : 'Hide checkboxes'}
              </div>

              <div className="noteparamater_label">
              Copy to Google Docs
              </div>
            </div>
          )}
            </div>
        </div>


        <div
        className={`${
          droppedLabelOptions ? '' : 'hidden'
        } dropdown_label_options`}
      >

        <div className="dropdown_label_options_content">
            <div className=" px-4 py-2" onClick={showLabelOptions}>
                Note associated with a label
            </div>

          <div className="note_searchbar">
            <div className="note_searchbar_content">
              <div className="flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  className="w-full"
                  onChange={handleSearchLabel}
                  placeholder="Enter the name of the label"
                />
              </div>
              <BsSearch />
            </div>
          </div>


          <ul className="noteparams_ul">
            {filteredLabels.map(label => (
              <li
                className="noteparams_search_list"
                key={label}
              >
                <span
                  className="noteparam_search_result"
                  onClick={() => selectLabel(label)}
                >
                  {selectedLabels.indexOf(label) !== -1 ? <BsCheck /> : null}
                </span>
                <span className="flex-grow">{label}</span>
              </li>
            ))}
          </ul>

          {searchTerm !== '' && labels.indexOf(searchTerm) === -1 ? (
            <div className="noteprams_create_label">
              <BsPlus size="1.5em" />
              <div className="flex-grow ml-2" onClick={handleAddLabel}>
                    Create the label 
                <span className="ml-1">
                &ldquo;<span className="font-bold">{searchTerm}</span>&rdquo;
                </span>
              </div>
            </div>
          ) : null}

        </div>
      </div>
    </div>
  )
}
