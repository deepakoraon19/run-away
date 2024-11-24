import { connection } from '@/services/wsService'
import { Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface Msg{
    user :string
    message: string
}

function MessageBox() {
    const [messages, setMessages] = useState<Msg[]>([])
    const user = sessionStorage.getItem("userName")
    const group = sessionStorage.getItem("groupName")
    useEffect(() => {
        connection.invoke("JoinGroup", group, user).then(() => { console.log("Connected to ", group) })
    }, [])

    connection.on("SendMessage", (user :string, message:string) => {
        setMessages([...messages, {user,message}])
        console.log(user, message)
    })
    return (
        <Stack width={"100%"} bgcolor={"#D3D3D3"} height={"40vh"} gap={1}>
            {messages.map((message, index) =>
                <Stack key={index} bgcolor={"#b9b9b9"} width={"80%"} borderRadius={3}>
                    <Typography sx={{fontSize:".6rem"}} marginTop={.5} marginX={2} color='#185b2d'>{message.user}</Typography>
                    <Typography marginX={2}  marginBottom={.5} color='black'>{message.message}</Typography>
                </Stack>)}
        </Stack>
    )
}

export default MessageBox