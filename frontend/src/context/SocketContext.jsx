import { createContext, useEffect } from "react";
import {io} from "socket.io-client"

export const SocketDataContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketContext = ({children})=>{
    useEffect(()=>{

        socket.on("connect",()=>{
            console.log("connected to server");
        })

        socket.on("disconnect",()=>{
            console.log("disconnected from server")
        })
    },[])

    const sendMessage = (eventname,message)=>{
        socket.emit(eventname,message);
    }

    const recieveMessage = (eventname,callback)=>{
        socket.on(eventname,callback);
    }

    return(
        <SocketDataContext.Provider value={{socket}}>
            {children}
        </SocketDataContext.Provider>
    )
}

export default SocketContext;