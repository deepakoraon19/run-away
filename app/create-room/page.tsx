"use client"

import { Stack, Typography, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { connection } from '@/services/wsService'

function CreateRoom() {
    const [userName, setUserName] = useState("")
    const [groupName, setGroupName] = useState("")
    const router = useRouter()
    const onCreateRoom = () => {
        connection.invoke("CreateARoom", groupName, userName).then(() => {
            sessionStorage.setItem("groupName", groupName)
            sessionStorage.setItem("userName", userName)
            router.push(`/chat-room`)
        })
    }
    return (
        <Stack width={"100vw"} height={"100vh"} alignItems={"center"} gap={6}>
            <Typography align="center" variant={"h3"} marginTop={10}>Lets create a room!</Typography>
            {/* <ThemeProvider theme={customTheme(outerTheme)}> */}
            <Stack width={"30%"} bgcolor={"#D3D3D3"} borderRadius={2} paddingY={2} paddingX={3} gap={1}>
                <TextField onChange={p => setUserName(p.target.value)} value={userName} id="standard-basic" label="Enter your username" variant="standard" />
                <TextField onChange={p => setGroupName(p.target.value)} value={groupName} id="standard-basic" label="Enter group name" variant="standard" />
                <Stack height={10}></Stack>
                <Button variant="contained" onClick={onCreateRoom}>Create and join!</Button>
            </Stack>
            {/* </ThemeProvider> */}
        </Stack>
    )
}

export default CreateRoom