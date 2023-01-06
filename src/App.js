import './App.css';
import { FormControl, Button, InputLabel, Input } from '@material-ui/core'
import React, { useEffect } from 'react';
import Message from './Message/Message';
import db from "./firebase"
import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore/lite';
import { v4 as uuid } from 'uuid';

function App() {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [userName, setUserName] = React.useState('');

  useEffect(() => {
    setUserName(prompt("Please enter your name"))
  }, [])

  const setMessageDBFromDB = async () => {
    const messageColumn = collection(db, 'message');
    const messageSnapshot = await getDocs(messageColumn);
    const messages = messageSnapshot.docs.map(doc => doc.data());
    setMessages(messages);
  }

  const addMessageToDB = () => {
    const messageRef = doc(db, 'message', uuid());
    setDoc(messageRef,  { userName: userName, message: input, timestamp: Timestamp.fromDate(new Date()) });
  }

  useEffect(() => {
    setMessageDBFromDB();
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();
    addMessageToDB();
    setMessages([...messages, { userName: userName, message: input }]);
    setInput('');
  }

  return (
    <div className='app'>
      <FormControl>
        <InputLabel>Please enter the message</InputLabel>
        <Input value={input} onChange={(e) => setInput(e.target.value)} />
        <Button disabled={!input} type='submit' variant='contained' onClick={sendMessage} color="primary">Send Mesage</Button>
      </FormControl>

      {
        messages && messages.map(message =>
          <Message userName={userName} message={message} />
        )
      }
    </div>
  );
}

export default App