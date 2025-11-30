import { Skeleton } from "../../../components/ui/skeleton";

const Loading = () => {
  return (
    <div className="space-y-1">
      <Skeleton className="h-[50px] w-full" />
      <Skeleton className="h-[150px] w-full" />
    </div>
  );
};

export default Loading;
