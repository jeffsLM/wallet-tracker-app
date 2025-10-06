"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from '@/lib/utils'

// Tipos
interface PaymentData {
  month: string
  [key: string]: any
}

interface DynamicPayersChartProps {
  data?: PaymentData[];
  title: string
  description: string
  className?: string
  isLoading?: boolean
}

// Componente Skeleton
function ChartSkeleton() {
  // Alturas fixas para evitar hydration error
  const barHeights = [65, 45, 70, 55, 80, 50, 75, 60]

  return (
    <div className="space-y-3">
      {/* Legend skeleton */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-muted animate-pulse" />
            <div className="h-4 w-16 bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>

      {/* Chart area skeleton */}
      <div className="h-[300px] w-full flex items-end justify-between gap-2 px-4">
        {barHeights.map((height, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-muted rounded-t animate-pulse"
              style={{
                height: `${height}%`,
                animationDelay: `${i * 100}ms`
              }}
            />
            <div className="h-3 w-full bg-muted rounded animate-pulse" />
          </div>
        ))}
      </div>

    </div>
  )
}

// Cores padrão consistentes para SSR
const DEFAULT_COLORS = [
  'hsl(220, 70%, 50%)',
  'hsl(160, 60%, 45%)',
  'hsl(30, 80%, 55%)',
  'hsl(280, 65%, 60%)',
  'hsl(340, 75%, 55%)',
]

// Função para obter cores do tema CSS (apenas client-side)
const getChartColors = (): string[] => {
  if (typeof window === 'undefined') return DEFAULT_COLORS

  const root = getComputedStyle(document.documentElement)
  const baseColors = [
    root.getPropertyValue('--chart-1').trim(),
    root.getPropertyValue('--chart-2').trim(),
    root.getPropertyValue('--chart-3').trim(),
    root.getPropertyValue('--chart-4').trim(),
    root.getPropertyValue('--chart-5').trim(),
  ].filter(color => color !== '')

  return baseColors.length > 0 ? baseColors : DEFAULT_COLORS
}

// Função para gerar cores adicionais se necessário
const generateAdditionalColors = (baseColors: string[], count: number): string[] => {
  const colors = [...baseColors]

  while (colors.length < count) {
    const baseIndex = colors.length % baseColors.length
    const variation = Math.floor(colors.length / baseColors.length)

    // Adiciona variação de luminosidade
    const baseColor = baseColors[baseIndex]
    const lightnessAdjust = variation * 10

    // Tenta modificar a cor base
    if (baseColor.includes('oklch')) {
      const modified = baseColor.replace(/oklch\(([\d.]+)/, (match, l) => {
        const newL = Math.min(0.9, Math.max(0.3, parseFloat(l) + lightnessAdjust * 0.05))
        return `oklch(${newL}`
      })
      colors.push(modified)
    } else {
      colors.push(baseColor)
    }
  }

  return colors.slice(0, count)
}

export function AreaChartDynamic({
  data,
  title,
  description,
  className,
  isLoading = false
}: DynamicPayersChartProps) {
  // Extrai os nomes dos pagadores dinamicamente
  const payers = React.useMemo(() => {
    if (!data || data.length === 0) return []
    return Object.keys(data[0]).filter(key => key !== 'month')
  }, [data])

  // Inicializa com cores padrão consistentes
  const [chartColors, setChartColors] = React.useState<string[]>(() =>
    generateAdditionalColors(DEFAULT_COLORS, payers.length)
  )

  // Carrega as cores do tema apenas no cliente
  React.useEffect(() => {
    const baseColors = getChartColors()
    const colors = generateAdditionalColors(baseColors, payers.length)
    setChartColors(colors)
  }, [payers.length])

  // Cria a configuração do chart dinamicamente
  const chartConfig = React.useMemo<ChartConfig>(() => {
    const config: ChartConfig = {}
    payers.forEach((payer, index) => {
      config[payer] = {
        label: payer,
        color: chartColors[index] || `hsl(${(index * 137.5) % 360}, 70%, 50%)`,
      }
    })
    return config
  }, [payers, chartColors])

  // Formata o valor em moeda
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  // Formata o mês
  const formatMonth = (monthStr: string): string => {
    const [year, month] = monthStr.split('-')
    const date = new Date(parseInt(year), parseInt(month) - 1)
    return date.toLocaleDateString('pt-BR', {
      month: 'short',
      year: 'numeric'
    })
  }

  return (
    <Card className={cn("pt-0 col-span-2", className)}>
      <CardHeader className="border-b pt-5 pb-3">
        <div className="grid gap-1">
          <CardTitle>
            {isLoading ? (
              <div className="h-6 w-48 bg-muted rounded animate-pulse" />
            ) : (
              title
            )}
          </CardTitle>
          <CardDescription>
            {isLoading ? (
              <div className="h-4 w-64 bg-muted rounded animate-pulse" />
            ) : (
              description
            )}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {isLoading ? (
          <ChartSkeleton />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart data={data}>
              <defs>
                {payers.map((payer, index) => (
                  <linearGradient key={payer} id={`fill${payer.replace(/\s+/g, '')}`} x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartColors[index]}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartColors[index]}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={formatMonth}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`}
              />
              <ChartTooltip
                cursor={{ strokeDasharray: '3 3' }}
                content={
                  <ChartTooltipContent
                    labelFormatter={formatMonth}
                    className='bg-base-900'
                    formatter={(value, name) => (
                      <div className="flex items-center justify-between gap-4 min-w-[180px]">
                        <span className="font-mono">{name}:</span>
                        <span className="font-bold">{formatCurrency(Number(value))}</span>
                      </div>
                    )}
                    indicator="dot"
                  />
                }
              />
              {payers.map((payer, index) => (
                <Area
                  key={payer}
                  dataKey={payer}
                  type="monotone"
                  fill={`url(#fill${payer.replace(/\s+/g, '')})`}
                  stroke={chartColors[index]}
                  strokeWidth={2}
                />
              ))}
              <ChartLegend
                content={<ChartLegendContent payload={payers} />}
                verticalAlign="top"
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
