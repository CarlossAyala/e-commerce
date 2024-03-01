import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components";
import { Questions } from "./questions";
import { UserQuestions } from "./user-questions";
import { UserQuestionForm } from "./user-question-form";

export const FAQ = ({ productId }) => {
  return (
    <Tabs defaultValue="questions" className="space-y-2">
      <TabsList className="justify-start">
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="user-questions">Your Questions</TabsTrigger>
        <TabsTrigger value="user-ask">Ask</TabsTrigger>
      </TabsList>
      <TabsContent value="questions">
        <Questions productId={productId} />
      </TabsContent>
      <TabsContent value="user-questions">
        <UserQuestions productId={productId} />
      </TabsContent>
      <TabsContent value="user-ask">
        <UserQuestionForm productId={productId} />
      </TabsContent>
    </Tabs>
  );
};
