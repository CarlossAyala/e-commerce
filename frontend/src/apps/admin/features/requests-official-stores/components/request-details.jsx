import { Badge } from "../../../../../components";
import { Formatter } from "../../../../../utils";

export const RequestDetails = ({ request }) => {
  return (
    <>
      <div className="space-y-1">
        <p className="text-sm font-semibold leading-tight">Date</p>
        <p className="text-sm font-normal leading-tight">
          {Formatter.shortDate(request.createdAt)}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold leading-tight">Request</p>
        <p className="text-sm font-normal leading-tight">
          {request.description}
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold leading-tight">Response</p>
        <p className="text-sm font-normal leading-tight">{request.response}</p>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold leading-tight">Status</p>
        <Badge variant="outline" className="capitalize">
          {request.status}
        </Badge>
      </div>
    </>
  );
};
