import './modal.scss';
import React, { useContext, useRef, useEffect } from 'react';
import Button from '../../UI/Button/Button';
import KeepContext from '../../context/KeepContext';
import Label from '../../UI/Label/Label';
import CreateLabel from './CreateLabel/CreateLabel';

export default function Modal({ classes }) {
    const { labels, endEdit } = useContext(KeepContext);
    const wrapperRef = useRef(null);


    const handleMouseDown = event => {
        if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
          endEdit();
        }
      };
    
      useEffect(() => {
        window.addEventListener('mousedown', handleMouseDown);
        return () => {
          window.removeEventListener('mousedown', () => {});
        };
      }, []);
    
  return (
    <div
    className={`modal_root`}
  >
    <div
      ref={wrapperRef}
      className="modal_content"
    >
      <div className="py-4 px-4">
        <h2 className="text-xl">Modify Labels</h2>
      </div>
      <div className="px-4">
        <CreateLabel />
      </div>
      <div className="">
        <div className="px-4 py-4">
          {labels.map(label => (
            <Label label={label} key={label} />
          ))}
        </div>
      </div>
      <div className="modal_close_btn">
        <Button texted title="Close" clicked={endEdit}></Button>
      </div>
    </div>
  </div>
  )
}
