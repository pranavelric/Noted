import React from 'react';
import './avatar.scss';

export default function Avatar({classes,imgSrc}) {
  return (
    <div className={`avatar ${classes}`}>
        <img src={imgSrc} alt="" className='avatar-img' />
    </div>
  )
}
