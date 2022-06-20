import React, {useState} from 'react'
import './button.scss';
export default function Button({title,altText,children,classes,clicked,texted,small}) {
    const [hovered,setHovered] = useState(false);
    const handleHover=()=>{
        setHovered(!hovered);
    };
    if(texted){
        return (
            <button
            className={`texted-button ${classes}`}
            onClick={clicked}
          >
            {title}
          </button>
        );
    }
    else
    {


        return (
            <button
              className={`button ${
                small ? 'h-8 w-8' : 'h-10 w-10'
              }  ${classes}`}
              onClick={clicked}
              onMouseEnter={handleHover}
              onMouseLeave={handleHover}
            >
              {children}
              {/* {altText && hovered && (
                <div
                  className={`btn-child`}
                >
                  {altText}
                </div>
              )} */}
            </button>
          );






    }
   
};

