import React from 'react';
import './logo.scss';
import noted_logo from '../../static/logo.png';

export default function logo({name}) {
  return (
    <div className='logo'>
        {!name||name===''?(<>
        <img src={noted_logo} alt="" className='logo-img' />
        <span className='logo-name'>Noted</span>
        </>):(
        <span className='logo-name'>{name}</span> 
        )}
    </div>
  )
}
