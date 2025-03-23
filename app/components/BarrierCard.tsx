import {
  HelpCircle,
  DollarSign,
  Users,
  HelpCircleIcon,
  Wifi,
} from "lucide-react"

interface BarrierCardProps {
  icon: "connectivity" | "awareness" | "cost" | "staff" | "tool"
  title: string
}

export function BarrierCard({ icon, title }: BarrierCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "connectivity":
        return <Wifi className="h-8 w-8 text-[#2D6A4F]" />
      case "awareness":
        return <HelpCircle className="h-8 w-8 text-[#2D6A4F]" />
      case "cost":
        return <DollarSign className="h-8 w-8 text-[#2D6A4F]" />
      case "staff":
        return <Users className="h-8 w-8 text-[#2D6A4F]" />
      case "tool":
        return <HelpCircleIcon className="h-8 w-8 text-[#2D6A4F]" />
    }
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 flex flex-col items-center text-center">
      <div className="mb-2">{getIcon()}</div>
      <p className="text-sm">{title}</p>
    </div>
  )
}
