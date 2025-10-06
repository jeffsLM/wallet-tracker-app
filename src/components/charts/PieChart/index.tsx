import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from '@/lib/utils'

const chartColors = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

interface PayerData {
  payer: string;
  amount: number;
}

interface DynamicPieChartProps {
  data: PayerData[];
  title?: string;
  description?: string;
  showTrend?: boolean;
  currency?: string;
  className?: string;
  competence?: string;
  isLoading?: boolean;
}

function PieChartSkeleton() {
  return (
    <Card className="flex flex-col">
      <CardHeader className='rounded-tl-lg rounded-tr-lg flex flex-row justify-between'>
        <div className="space-y-2">
          <div className="h-6 w-48 bg-muted animate-pulse rounded" />
          <div className="h-4 w-32 bg-muted animate-pulse rounded" />
        </div>
        <div className="h-4 w-20 bg-muted animate-pulse rounded" />
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[300px] flex items-center justify-center">
          <div className="w-[250px] h-[250px] rounded-full bg-muted animate-pulse" />
        </div>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="h-4 w-full bg-muted animate-pulse rounded" />
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
      </CardFooter>
    </Card>
  )
}

export default function PieChartDynamic({
  data,
  title = "Distribuição de Pagamentos",
  description = "Valores por Pagador",
  showTrend = true,
  currency = "R$",
  className,
  competence,
  isLoading = false
}: DynamicPieChartProps) {

  if (isLoading) {
    return <PieChartSkeleton />
  }

  // Transformar os dados para o formato do gráfico
  const chartData = data.map((item, index) => ({
    name: item.payer,
    value: item.amount,
    fill: chartColors[index % chartColors.length]
  }))

  // Gerar configuração dinâmica
  const chartConfig: Record<string, { label: string; color: string }> = data.reduce(
    (config, item, index) => {
      const key = item.payer.toLowerCase().replace(/\s+/g, '_')
      config[key] = {
        label: item.payer,
        color: chartColors[index % chartColors.length]
      }
      return config
    },
    { amount: { label: "Valor", color: "" } } as Record<string, { label: string; color: string }>
  )

  // Calcular total e percentuais
  const total = data.reduce((sum, item) => sum + item.amount, 0)
  const mainPayer = data.reduce(
    (max, item) => item.amount > max?.amount ? item : max,
    data[0]
  )
  const percentage = (((mainPayer?.amount || 0) / total) * 100).toFixed(1)

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader className='rounded-tl-lg rounded-tr-lg flex flex-row justify-between'>
        <div>
          <CardTitle className='text-foreground'>{title}</CardTitle>
          <p className='text-xs text-white/40'>{description}</p>
        </div>

        <CardTitle className='text-xs text-secondary capitalize'>{competence}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent
                hideLabel
                formatter={(value, name) => (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{name}:</span>
                    <span className="font-bold">{currency} {Number(value).toFixed(2)}</span>
                  </div>
                )}
              />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              label={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        {showTrend && (
          <div className="flex items-center gap-2 leading-none font-medium">
            {mainPayer?.payer} representa {percentage}% do total
            <TrendingUp className="h-4 w-4" />
          </div>
        )}
        <div className="text-muted-foreground leading-none">
          Total: {currency} {total.toFixed(2)}
        </div>
      </CardFooter>
    </Card>
  )
}
