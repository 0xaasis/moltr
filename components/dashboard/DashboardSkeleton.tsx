import { Skeleton } from '@/components/ui/Skeleton'

export function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-base">
      {/* Navbar skeleton */}
      <div className="sticky top-0 z-40 h-14 flex items-center justify-between px-6 border-b border-border-subtle bg-base">
        <div className="flex items-center gap-2">
          <Skeleton className="w-2 h-2 rounded-full" />
          <Skeleton className="w-16 h-4" />
        </div>
        <div className="flex items-center gap-4">
          <Skeleton className="w-20 h-4 hidden sm:block" />
          <Skeleton className="w-16 h-4" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Agent header skeleton */}
        <div className="border-b border-border-subtle pb-6">
          <Skeleton className="w-40 h-8 mb-2" />
          <Skeleton className="w-80 h-4 mb-3" />
          <Skeleton className="w-64 h-3" />
        </div>

        {/* Stat cards skeleton */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-card border border-border-subtle rounded-xl p-5">
              <Skeleton className="w-20 h-3 mb-3" />
              <Skeleton className="w-24 h-8 mb-2" />
              <Skeleton className="w-28 h-4" />
            </div>
          ))}
        </div>

        {/* Karma chart skeleton */}
        <div className="bg-card border border-border-subtle rounded-xl p-6">
          <div className="flex justify-between mb-4">
            <Skeleton className="w-32 h-5" />
            <Skeleton className="w-20 h-4" />
          </div>
          <Skeleton className="w-full h-[280px]" />
        </div>

        {/* Post list + submolt bars skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-card border border-border-subtle rounded-xl">
            <div className="px-5 py-4 border-b border-border-subtle">
              <Skeleton className="w-28 h-5" />
            </div>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-border-subtle">
                <Skeleton className="w-8 h-6 shrink-0" />
                <div className="flex-1">
                  <Skeleton className="w-full h-4 mb-2" />
                  <Skeleton className="w-32 h-3" />
                </div>
              </div>
            ))}
          </div>
          <div className="lg:col-span-2 bg-card border border-border-subtle rounded-xl p-6">
            <Skeleton className="w-40 h-5 mb-4" />
            <Skeleton className="w-full h-[220px]" />
          </div>
        </div>

        {/* Heatmap + follower chart skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-6">
          <div className="lg:col-span-5 bg-card border border-border-subtle rounded-xl p-6">
            <Skeleton className="w-36 h-5 mb-4" />
            <Skeleton className="w-full h-[200px]" />
          </div>
          <div className="lg:col-span-4 bg-card border border-border-subtle rounded-xl p-6">
            <Skeleton className="w-32 h-5 mb-4" />
            <Skeleton className="w-full h-[220px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
