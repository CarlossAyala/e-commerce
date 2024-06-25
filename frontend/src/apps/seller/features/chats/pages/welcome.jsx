import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export const Welcome = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <ChatBubbleLeftRightIcon className="size-20 stroke-1 text-primary" />
      <p className="mt-2 text-center text-lg font-medium text-primary">
        Welcome to the chat!
      </p>
    </div>
  );
};
