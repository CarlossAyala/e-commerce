import { useContext } from "react";
import { SocketContext } from "./contexts";

/**
 * Returns the socket context
 * @returns {{socket: import("socket.io-client").Socket}} socket
 */
export const useSocket = () => useContext(SocketContext);
