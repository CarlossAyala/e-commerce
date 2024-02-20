import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  requestOfficialStoreInitial,
  requestOfficialStoreSchema,
} from "../schemas";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "../../../../../components";
import { useUpdateRequestOfficialStore } from "../queries";
import { requestOfficialStoreStatus } from "../utils";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { toast } from "sonner";

export const RequestForm = ({ requestId }) => {
  const updateRequest = useUpdateRequestOfficialStore(requestId);

  const form = useForm({
    resolver: yupResolver(requestOfficialStoreSchema),
    defaultValues: requestOfficialStoreInitial,
    mode: "onSubmit",
  });

  const handleUpdateRequest = (values) => {
    updateRequest.mutate(values, {
      onSuccess() {
        toast("Request updated successfully");
      },
      onError(error) {
        toast.message("Request could not be updated", {
          description: error.message,
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdateRequest)}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Response</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={requestOfficialStoreStatus.approved}>
                    Approve
                  </SelectItem>
                  <SelectItem value={requestOfficialStoreStatus.rejected}>
                    Reject
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={updateRequest.isLoading}>
          {updateRequest.isLoading && (
            <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
          )}
          Send
        </Button>
      </form>
    </Form>
  );
};
