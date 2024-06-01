import useChatScroll from '../../hooks/useChatScroll';
import useGetMessages from '../../hooks/useGetMessages';
// import useListenMessages from '../../hooks/useListenMessages';
import MessageSkeleton from '../skeletons/MessageSkeleton';
import Message from './Message';

const Messages = () => {
  const { loading, messages } = useGetMessages();
  //   useListenMessages();

  const ref = useChatScroll(messages) as React.MutableRefObject<HTMLDivElement>;

  return (
    <div className='flex-1 px-4 overflow-auto' ref={ref}>
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}

      {!loading &&
        messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}

      {!loading && messages.length === 0 && (
        <p className='text-center text-white'>
          Send a message to start the conversation
        </p>
      )}
    </div>
  );
};
export default Messages;
