import './noteOptions.scss';
import React from 'react';

import {
    FaRegBell,
    FaUserPlus,
    FaPalette,
    FaImage,
    FaTrash,
    FaTrashRestore,
  } from 'react-icons/fa';
  import { MdArchive, MdUnarchive } from 'react-icons/md';
import Button from '../../UI/Button/Button';
import PaletteButton from '../../UI/PaletteButton/PaletteButton';
import KeepContext from '../../context/KeepContext';
import { useContext } from 'react';

  





export default function NoteOptions({  classes,
    large,
    change,
    archived,
    archive,
    deleted,
    unarchive,
    noteId,}) {
        let spacingClass = `${large ? 'mr-4' : 'mr-2'}`;
        const { hardDeleteNote, restoreNote } = useContext(KeepContext);
        const handleDeleteNote = ()=>{
          hardDeleteNote(noteId);
            console.log('deleted');
        }

        const handleRestoreNote = ()=>{
          restoreNote(noteId);
            console.log('Note restored');        
        }

    if (deleted){
        return (
        <div className={classes}>
        <div className="noteoption_flex">
          <Button
            classes={spacingClass}
            small
            altText="Delete definitely"
            clicked={handleDeleteNote}
          >
            <FaTrash />
          </Button>
          <Button
            classes={spacingClass}
            small
            altText="Restore"
            clicked={handleRestoreNote}
          >
            <FaTrashRestore />
          </Button>
        </div>
      </div>
    );
    }
    else{

        return (
            <div className={classes}>
            <div className="noteoption_flex">
              <Button classes={spacingClass} small altText="Send me a reminder">
                <FaRegBell />
              </Button>
              <Button classes={spacingClass} small altText="Collaborater">
                <FaUserPlus />
              </Button>
              <PaletteButton
                spacing={spacingClass}
                small
                change={change}
                altText="Change Color"
              >
                <FaPalette />
              </PaletteButton>
              <Button classes={spacingClass} small altText="Add a picture">
                <FaImage />
              </Button>
              {!archived ? (
                <Button
                  classes={spacingClass}
                  small
                  clicked={archive}
                  altText="Archiver"
                >
                  <MdArchive />
                </Button>
              ) : (
                <Button
                  classes={spacingClass}
                  small
                  clicked={unarchive}
                  altText="Undo archiving"
                >
                  <MdUnarchive />
                </Button>
              )}
            </div>
          </div>
        );

    }
};
