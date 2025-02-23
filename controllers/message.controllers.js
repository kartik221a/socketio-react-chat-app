import Message from "../models/message.model.js";
import Conversation from "../models/conversation.model.js";
import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverObjectId } = req.params;
    const senderId = req.user?._id;
    const receiverId = new mongoose.Types.ObjectId(receiverObjectId);

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    conversation.messages.push(newMessage._id);

    //we will not write like this because it will execute one by one so take 2 units of time
    // await newMessage.save();
    // await conversation.save();

    //we will write it like this so that it'll run parallelly and take only 1 unit of time
    await Promise.all([conversation.save(), newMessage.save()]);

    //TODO: WE WILL WRITE SOCKET.IO FUNCTIONALITY HERE

    res.status(200).json({
      newMessage,
    });
  } catch (error) {
    console.log("something went wrong in message.controllers.js: ", error);
    res.status(500).json({
      error: "Internal server error in message controller",
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // Replaces ObjectId references in "messages" with actual Message documents

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("error while get messages in message controller: ", error);
    res.status(500).json({
      error: "error while get messages controller",
    });
  }
};
