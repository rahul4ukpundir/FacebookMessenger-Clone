import { Card, CardContent, Typography } from '@material-ui/core';
import React, { forwardRef, useEffect } from 'react';
import dayjs from 'dayjs';
import "./Message.css";


const Message = forwardRef((props, ref) => {
    const isUser = props.userName === props.message.userName;
    const scrollToBottom = () => {
        const element =  document.getElementsByClassName("flipMove")?.[0];
        const scrollHeight = element.scrollHeight;
        const height =element.clientHeight;
        const maxScrollTop = scrollHeight - height;
        // messagesEndRef.current.scrollTo = maxScrollTop;
        //messagesEndRe //maxScrollTop > 0 ? maxScrollTop : 0;
        document.getElementsByClassName("flipMove")?.[0]?.scrollTo({
          top: maxScrollTop,
      
        });
        }
    useEffect(()=>{
        scrollToBottom();
    }, [])
    return (
        <div ref= {ref} className={`message ${isUser && 'message_user'}`}>
             {!isUser && ` ${props.message.userName || 'Unkown User'} :` }  {props.message.message}
                        <span className='timeStamp'>{dayjs(props.message.timestamp).format('h:mm A')}</span>
            
            {/* <Card className={`${isUser ? 'message_userCard' : 'message_guestCard'}`}>
                <CardContent >
                    <Typography
                        color='white'
                        variant='h5'
                        component='h2'
                    >
                        {!isUser && ` ${props.message.userName || 'Unkown User'} :` }  {props.message.message}
                        <span className='timeStamp'>{dayjs(props.message.timestamp).format('MMM D, h:mm A')}</span>
                    </Typography>
                </CardContent>

            </Card> */}
        </div>
    )
})

export default Message
