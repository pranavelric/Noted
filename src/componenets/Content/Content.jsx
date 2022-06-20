import React, { useState } from 'react';
import './content.scss';
import NoteForm from './NoteForm/NoteForm';
import Notelist from './NoteList/Notelist';


export default function Content(props) {
    const [isTyping, setIsTyping] = useState(false);
    const handleStartTyping = () => {
      if (!isTyping) {
        setIsTyping(true);
      }
    };
  
    const handleEndTyping = () => {
      setIsTyping(false);
    };

    return (
        <div className="content-root px-4">
            <div className="content">
                <NoteForm 
                          isTyping={isTyping}
                          clicked={handleStartTyping}
                          endTyping={handleEndTyping}
                />
            <Notelist grid />
            </div>
        </div>
    )
}
