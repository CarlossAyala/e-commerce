import { Button } from "@carbon/react";
import { Link } from "react-router-dom";

const StateContent = ({ action, link, subtitle, title }) => {
  return (
    <div className="bg-neutral-100 px-4 py-10">
      <h3 className="text-base leading-tight font-semibold">{title}</h3>
      {subtitle && (
        <p className="text-base leading-tight font-normal">{subtitle}</p>
      )}
      {action?.text && action?.onClick && (
        <div className="mt-4">
          <Button
            kind="tertiary"
            onClick={action.onClick}
            renderIcon={action.renderIcon || null}
            iconDescription={action.iconDescription || null}
            size="md"
          >
            <p>{action.text}</p>
          </Button>
        </div>
      )}
      {link?.text && link?.to && (
        <div className="mt-4">
          <Link to={link.to}>{link.text}</Link>
        </div>
      )}
    </div>
  );
};
export default StateContent;
