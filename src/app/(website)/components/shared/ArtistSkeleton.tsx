import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonArtist() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[295px] w-[280px] rounded-xl" />
    </div>
  );
}
