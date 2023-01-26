export interface Message{
  receiver:string,
  sender:string,
  messageBody:string,
  _id:string,
  timeSent:string
}

export interface ChatRoom{
  participants:[string],
  messages:[Message]
}
