export const getSender = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1].name : users[0].name;
};

export const getSenderProfile = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};

export const isSameSender = (messages, m, i, userId) => {
  // We receive the current message along with the index of the message
  return (
    i < messages.length - 1 && //Checks if the messsage if not latest
    (messages[i + 1].sender._id !== m.sender._id || // If next message is not from the same person
      messages[i + 1].sender._id === undefined) && // If the next message does not exists
    messages[i].sender._id !== userId //  And the current message is not sent by the logged in user
  );
};

export const isLastMessage = (messages, i, userId) => {
  // We receive the current message along with the index of the message
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameSenderMargin = (messages, m, i, userId) => {
  // We receive the current message along with the index of the message
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return "auto";
};

export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};
