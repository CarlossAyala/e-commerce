import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CategoryProfile } from "../components/category-profile";
import { CategoryBestSeller } from "../components/category-best-seller";
import { CategoryRandom } from "../components/category-random";
import { CategoryStores } from "../components/category-stores";
import { CategoryList } from "../components/category-list";

// TODO: Add category banner
export const Category = () => {
  const { slug } = useParams();

  useEffect(() => {
    scrollTo(0, 0);
  }, [slug]);

  return (
    <main className="container space-y-6">
      <CategoryProfile />

      <CategoryBestSeller />

      <CategoryRandom />

      <CategoryStores />

      <CategoryList />
    </main>
  );
};
