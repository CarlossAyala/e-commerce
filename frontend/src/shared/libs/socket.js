import { io } from "socket.io-client";
import { SOCKET_URL } from "../../configs";

const Socket = io(SOCKET_URL, {
  auth: {},
  autoConnect: false,
});

export default Socket;
