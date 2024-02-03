import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

export const ClearFilter = ({ handleClearFilter }) => {
  return (
    <>
      <Separator />
      <section className="p-1">
        <Button
          variant="secondary"
          className="h-8 w-full font-normal"
          onClick={handleClearFilter}
        >
          Clear
        </Button>
      </section>
    </>
  );
};
