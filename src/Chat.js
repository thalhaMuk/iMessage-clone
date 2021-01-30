import { IconButton } from '@material-ui/core';
import MicNoneIcon from '@material-ui/icons/MicNone';
import React, { useState, useEffect } from 'react'
import "./Chat.css"
import Message from "./Message"
import { useSelector } from 'react-redux';
import { selectchatId, selectchatName } from './features/chatSlice'
import db from './firebase';
import firebase from 'firebase';
import { selectUser } from './features/userSlice';
import FlipMove from "react-flip-move"

function Chat() {
    const user = useSelector(selectUser);
    const[input, setInput] = useState("");
    const chatName = useSelector(selectchatName);
    const chatId = useSelector(selectchatId);
    const[messages, setMessages] = useState([]);

    useEffect(() => {
        if(chatId){
            db.collection('chats').doc(chatId).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => (
                setMessages(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data()
                })))
            ));
        }
    }, [chatId]);
    
    const sendMessage = (e) => {
        e.preventDefault();

        db.collection('chats').doc(chatId).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: input,
            uid: user.uid,
            photo: user.photo,
            email: user.email,
            displayName: user.displayName,
        });

        setInput("");
    };

    return (
        <div className="chat">
            {/* chat header */}
            <div className="chat__header">
                <h4>To: <span className="chat__name">{chatName}</span></h4>
                <strong>Details</strong>
            </div>

            {/* chat message */}
            <div className="chat__message">
                <FlipMove>
                {messages.map(({ id, data }) =>(
                    <Message key={id} contents={data}/>
                ))}
                </FlipMove>
            </div>

            {/* chat input */}
            <div className='chat__input'>
                <form>
                    <input
                     value ={input}
                     onChange={(e) => setInput(e.target.value)}
                     placeholder="Type a message"
                     type="text"
                     />
                    <button onClick={sendMessage}>Sen Message</button>
                </form>

                <IconButton>
                    <MicNoneIcon className="chat__mic"/>
                </IconButton>  

            </div>
            </div>
    )
}

export default Chat
