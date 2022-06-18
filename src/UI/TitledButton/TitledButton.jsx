import React from 'react';
import './titledButton.scss';

export default function TitledButton({children, label,isExpanded,isActive}) {
  return (
        <div className={`${!isExpanded?'px-4':''}`}>
            <div className='title-btn-root'>
                <button className={`titled-btn ${
                    isExpanded ? 'title-btn-expanded':'title-btn-not-expanded'
                }  ${isActive ? 'title-btn-active' : ''}`}
                >
                    {children}
                    {isExpanded && (
                        <div className="title-btn-label">
                        {label}
                        </div>
                    )}

                    
                </button>

            </div>
        </div>
    )
}
