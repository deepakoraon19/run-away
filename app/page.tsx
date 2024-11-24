"use client"
import customTheme from "@/utils/theme";
import { Button, Stack, TextField, ThemeProvider, Typography, useTheme } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { connection, startConnection } from "@/services/wsService";
export default function Home() {
  const outerTheme = useTheme();
  const router = useRouter()
  const onCreateRoom = () => {
    router.push("create-room")
  }

  useEffect(() => {
    if (!connection.connectionId) {
      startConnection()
    }
  }, [])
  const [userName, setUserName] = useState("")
  const [groupName, setGroupName] = useState("")
  const onJoin = () => {
    connection.invoke("CreateARoom", groupName, userName).then(() => {
      sessionStorage.setItem("groupName", groupName)
      sessionStorage.setItem("userName", userName)
      router.push(`/chat-room`)
    })
  }
  return (
    <Stack width={"100vw"} height={"100vh"} alignItems={"center"} gap={6}>
      <Typography align="center" variant={"h3"} marginTop={10}>Hi, Welcome to run-away!</Typography>
      <ThemeProvider theme={customTheme(outerTheme)}>
        <Stack width={"30%"} bgcolor={"#D3D3D3"} borderRadius={2} paddingY={2} paddingX={3} gap={1}>
          <TextField onChange={p => setUserName(p.target.value)} value={userName} id="standard-basic" label="Enter your Username" variant="standard" />
          <TextField onChange={p => setGroupName(p.target.value)} value={groupName} id="standard-basic" label="Enter Group ID" variant="standard" />
          <Stack height={10}></Stack>
          <Button variant="contained" onClick={onJoin}>Join</Button>
          <Button variant="contained" onClick={onCreateRoom}>Create a room</Button>
        </Stack>
      </ThemeProvider>
    </Stack>
  );
}
