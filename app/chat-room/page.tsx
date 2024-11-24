"use client"
import MessageBox from '@/components/MessageBox'
import { connection } from '@/services/wsService'
import { Stack, Typography, TextField, Button } from '@mui/material'
import React, { useEffect } from 'react'
import SendIcon from '@mui/icons-material/Send';
function ChatRoom() {
    const [message, setMessage] = React.useState("")
    let group = ""
    let user = ""
    useEffect(() => {
        group = sessionStorage.getItem("groupName") ?? ""
        user = sessionStorage.getItem("userName") ?? ""
    },[])
    const onSend = () => {
        connection.invoke("SendMessageToRoom", group, user, message)
    }
    return (
        <Stack width={"100vw"} height={"100vh"} alignItems={"center"} gap={6}>
            <Typography align="center" variant={"h3"} marginTop={10}>Welcome!</Typography>
            <Stack width={"40%"} bgcolor={"#D3D3D3"} borderRadius={2} paddingY={2} paddingX={3} gap={1}>
                <MessageBox />
                <Stack direction={"row"} gap={2} justifyContent={"space-around"}>
                    <TextField onChange={p => setMessage(p.target.value)} value={message} id="standard-basic" placeholder='Message' variant="standard" />
                    <Button variant="contained" startIcon={<SendIcon />} onClick={onSend}></Button>
                </Stack>
            </Stack>
        </Stack>
    )
}

export default ChatRoom