interface StatisticCardProps {
  percentage: string
  description: string
}

export function StatisticCard({ percentage, description }: StatisticCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-6">
      <div className="flex flex-col">
        <div className="text-5xl font-bold text-[#1B4332] mb-2">
          {percentage}
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
