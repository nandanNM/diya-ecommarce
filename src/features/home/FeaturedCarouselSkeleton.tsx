import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedCarouselSkeleton() {
  return (
    <div className="relative w-full border-b border-zinc-800 bg-zinc-900">
      <div className="flex min-h-[400px] flex-col md:min-h-[450px] md:flex-row lg:min-h-[500px]">
        {/* Image Skeleton - Left side */}
        <div className="relative h-64 w-full border-r border-zinc-800/50 md:h-auto md:w-3/5">
          <Skeleton className="h-full w-full bg-zinc-800" />
        </div>

        {/* Content Skeleton - Right side */}
        <div className="flex w-full flex-col justify-center space-y-6 px-6 py-8 md:w-2/5 md:px-10 lg:px-16">
          <div className="space-y-4">
            <Skeleton className="h-6 w-24 bg-zinc-800/50" /> {/* Badge */}
            <Skeleton className="h-10 w-3/4 bg-zinc-800/50" /> {/* Title */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-zinc-800/50" />
            <Skeleton className="h-4 w-full bg-zinc-800/50" />
            <Skeleton className="h-4 w-2/3 bg-zinc-800/50" />
          </div>
          <Skeleton className="h-8 w-32 bg-zinc-800/50" /> {/* Price */}
          <div className="pt-4">
            <Skeleton className="h-12 w-40 rounded-md bg-zinc-800/50" />{" "}
            {/* Button */}
          </div>
        </div>
      </div>
    </div>
  );
}
