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
    await Promise.all([conversation.save(), message.save()]);

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

export const receiveMessage = async (req, res) => {
  console.log("receiveMessage route");
};
