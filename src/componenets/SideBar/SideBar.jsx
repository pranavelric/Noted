import React from 'react';
import './sidebar.scss';
import { MdLightbulbOutline, MdLabelOutline, MdEdit } from 'react-icons/md';
import { BsBell, BsTrash } from 'react-icons/bs';
import { FaArchive } from 'react-icons/fa';
import KeepContext from './../../context/KeepContext';
import { useContext } from 'react';
import { Link} from 'react-router-dom';
import TitledButton from '../../UI/TitledButton/TitledButton';
import { withRouter } from '../../utils/withRouter';


function SideBar({classes,isExpanded,location}) {
  const {labels,startEdit} = useContext(KeepContext);
  
  const isActive = (path)=>{
    return location.pathname === path;
   
  };

  return (
      <div className={classes}>
        <div className="sidebar-content">
          <div>
            <Link to="/home">
              <TitledButton
              label="Note"
              isExpanded={isExpanded}
              isActive = {isActive('/home')?true:false}
              >
                <MdLightbulbOutline size="1.5em"/>
              </TitledButton>
            </Link>

            <Link to="/reminders">
            <TitledButton
              label="Reminders"
              isExpanded={isExpanded}
              isActive = {isActive('/reminders')?true:false}
              >
                 <BsBell size="1.5em" />
              </TitledButton>
            </Link>

            {labels.map(label=>{
              return (
                <Link to={`/label/${label}`} key={label}>
                     <TitledButton
                    label={label}
                    isExpanded={isExpanded}
                    isActive={isActive(`/label/${label}`) ? true : false}
                  >
                    <MdLabelOutline size="1.5em" />
                  </TitledButton>
                </Link>
              );
            })}

          <div onClick={startEdit}>
            <TitledButton label="Edit Labels" isExpanded={isExpanded}>
              <MdEdit size="1.5em" />
            </TitledButton>
          </div>


          <Link to="/archive">
            <TitledButton
              label="Archive"
              isExpanded={isExpanded}
              isActive={isActive('/archive') ? true : false}
            >
              <FaArchive size="1.5em" />
            </TitledButton>
          </Link>

          <Link to="/trash">
            <TitledButton
              label="Trash"
              isExpanded={isExpanded}
              isActive={isActive('/trash') ? true : false}
            >
              <BsTrash size="1.5em" />
            </TitledButton>
          </Link>



          </div>


          {isExpanded && (
          <div className="mt-auto">
            <div className="sidebar-policies">
              <a href="/">Privacy</a>
              <span className="px-2">&bull;</span>
              <a href="/">Conditions</a>
              <span className="px-2">&bull;</span>
              <a href="/">Licences Open Source</a>
            </div>
          </div>
        )}


        </div>
      </div>
  )
}

export default  withRouter(SideBar);
