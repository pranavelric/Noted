import React, { useContext } from 'react';
import { MdRefresh, MdViewList } from 'react-icons/md';
import { BsGrid3X3Gap } from 'react-icons/bs';
import { FaCog } from 'react-icons/fa';
import KeepContext from './../../../context/KeepContext';
import Button from './../../../UI/Button/Button';

export default function Options() {
    const { grid, switchLayout } = useContext(KeepContext);
    return (
        <div className="options">
        <Button >
          <MdRefresh size="1.5em" />
        </Button>
        <Button  clicked={switchLayout}>
          {!grid ? <BsGrid3X3Gap size="1.5em" /> : <MdViewList size="1.5em" />}
        </Button>
  
        <Button>
          <FaCog size="1.5em" />
        </Button>
  
        {/* <Avatar imgSrc={profileImg} /> */}
      </div>
  )
}
