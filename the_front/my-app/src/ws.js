import { useEffect } from "react";
import io from "socket.io-client";
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
const BASE_URL = "http://localhost:3001";
const socket = io(BASE_URL);

const Ws = (props) => {
  const handleNewUserMessage = (message) => {
    console.log(message);
    socket.emit("message", message);
  };
  useEffect(() => {
    socket.on("new-message", (data) => {
      console.log(data);
      addResponseMessage(data);
    });
  }, []);

  return <Widget handleNewUserMessage={handleNewUserMessage} />;
};

export default Ws;
