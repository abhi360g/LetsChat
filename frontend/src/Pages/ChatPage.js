// import React, { useEffect, useState } from "react";
// import axios from "axios";

import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/misc/SideDrawer";
import { Box } from "@chakra-ui/react";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import { useState } from "react";

const ChatPage = () => {
  // const [chats, setChats] = useState([]);

  // const fetchChats = async () => {
  //   const { data } = await axios.get("/api/chat"); //Axios to fetch API
  //   setChats(data);
  // };

  // useEffect(() => {
  //   fetchChats();
  // }, []);

  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        padding="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
      {/* {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))} */}
    </div>
  );
};

export default ChatPage;
