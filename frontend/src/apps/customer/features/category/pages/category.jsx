import { CategoryProfile } from "../components/category-profile";
import { CategoryBestSeller } from "../components/category-best-seller";
import { CategoryRopRated } from "../components/category-top-rated";
import { CategoryRandoms } from "../components/category-randoms";
import { CategoryStores } from "../components/category-stores";
import { CategoryList } from "../components/category-list";

const Category = () => {
  return (
    <main className="space-y-6 lg:container lg:max-w-5xl">
      <CategoryProfile />

      <CategoryBestSeller />

      <CategoryRopRated />

      <CategoryRandoms />

      <CategoryStores />

      <CategoryList />
    </main>
  );
};

export default Category;
