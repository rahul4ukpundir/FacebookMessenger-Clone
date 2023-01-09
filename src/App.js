
import { FormControl, Button, InputLabel, Input, IconButton } from '@material-ui/core'
import React, { useEffect } from 'react';
import Message from './Message/Message';
import db from "./firebase"
import { collection, getDocs, doc, setDoc, Timestamp, query, orderBy } from 'firebase/firestore/lite';
import { v4 as uuid } from 'uuid';
import FlipMove from 'react-flip-move';
import { Send } from '@material-ui/icons';
import './App.css';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [userName, setUserName] = React.useState('');

  useEffect(() => {
    setUserName(prompt("Please enter your name"))
  }, [])

  const setMessageDBFromDB = async () => {
  
    const messageColumn = collection(db, 'messages');
    let messageSnapshot = await getDocs(query(messageColumn, orderBy('timestamp', 'desc')));

    const messages = messageSnapshot.docs.map(doc => ({id: doc.id, data: doc.data()}));
    debugger
    setMessages(messages);
  }

  const addMessageToDB = () => {
    const messageRef = doc(db, 'messages', uuid());
    setDoc(messageRef,  { userName: userName, message: input, timestamp: Timestamp.fromDate(new Date()) });
    setMessageDBFromDB();
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
    <div className='app'>
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
    <FlipMove>
      {
        messages && messages.map(({id,data}) =>
          <Message key={id} userName={userName} message={data} />
        )
      }
      </FlipMove >
    </div>
  );
}

export default App