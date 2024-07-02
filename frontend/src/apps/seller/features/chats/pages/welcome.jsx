import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export const Welcome = () => {
  return (
    <div className="h-full flex-col items-center justify-center md:flex">
      <ChatBubbleLeftRightIcon className="size-20 stroke-1" />
      <p className="mt-2 text-center text-lg font-medium">
        Welcome to the chat!
      </p>
    </div>
  );
};
