import { Skeleton } from "@/components/ui/skeleton";

export default function FormLoading() {
    return (
        <div className="space-y-8 mx-20 h-body">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-20" />
            <div className="gap-4 grid grid-cols-2">
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
            </div>
            <Skeleton className="w-full h-10" />
            <Skeleton className="ml-auto w-20 h-10" />
        </div>
    );
}
