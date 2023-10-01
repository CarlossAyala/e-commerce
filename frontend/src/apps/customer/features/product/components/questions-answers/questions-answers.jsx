import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../../components";
import { ProductQuestions } from "./product-questions";
import { UserAsk } from "./user-ask";
import { UserQuestions } from "./user-questions";

export const QuestionsAnswers = ({ productId }) => {
  return (
    <Tabs defaultValue="questions" className="space-y-4">
      <TabsList className="justify-start">
        <TabsTrigger value="questions">Questions</TabsTrigger>
        <TabsTrigger value="user-questions">Your Questions</TabsTrigger>
        <TabsTrigger value="user-ask">Ask</TabsTrigger>
      </TabsList>
      <TabsContent value="questions">
        <ProductQuestions productId={productId} />
      </TabsContent>
      <TabsContent value="user-questions">
        <UserQuestions productId={productId} />
      </TabsContent>
      <TabsContent value="user-ask">
        <UserAsk productId={productId} />
      </TabsContent>
    </Tabs>
  );
};
