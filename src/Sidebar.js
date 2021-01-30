import { Avatar, IconButton } from '@material-ui/core';
import  RateReviewOutlinedIcon  from '@material-ui/icons/RateReviewOutlined';
import SearchIcon  from '@material-ui/icons/Search';
import React, { useEffect, useState } from 'react';
import { selectUser } from './features/userSlice';
import './Sidebar.css';
import Sidebarchat from './SidebarChat.js';
import { useDispatch, useSelector } from "react-redux";
import db, { auth } from './firebase';


function Sidebar() {
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([])

    useEffect(() => {
        db.collection('chats').onSnapshot(snapshot => (
            setChats(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }))
            ))
        );
    }, []);
    
    const addChat = () => {
        const chatName = prompt('Please enter a chat name');
        if (chatName){
            db.collection('chats').add({
                chatName: chatName,
            });
        }
    }

    return (
        <div className='sidebar'>            
            <div className="sidebar__header">
                <Avatar onClick={()=> auth.signOut()} src={user.photo}className="sidebar__avatar"/>
                <div className="sidebar__input">
                    <SearchIcon/>
                    <input placeholder="Search"/>
                </div>
                <IconButton onClick={addChat} varient='outlined' className='sidebar__inputButton'>
                    <RateReviewOutlinedIcon/>       
                </IconButton>
            </div>

            <div className="sidebar__chats">
                {chats.map(({ id, data: { chatName }}) => (
                    <Sidebarchat key={id} id={id} chatName={chatName} />
                ))}

            </div>
        </div>
    )
}

export default Sidebar
