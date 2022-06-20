import React, { useState, useEffect, useRef, useContext } from 'react';
import { RiPushpin2Line } from 'react-icons/ri';
import { TiPin } from 'react-icons/ti';
import KeepContext from '../../../../context/KeepContext';
import Checkmark from '../../../../UI/Checkmark/Checkmark';
import Badge from '../../../../UI/Badge/Badge';
import './note.scss';
import NoteOptions from './../../../NoteOptions/NoteOptions';
import NoteParameters from '../../../NoteParameters/NoteParameters';
import Button from '../../../../UI/Button/Button';

export default function Note({ classes, note, clicked }) {
    const {
        grid,
        selectLabel,
        selectBg,
        archiveNote,
        unArchiveNote,
        pinnedNote,
        selectNote,
        selectedNotes,
        clearSelectedNotes,
      } = useContext(KeepContext);
      const [checked, setChecked] = useState(false);
      const [hovered, setHovered] = useState(false);
      const wrapperRef = useRef(null);
    
      const handleChecked = () => {
        setChecked(!checked);
        console.log('show checkbox');
      };
    
      const handleArchive = () => {
        archiveNote(note.id);
      };
    
      const handleUnarchive = () => {
        unArchiveNote(note.id);
      };
    
      const handleSelectNote = () => {
        selectNote(note.id);
      };

      const handleChangeBackground = bgColor => {
        selectBg(note.id, bgColor);
      };
      


      const handleSelectLabel = label => {
        let selected = [...note.selectedLabels];
        if (selected.indexOf(label) !== -1) {
          selected = selected.filter(l => l !== label);
        } else {
          selected = [...selected, label];
        }
        selectLabel(note.id, selected);
      };


      const handleClickOutside = event => {
        const {
          target: { classList, parentNode },
        } = event;
        let parentNodeClasses = Array.from(parentNode.classList);
    
        if (
          Array.from(classList).includes('checkmark') ||
          parentNodeClasses.includes('checkmark')
        ) {
          console.log('click on checkmark');
        } else {
          clearSelectedNotes();
        }
      };


      const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
      useEffect(() => {
        window.addEventListener('mousedown', handleClickOutside);
        return () => {
          window.removeEventListener('mousedown', () => {});
        };
      }, []);
    
    
      let isSelected = selectedNotes.findIndex(n => n === note.id);


  return (
    <div
    className={`note_root`}
    onClick={clicked}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    ref={wrapperRef}
  >
    {(hovered || isSelected !== -1) && (
        <div className="note_checkmark">
          <Checkmark
            altText={
              isSelected !== -1
                ? 'Deselect note'
                : 'Select note'
            }
            clicked={handleSelectNote}
            checked={isSelected !== -1 ? true : false}
          />

         
        </div>
      )}

<div
        className={`note_content_root ${note.bgColor} ${
          isSelected !== -1
            ? ' note_content_root_selected'
            : ' note_content_root_deselected'
        } `}
      >
        <div className="">
          <div className="note_pin">
            <span
             
              dangerouslySetInnerHTML={{ __html: note.title }}
            ></span>
            <Button
              classes=""
              small
              clicked={() => pinnedNote(note.id)}
              altText={note.pinned ? 'Remove note' : 'Pin note'}
            >
              {note.pinned ? (
                <TiPin size="1.2em" />
              ) : (
                <RiPushpin2Line size="1.2em" />
              )}
            </Button>
          </div>
          <div className="note_content">
            <span
             
              dangerouslySetInnerHTML={{ __html: note.content }}
            ></span>
          </div>
          {note.selectedLabels && (
            <div className="note_selected_labels">
              <ul >
                {note.selectedLabels.map(l => (
                  <li  key={l}>
                    <Badge label={l} clicked={() => handleSelectLabel(l)} />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div
          className={`note_utils ${
            hovered && isSelected === -1 ? ' note_utils_selected' : ' note_utils_deselected'
          }`}
        >
          <NoteOptions
            change={handleChangeBackground}
            large={!grid}
            deleted={note.deleted}
            archived={note.archived}
            archive={handleArchive}
            unarchive={handleUnarchive}
            noteId={note.id}
          />
          {!note.deleted && (
            <NoteParameters
              small
              note={note}
              selectedLabels={note.selectedLabels}
              selectLabel={handleSelectLabel}
              checked={checked}
              check={handleChecked}
            />
          )}
        </div>
      </div>


    
    </div>
  )
}
