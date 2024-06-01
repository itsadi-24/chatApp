// import useGetConversations from '../../hooks/useGetConversations';
// import { getRandomEmoji } from '../../utils/emojis';
// import Conversation from './Conversation';

// const Conversations = () => {
//   const { conversations, loading } = useGetConversations();
//   return (
//     <div className='flex flex-col py-2 overflow-auto'>
//       {conversations.map((conversation) => (
//         <Conversation
//           key={conversation.id}
//           conversation={conversation}
//           emoji={getRandomEmoji()}
//         />
//       ))}
//       {loading ? <span className='mx-auto loading loading-spinner' /> : null}
//     </div>
//   );
// };
// export default Conversations;
import useGetConversations from '../../hooks/useGetConversations';
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from './Conversation';

const Conversations = () => {
  const { conversations, loading } = useGetConversations();

  return (
    <div className='flex flex-col py-2 overflow-auto'>
      {Array.isArray(conversations) &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation.id}
            conversation={conversation}
            emoji={getRandomEmoji()}
          />
        ))}
      {loading ? <span className='mx-auto loading loading-spinner' /> : null}
    </div>
  );
};

export default Conversations;
