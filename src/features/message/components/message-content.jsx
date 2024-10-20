/* eslint-disable max-len */
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { PlusCircle } from 'lucide-react';
import { Image } from 'lucide-react';
import { SmilePlus } from 'lucide-react';
import { SendHorizonal } from 'lucide-react';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

import messageBubbleIcon from '../assets/speech-bubble.png';
import { SAMPLE_MESSAGE } from '../test/values';
import { Message } from '../utils/class';
import { MessageBubble } from './message-bubble';

export const MessageContent = ({
  selectedMessage,
  onlineStatus,
  userName = 'Unknown',
  userProfileImage,
}) => {
  const [userMessageInput, setUserMessageInput] = useState('');
  const [userMessage, setMessageList] = useState([]);
  const [isPageLoad, setIsPageLoad] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    setMessageList(SAMPLE_MESSAGE);
    console.log(messagesEndRef.current);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [isPageLoad, userMessage]);

  useEffect(() => {
    setMessageList(SAMPLE_MESSAGE);
    scrollToBottom();
  }, [selectedMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView?.({
      behavior: 'smooth',
      block: 'end',
    });
  };

  const onHandleSendMessage = () => {
    if (userMessageInput.trim() !== '') {
      const newMessage = new Message(userMessageInput, new Date(), 'Quoc Doan');
      setMessageList(prevMessages => [...prevMessages, newMessage]);
      setUserMessageInput('');
    }
  };

  const MessageList = () => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {userMessage.map((message, index) => (
          <MessageBubble
            key={index}
            content={message.content}
            isUserMessage={message.isUserMessage}
          />
        ))}
        <div
          ref={view => {
            messagesEndRef.current = view;
            setIsPageLoad(true);
          }}
        />
      </div>
    );
  };

  if (typeof selectedMessage === 'number' && selectedMessage === -1) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <img
          src={messageBubbleIcon}
          alt="Bubble icon"
          className="w-16 h-16 opacity-20 mb-4"
        />
        <h1 className="text-2xl opacity-25 font-medium">
          {'Start a conversation'}
        </h1>
      </div>
    );
  } else {
    return (
      <div className="h-screen flex flex-col justify-between w-full">
        {/* Header */}
        <div className="flex w-full items-center top-0 border-b px-4 py-5 h-20 align-baseline gap-2 justify-between">
          <div className="flex items-center flex-grow">
            <div className="relative w-10 h-10 rounded-full">
              <Avatar>
                <AvatarImage src={userProfileImage} alt="@shadcn" />
                <AvatarFallback>{userName.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span
                className={`absolute rounded-full ${onlineStatus ? 'bg-green-400' : 'bg-gray-400'} w-3 h-3 bottom-0 left-8`}
              />
            </div>
            <div className="ml-2">
              <h1 className="font-medium">{userName}</h1>
              <h1 className="flex items-center text-sm">
                {onlineStatus ? 'Online now' : 'Offline'}
              </h1>
            </div>
          </div>
          <button className="w-6 h-6">
            <Info />
          </button>
        </div>

        {/* Message List */}
        <OverlayScrollbarsComponent
          element="div"
          options={{ scrollbars: { autoHide: 'auto' } }}
          defer
          className="flex-1 overflow-auto"
        >
          <MessageList />
        </OverlayScrollbarsComponent>

        {/* Control Bar */}
        <div className="flex items-center justify-start mb-3 mt-2 ml-4">
          <Button variant="ghost" size="icon">
            <PlusCircle className="w-6 h-6" strokeWidth={1.5}/>
          </Button>

          <Button variant="ghost" size="icon">
            <Image className="w-6 h-6" strokeWidth={1.5}/>
          </Button>

          <Button variant="ghost" size="icon">
            <SmilePlus className="w-6 h-6" strokeWidth={1.5}/>
          </Button>

          <input
            type="text"
            placeholder="Aa..."
            value={userMessageInput}
            onChange={e => setUserMessageInput(e.target.value)}
            className="ml-2 bg-gray-200/40 hover:bg-gray-200/60 h-10 rounded-full py-6 px-4 w-4/5"
          />

          <Button variant="ghost" size="icon"
            className="ml-4"
            onClick={onHandleSendMessage}
          >
            <SendHorizonal className="w-6 h-6" strokeWidth={1.5}/>
          </Button>
        </div>
      </div>
    );
  }
};

MessageContent.propTypes = {
  selectedMessage: PropTypes.number,
  onlineStatus: PropTypes.bool,
  userName: PropTypes.string,
  messageList: PropTypes.array,
};
