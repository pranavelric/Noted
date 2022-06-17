import React, { useContext } from 'react'
import KeepContext from '../../context/KeepContext'
import { CSSTransition } from 'react-transition-group';
import { BsList } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import Button from '../../UI/Button/Button';
import SearchBar from './SearchBar/SearchBar';
import Options from './options/Options';
import './header.scss';
import Logo from '../../UI/Logo/Logo';


export default function Header(props) {
    const {selectedNotes} = useContext(KeepContext);
    return (
    <div className="header">
        <div className="header-content">
            <div className="menu-button">
            <Button
            classes="mr-2"
            clicked={props.expandSidebar}
            altText="Menu"
            >
                <BsList size="1.5em"/>     
            </Button>
      
 
            </div>

            <Logo name="Noted"/>
            
        <SearchBar
          isFocused
          classes="search-bar"
        />
        <Options/>
        </div>
        

        {selectedNotes.length>=1 && (
                <CSSTransition
                appear={selectedNotes.length>=1}
                exit={selectedNotes.length<1}
                in={selectedNotes.length>=1}
                timeout={75}
                unmountOnExit
                classNames={{
                    appear: '-translate-y-full',
                    appearActive: 'translate-y-0',
                    appearDone: 'translate-y-0',
                    exit: '-translate-0-full',
                    exitActive: 'translate-y-full',
                    exitDone: 'translate-y-full',
                }}
                >

                <div className="selected-notes">
                    <div className="text-gray-600">
                    {/* <Button clicked={clearSelectedNotes}> */}
                        {/* <FaTimes size="1.5em" />
                    </Button> */}
                    <span className="ml-8 text-xl">
                        {selectedNotes.length > 1
                        ? `${selectedNotes.length} elements selected`
                        : `${selectedNotes.length} element selected`}
                    </span>
                    </div>
                </div>

                </CSSTransition>
        )}
    </div>
  );
};
