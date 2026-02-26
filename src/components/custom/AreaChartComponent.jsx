"use client"

import React, { useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const description = "An interactive area chart"

export function AreaChartComponent({
  data,
  config,
  title = "Area Chart - Interactive",
  description = "Showing total visitors for the selected period",
  height = 250,
  defaultTimeRange = "90d",
  showTimeRangeSelector = true
}) {
  const [timeRange, setTimeRange] = useState(defaultTimeRange)

  // Get data keys excluding 'date'
  const dataKeys = Object.keys(data[0] || {}).filter(key => key !== 'date')
  
  // Filter data based on selected time range
  const filteredData = data.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date(data[data.length - 1]?.date || new Date())
    let daysToSubtract = 90
    if (timeRange === "30d") daysToSubtract = 30
    else if (timeRange === "7d") daysToSubtract = 7

    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  // Generate gradient definitions dynamically based on config
  const gradientDefinitions = dataKeys.map(key => {
    const color = config[key]?.color || '#000000' // Fallback color
    return (
      <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="5%" stopColor={color} stopOpacity={0.8} />
        <stop offset="95%" stopColor={color} stopOpacity={0.1} />
      </linearGradient>
    )
  })

  // Generate area components dynamically
  const areaComponents = dataKeys.map(key => {
    const color = config[key]?.color || '#000000' // Fallback color
    return (
      <Area
        key={key}
        dataKey={key}
        type="natural"
        fill={`url(#fill${key})`}
        stroke={color}
        stackId="a"
      />
    )
  })

  return (
    <Card className="pt-0">
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          <CardTitle className={`text-[24px]`}>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {showTimeRangeSelector && (
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        )}
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer 
          config={config} 
          className="aspect-auto w-full"
          style={{ height: `${height}px` }}
        >
          <AreaChart data={filteredData}>
            <defs>
              {gradientDefinitions}
            </defs>

            <CartesianGrid vertical={false} />

            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />

            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) =>
                    new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                  indicator="dot"
                />
              }
            />

            {areaComponents}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}