import { useCallback, useMemo, useState } from 'react';

const useStep = (maxStep) => {
  const [currentStep, setCurrentStep] = useState(1);

  const canGoNext = useMemo(
    () => currentStep + 1 <= maxStep,
    [currentStep, maxStep]
  );

  const canGoBack = useMemo(() => currentStep - 1 >= 1, [currentStep]);

  const setStep = useCallback(
    (step) => {
      if (step >= 1 && step <= maxStep) {
        setCurrentStep(step);
        return;
      }

      throw new Error('Step not valid');
    },
    [maxStep, currentStep]
  );

  const goNext = useCallback(() => {
    if (canGoNext) {
      setCurrentStep((step) => step + 1);
    }
  }, [canGoNext]);

  const goBack = useCallback(() => {
    if (canGoBack) {
      setCurrentStep((step) => step - 1);
    }
  }, [canGoBack]);

  const reset = useCallback(() => {
    setCurrentStep(1);
  }, []);

  return [
    currentStep,
    {
      goNext,
      goBack,
      canGoNext,
      canGoBack,
      setStep,
      reset,
    },
  ];
};

export default useStep;
