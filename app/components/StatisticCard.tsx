interface StatisticCardProps {
  percentage: string
  description: string
}

export function StatisticCard({ percentage, description }: StatisticCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-8">
      <div className="flex gap-4 flex-col lg:flex-row"> 
        <div className="text-5xl font-bold text-[#0D261A] mb-2  font-raleway">
          {percentage}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
