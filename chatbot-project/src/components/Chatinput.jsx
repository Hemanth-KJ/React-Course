import { useState } from 'react';
import loadingspinner from '../assets/loading-spinner.gif';
import { Chatbot } from 'supersimpledev';
import './Chatinput.css';
import dayjs from 'dayjs';

export function ChatInput({chatMessages, setChatMessages}) {
      const [inputText, setInputText] = useState('');

      function saveInputText(event){
        setInputText(event.target.value);
      }

      async function sendMessage(){
         setInputText('');
         const newChatMessages = [
            ...chatMessages,
            {
               message: inputText,
               sender:'user',
               id: crypto.randomUUID(),
               time: dayjs().valueOf()
            }
         ];

         setChatMessages([
            ...newChatMessages,
           
            {
              message: <img src={loadingspinner} className="loading-spinner" />,
              sender: 'robot',
              id: crypto.randomUUID()
            }
          ]);

          const response = await Chatbot.getResponseAsync(inputText);

         setChatMessages([
            ...newChatMessages,
            {
               message: response,
               sender:'robot',
               id: crypto.randomUUID(),
               time: dayjs().valueOf()
            }
         ]);

         setInputText('');
      }
       function clearMessages() {
    setChatMessages([]);
       }
      return (
         <div className="chat-input-container">
            <input 
               className="chat-input"
               placeholder="send a message to chatbot" 
               size ="30"
               onChange={saveInputText} 
               value ={inputText}
            />
            <button
             className="send-button"
             onClick={sendMessage}>
            Send
            </button>
              <button
               onClick={clearMessages}
              className="clear-button"
             >Clear</button>
         </div>
      );
   }
