import { Card, CardContent, Typography } from '@material-ui/core';
import React from 'react'
import "./Message.css";

const Message = ({ userName, message }) => {
    const isUser = userName === message.userName;
    return (
        <div className={`message ${isUser && 'message_user'}`}>
            <Card className={`${isUser ? 'message_userCard' : 'message_guestCard'}`}>
                <CardContent >
                    <Typography
                        color='white'
                        variant='h5'
                        component='h2'
                    >
                        {message.userName} : {message.message}
                    </Typography>
                </CardContent>

            </Card>
        </div>
    )
}

export default Message
