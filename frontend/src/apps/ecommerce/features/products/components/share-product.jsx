import { useEffect, useState } from "react";
import { CheckIcon, ShareIcon } from "@heroicons/react/24/outline";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/shared/components";
import { productActionRoutes } from "../utils";

export const ShareProduct = ({ product }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    const { origin } = window.location;
    const url = origin.concat(productActionRoutes.details(product));

    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error(error.message);
    } finally {
      setHasCopied(true);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  }, [hasCopied]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            type="button"
            onClick={handleCopy}
          >
            <span className="sr-only">Share product</span>
            {hasCopied ? (
              <CheckIcon className="size-5" />
            ) : (
              <ShareIcon className="size-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" align="center">
          Share product
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
