import { useHistory } from "react-router-dom";

const { createContext, useState, useEffect, useContext } = require("react");

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notification, setNotification] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    // console.log(localStorage.getItem("userInfo"));
    // console.log(userInfo);
    // console.log(user);

    if (!userInfo) {
      console.log(userInfo);
      history.push("/");
    }
  }, [history]); //Whenever history is updated useEffect is called

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
