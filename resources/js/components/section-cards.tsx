import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
       <Card className="@container/card transition-transform transform hover:scale-105 hover:shadow-lg ">
        <CardHeader>
          <CardDescription className="text-[#23B791] text-lg font-bold ml-8">Reparaciones Realizadas</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center mt-5">
            127
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card transition-transform transform hover:scale-105 hover:shadow-lg ">
        <CardHeader>
          <CardDescription className="text-[#3B82F6] text-lg font-bold ml-5">Mantenimientos Realizados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center mt-5">
            89
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card transition-transform transform hover:scale-105 hover:shadow-lg ">
        <CardHeader>
          <CardDescription className="text-[#FDBD28] text-lg font-bold ml-5">Total de Reportes Pendientes</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center mt-5">
              23
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card transition-transform transform hover:scale-105 hover:shadow-lg ">
        <CardHeader>
          <CardDescription className="text-[#8B5CF6] text-lg font-bold ml-6">Total de Reportes Cerrados</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl text-center mt-5">
              156
          </CardTitle>
          <CardAction>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
        </CardFooter>
      </Card>
    </div>
  )
}
