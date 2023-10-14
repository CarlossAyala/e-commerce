import { Skeleton } from "../../../../../components";

export const CategoryProfile = ({ category }) => {
  return (
    <section className="space-y-4">
      <div className="h-56">
        <img
          className="h-full w-full object-cover"
          src="https://pbs.twimg.com/profile_banners/3106820359/1592524330/1500x500"
          alt={`${category.name} category banner`}
        />
      </div>
      <div className="space-y-1 px-4 lg:px-0">
        <h2 className="text-2xl font-bold">{category.name}</h2>
        <p className="text-sm leading-tight">{category.description}</p>
      </div>
    </section>
  );
};

CategoryProfile.Skeleton = function CategoryProfileSkeleton() {
  return (
    <section className="space-y-4">
      <Skeleton className="h-56 w-full rounded-none" />
      <div className="space-y-2 px-4 lg:px-0">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
      </div>
    </section>
  );
};
