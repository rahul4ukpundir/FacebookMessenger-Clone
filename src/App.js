
import { FormControl, Button, InputLabel, Input, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react';
import Message from './Message/Message';
import FlipMove from 'react-flip-move';
import { Send } from '@material-ui/icons';
import './App.css';
import { db } from './firebase';
import {  ref, onValue, child, update, push } from "firebase/database";

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [userName, setUserName] = React.useState('');
  const messagesEndRef = React.createRef()
  useEffect(() => {
    setUserName(prompt("Please enter your name"))
  }, [])

  
  const setMessageDBFromDB = async () => {
    const messageRef = ref(db, `messages/`);
    onValue(messageRef, (snapshot) => {
      let newMessage = [];
      const data = snapshot.val();
      if (snapshot.exists()) {
        Object.values(data).map((messages) => {
          newMessage.push(messages);
        });
        setMessages(newMessage);
      }
    });
   
  }

  const addMessageToDB = () => {
    const messageData = {
      userName: userName,
      message: input,
      timestamp: new Date()
    }
    const newMessageKey = push(child(ref(db), 'messages')).key;
      const updates = {};
      updates['/messages/' + newMessageKey] = messageData;
      return update(ref(db), updates);
  }

  useEffect(() => {
    setMessageDBFromDB();
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();
    addMessageToDB();
    setInput('');
  }

  return (
   
    <div className='app' ref={messagesEndRef} >
      <h3>Welcome {userName}</h3>
      <form className='facebook-messenger-form'>
        <FormControl className='facebook-form-control'>
          <Input placeholder='Please enter the message' className='facebook-text-box' value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton
            className='facebook-send-button'
            disabled={!input}
            type='submit'
            variant='contained'
            onClick={sendMessage}
            color="primary">
            <Send />
          </IconButton>
        </FormControl>

      </form>
      <div className='flipMove' ref ={messagesEndRef}>
      <FlipMove className='flipMoveContainer'>
        {

          messages && messages.map((item, index) =>
            <Message key={index} userName={userName} message={item} />
          )
        }
      </FlipMove >
      </div>
    </div>
  );
}

export default App