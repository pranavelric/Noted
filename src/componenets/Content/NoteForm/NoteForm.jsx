import React, { useState ,useRef,useEffect,useContext} from 'react';
import KeepContext from '../../../context/KeepContext';
import Button from '../../../UI/Button/Button';
import './noteForm.scss';
import { FaRegCheckSquare, FaImage } from 'react-icons/fa';
import { RiPushpin2Line } from 'react-icons/ri';
import ContentEditable from 'react-contenteditable';
import NoteOptions from '../../NoteOptions/NoteOptions';
import NoteParameters from '../../NoteParameters/NoteParameters';
import Badge from '../../../UI/Badge/Badge';

export default function NoteForm({classes,isTyping,clicked,endTyping}) {
    const {addNote} = useContext(KeepContext);
    const [archived, setArchived] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedLabels, setSelectedLabel] = useState([]);
    const [bgColor, setBgColor] = useState('bg-white');
    const [checked, setChecked] = useState(false);

    const wrapperRef = useRef(null);

    const handleTitleChange = (event)=>{
        let title = event.target.value;
        if(title==='<br>'){
            setTitle('');
        }
        else{
            setTitle(title);
        }
    };
    const handleContentChange = event => {
        let note = event.target.value;
        setContent(note);
    };
    const handleChecked = () => {
        setChecked(!checked);
    };
    const handleArchive = () => {
        setArchived(true);
    };
    const handleUnarchive = () => {
        setArchived(false);
    };

    const handleCloseForm = ()=>{
        saveNote();
        setBgColor('bg-white');
        endTyping();
    }
    
    const saveNote = ()=>{
        addNote({
            title,content,selectedLabels,bgColor,archived,deleted:false,
        });
    };

    const selectLabel = label=>{
        let selected = [...selectedLabels];
        if(selected.indexOf(label)!==-1){
            selected = selected.filter(l=>l!==label);
        }else{
            selected = [...selected, label];
        }
        setSelectedLabel(selected);
    };


    const handleChangeBackground = bgColor => {
        setBgColor(bgColor);
    };


    const handleClickOutside = event=>{
        if(wrapperRef.current && !wrapperRef.current.contains(event.target)){
            console.log(wrapperRef);
            endTyping();

            if(title !==''|| content!==''){
                saveNote();
            }else{

            }
            setContent('');
            setTitle('');
            setBgColor('bg-white');
        }
    }

    useEffect(()=>{
        window.addEventListener('mousedown',handleClickOutside);
        return ()=>{
            window.removeEventListener('mousedown',()=>{});
        };
    });
    return (
        <div className="noteform_root" onClick={clicked} ref={wrapperRef}>
            <div className={`${bgColor} noteform`}>
                {!isTyping?(
                      <div className="noteform_not_typing">
                      <span className="noteform_label">
                        Create a note...
                      </span>
                      <Button classes="mr-2">
                        <FaRegCheckSquare size="1.2em" />
                      </Button>
                      <Button classes="">
                        <FaImage size="1.2em" />
                      </Button>
                    </div>
                ):(
                    <div className="">
                            <div className="noteform_title_content"
                            
                            >
                                {!title&&(
                                        <span className="noteform_title_label">
                                        Title
                                      </span>
                                )}

                                <ContentEditable
                                    html={title}
                                    onChange={handleTitleChange}
                                    className={` noteform_title`}/>

                                <Button classes="">
                                    <RiPushpin2Line size="1.2em"/>
                                </Button>    
                            </div>


                            <div
                            className='noteform_content_area'
                        
                            >
                                {!content && (
                                         <span className="noteform_content_label">
                                         Create note...
                                       </span>
                                )}
                                
                                <ContentEditable
                                    html={content}
                                    onChange={handleContentChange}
                                    className={`noteform_content`}
                                />

                            </div>

                            {selectedLabels && (
                            <div className="noteform_labels">
                                <ul className="noteform_label_list">
                                {selectedLabels.map(l => (
                                    <li className="noteform_label_li" key={l}>
                                    <Badge label={l} clicked={selectLabel} />
                                    </li>
                                ))}
                                </ul>
                            </div>
                            )}

                            
            <div className="noteform_options">
              <NoteOptions
                large
                change={handleChangeBackground}
                archived={archived}
                archive={handleArchive}
                unarchive={handleUnarchive}
              />
              
              <NoteParameters
                selectedLabels={selectedLabels}
                selectLabel={selectLabel}
                checked={checked}
                check={handleChecked}
              />
              <Button
                classes={'noteform_close_btn'}
                texted
                title="close"
                clicked={handleCloseForm}
              />
            </div>



                            
                    </div>
                )}

            </div>
        </div>
    )
}
