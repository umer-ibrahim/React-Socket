
import './App.css';
import { Space, Input, Button} from 'antd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { getMessaging, getToken } from "firebase/messaging";
import FirebaseApp from './Firebase'
import {  } from "firebase/messaging";
const Socket = io.connect("http://localhost:8080")


function App() {

  const [msg, setMsg] = useState("");
  const [msgs, setMsgs] = useState([]);
  const sendMsg = ()=>{
    Socket.emit("hi",msg)
  }
  
  const generateToken = ()=>{
    // Initialize Firebase Cloud Messaging and get a reference to the service
    const messaging = getMessaging(FirebaseApp);
    getToken(messaging, {vapidKey: "BHjpZ3PljaIZ_BjIYlm443ylUGUWqjpsHrvfRE1B1U3J7sEaXMik7KM-cRn4WR6pqx58S5isX7XEvtgyb6jXQeo"})
    .then((currentToken) => {
      if (currentToken) {
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }


  useEffect(()=>{
    Socket.on("hi",
    (msg)=>{
      setMsgs([...msgs, msg]);
      setMsg("");
    })
  })

  return (
    <div className="App">
      <header className="App-header">
        <Space direction='vertical'>
          <h5>{msg}</h5>
          <Input placeholder="Message" onChange={(e)=>setMsg(e.target.value)}/>
          <Button type="primary" onClick={sendMsg} >Primary Button</Button>
          <Button type="primary" onClick={generateToken} >Generate Button</Button>
          {
            msgs.map(item =><h6>{item}</h6>)
          }
        </Space>
      </header>
    </div>
  );
}

export default App;
