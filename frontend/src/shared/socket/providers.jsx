import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Socket from "@/shared/libs/socket";
import { useAuth } from "@/shared/auth";
import { SocketContext } from "./contexts";
import { getCurrentApp } from "@/shared/utils";

export const SocketProvider = ({ children }) => {
  const [socket] = useState(() => Socket);
  const location = useLocation();

  const auth = useAuth();

  const { app } = getCurrentApp(location.pathname);

  useEffect(() => {
    if (!auth.data) {
      if (socket.connected) {
        socket.disconnect();
      }
      return;
    }

    if (socket.disconnected) {
      socket.auth = {
        accessToken: auth.data,
        entity: app,
      };
      socket.connect();
      return;
    }

    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected");
    });
    socket.on("connect_error", (error) => {
      console.log("socket connect error", error);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.data, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
