const Span = ({ children }) => (
  <span className="ml-1.5 text-xs font-normal text-muted-foreground ">
    {children}
  </span>
);

const Mandatory = ({ required, optional }) => {
  return (
    <>
      {required && <Span>(required)</Span>}
      {optional && <Span>(optional)</Span>}
    </>
  );
};

export default Mandatory;
