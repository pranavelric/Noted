import React, { useContext } from 'react';
import './notelist.scss';
import { AiOutlineBulb } from 'react-icons/ai';
import { FaArchive, FaTrash } from 'react-icons/fa';
import KeepContext from '../../../context/KeepContext';
import {withRouter}  from '../../../utils/withRouter.jsx';
import Note from './Note/Note';

function Notelist({ classes, location })
 {
    const { grid, notes } = useContext(KeepContext);
    let filteredNotes = [
        ...notes.filter(note => !note.archived && !note.deleted),
    ];

    let labelPathPatern = /\/Noted\/label\/(.+)/;
    let isMatch = location.pathname.match(labelPathPatern);
    if (isMatch) {
        filteredNotes = [...notes].filter(
        note => note.selectedLabels.includes(isMatch[1]) && !note.deleted,
        );
    }
    
    if(location.pathname==='/Noted/home'){
        filteredNotes = [...notes].filter(
          note => !note.deleted,
          );
    }

    


    let pinnedExists = filteredNotes.some(el => el.pinned);
    let pinnedNotes = [];
    if (pinnedExists) {
      pinnedNotes = [...filteredNotes].filter(n => n.pinned);
      filteredNotes = filteredNotes.filter(n => !n.pinned);
    }
  

    
  let archivedNotes = [];
  let archivedExists = false;

  let archivePathPatern = /\/Noted\/archive/;
  let isArchive = location.pathname.match(archivePathPatern);
  if (isArchive) {
    pinnedExists = false;
    filteredNotes = [
      ...notes.filter(n => n.archived && !n.pinned && !n.deleted),
    ];
  } else {
    archivedExists = filteredNotes.some(el => el.archived);
    if (archivedExists) {
      archivedNotes = [...filteredNotes].filter(n => n.archived);
      filteredNotes = filteredNotes.filter(n => !n.archived);
    }
  }



  let trashPathPatern = /\/Noted\/trash/;
  let isTrash = location.pathname.match(trashPathPatern);
  if (isTrash) {
    archivedExists = false;
    pinnedExists = false;
    filteredNotes = [...notes.filter(n => n.deleted === true)];
  }




  return (
   <>
    {pinnedExists && (
        <> 
        <div className={`pinned_note_label_root ${grid?'':'pinned_note_large'}`}>
            <div className="pinned_note_label">
            Pinned note
            </div>
        </div>

        <div  className={`${classes} ${!pinnedExists ? 'py-4' : ''} ${
              grid
                ? 'pinned_note_grid_content'
                : ''
            }`}>

                    
          {pinnedNotes.map((note, i) => (
             <Note note={note} key={i} />
          ))}
            </div>
        </>
    )}

    {pinnedExists && filteredNotes.length > 0 && (
        <div className={`other_notes ${grid ? '' : 'other_note_max_width'}`}>
          <div >
            Others
          </div>
        </div>
      )}


{filteredNotes.length > 0 || pinnedExists ? (
        <div
          className={`${classes}  ${!pinnedExists ? 'py-4' : ''} ${
            grid
              ? 'filtered_notes_grid'
              : ''
          }`}
        >
    
          {filteredNotes.map((note, i) => (
             <Note note={note} key={i} />
          ))}
        </div>
      ) : (
        <div className="non_filetered_notes">
          <div className="non_filtered_notes_content">
            {isTrash && (
              <>
                <FaTrash size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                No note in trash
                </span>
              </>
            )}

            {isArchive && (
              <>
                <FaArchive size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                Your archived notes appear here.
                </span>
              </>
            )}

            {!isTrash && !isArchive && (
              <>
                <AiOutlineBulb size="8em" className="mx-auto" />
                <span className="text-xl mt-8">
                Added notes appear here.
                </span>
              </>
            )}
          </div>
        </div>
      )}


{archivedExists && archivedNotes.length > 0 && (
        <>
          <div className={`w-full ${grid ? '' : 'note_archive_large'} note_archive`}>
            <div >
            Archived notes
            </div>
          </div>
          <div
            className={`${classes} ${!archivedExists ? 'py-4' : ''} ${
              grid
                ? 'note_archive_grid'
                : ''
            }`}
          >
            {archivedNotes.map((note, i) => (
              <Note note={note} key={i} />

            ))}
          </div>
        </>
      )}




   </>




  )
}


export default  withRouter(Notelist);