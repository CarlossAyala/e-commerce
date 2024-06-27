import { io } from "socket.io-client";
import { API_URL } from "../../configs";

const Socket = io(API_URL, {
  auth: {},
  autoConnect: false,
});

export default Socket;
