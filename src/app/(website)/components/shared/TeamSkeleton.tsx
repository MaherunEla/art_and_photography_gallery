import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonTeam() {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[124px] w-[216px] rounded-xl" />
    </div>
  );
}
