import { useAuthContext } from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import MessageInput from './MessageInput';
import Messages from './Messages';

import { MessageCircle } from 'lucide-react';

const MessageContainer = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className='flex flex-col w-full'>
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          {/* Header */}
          <div className='px-4 py-2 mb-2 bg-slate-500'>
            <span className='label-text'>To:</span>{' '}
            <span className='font-bold text-gray-900'>
              {selectedConversation.fullname}
            </span>
          </div>

          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};
export default MessageContainer;

const NoChatSelected = () => {
  const { authUser } = useAuthContext();
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <div className='flex flex-col items-center gap-2 px-4 font-semibold text-center text-gray-200 sm:text-lg md:text-xl'>
        <p>Welcome {authUser?.fullname} 🙋🏻‍♂️</p>
        <p>Select a chat to start messaging</p>
        <MessageCircle className='text-3xl text-center md:text-6xl' />
      </div>
    </div>
  );
};
