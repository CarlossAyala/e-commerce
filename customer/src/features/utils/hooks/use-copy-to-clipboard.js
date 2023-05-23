import { useState } from 'react';

const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState(null);
  const [error, setError] = useState(null);

  const copy = async (text) => {
    if (!navigator?.clipboard) {
      setError('Clipboard not supported');
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      setError('Copy failed', error);
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy, error];
};

export default useCopyToClipboard;
