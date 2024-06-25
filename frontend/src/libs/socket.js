import { API_URL } from "@/configs";
import { io } from "socket.io-client";

export const socket = io(API_URL, {
  autoConnect: false,
});
