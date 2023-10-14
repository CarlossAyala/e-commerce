import { useParams } from "react-router-dom";
import { useGetCategory, useGetListCategories } from "../queries";
import { CategoryProfile } from "../components/category-profile";
import { CategoryBestSeller } from "../components/category-best-seller";
import { CategoryRopRated } from "../components/category-top-rated";
import { CategoryRandoms } from "../components/category-randoms";
import { CategoryStores } from "../components/category-stores";
import { EmptyPlaceholder } from "../../../../../components";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { CategoryList } from "../components/category-list";

const Category = () => {
  const { slug } = useParams();
  const category = useGetCategory(slug);
  const categoryList = useGetListCategories(slug);

  return (
    <main className="space-y-8 lg:container lg:max-w-5xl">
      {category.isLoading && <CategoryProfile.Skeleton />}
      {category.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching best sellers
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {category.error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {category.isSuccess && <CategoryProfile category={category.data} />}

      <CategoryBestSeller />

      <CategoryRopRated />

      <CategoryRandoms />

      <CategoryStores />

      {categoryList.isLoading && <CategoryList.Skeleton />}
      {categoryList.isError && (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon icon={FaceFrownIcon} />
          <EmptyPlaceholder.Title>
            Error fetching category list
          </EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {categoryList.error.message}
          </EmptyPlaceholder.Description>
        </EmptyPlaceholder>
      )}
      {categoryList.isSuccess && <CategoryList category={categoryList.data} />}
    </main>
  );
};

export default Category;
