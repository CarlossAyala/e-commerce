import { useState } from 'react';

const useSubmit = (submitFunction) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError(null);
      await submitFunction();
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return [handleSubmit, loading, error];
};

export default useSubmit;
