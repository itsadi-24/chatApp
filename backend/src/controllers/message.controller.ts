import { Request, Response } from 'express';
import prisma from '../db/prisma.js';
export const sendMessage = async (req: Request, res: Response) => {
  try {
    //user is gonna send a msg and we gonna receive it from the body
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user.id;

    //if there is a conversation
    let conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, receiverId],
        },
      },
    });

    // the very first message is being sent,thats why we need to create a new conversation
    if (!conversation) {
      conversation = await prisma.conversation.create({
        data: {
          participantIds: {
            set: [senderId, receiverId],
          },
        },
      });
    }
    //create a message
    const newMessage = await prisma.message.create({
      data: {
        senderId,
        body: message,
        conversationId: conversation.id,
        content: '', // Add the 'content' property with an empty string value
      },
    });

    if (newMessage) {
      conversation = await prisma.conversation.update({
        where: {
          id: conversation.id,
        },
        data: {
          messages: {
            connect: {
              id: newMessage.id,
            },
          },
        },
      });
    }

    // socket.io will be added here
    res.status(201).json(newMessage);
  } catch (error: any) {
    console.error('Error in sendMessage', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
export const getMessages = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user.id;

    const conversation = await prisma.conversation.findFirst({
      where: {
        participantIds: {
          hasEvery: [senderId, userToChatId],
        },
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      return res.status(200).json([]);
    }
    res.status(201).json(conversation.messages);
  } catch (error: any) {
    console.error('Error in getMessage', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUsersForSidebar = async (req: Request, res: Response) => {
  try {
    const authUser = req.user.id;

    //here i dont want to see myself on the sidebar
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: authUser,
        },
      },
      select: {
        id: true,
        username: true,
        fullname: true,
        profilePic: true,
      },
    });
  } catch (error: any) {
    console.error('Error in getUsersForSidebar', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
};
