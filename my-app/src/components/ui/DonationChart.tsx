'use client'

import React, { useEffect, useState } from 'react'
import { Sankey, Tooltip, ResponsiveContainer, Layer, Rectangle } from 'recharts'
import Papa from 'papaparse'

type DonationRow = {
  date: string
  area: string
  amount: string
  nationality: string
  occupation: string
}

type SankeyNode = {
  name: string
}

type SankeyLink = {
  source: number
  target: number
  value: number
}

type SankeyData = {
  nodes: SankeyNode[]
  links: SankeyLink[]
}

type DonationNodeProps = {
  x: number
  y: number
  width: number
  height: number
  index: number
  payload: {
    name: string
    value: number
  }
}

// ws-primary (#289ffb) をベースにした近似色の配列
const COLOR_PALETTE = {
  source: ['#289ffb', '#2c5da8', '#4a86e8', '#1e88e5', '#1976d2'],
  target: ['#5b7fa3', '#7da7f0', '#64b5f6', '#4fc3f7', '#29b6f6'],
}

export default function DonationChart() {
  const [data, setData] = useState<SankeyData>({ nodes: [], links: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [grandTotal, setGrandTotal] = useState<number>(0)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/donations.csv')
        if (!response.ok) throw new Error('Failed to fetch CSV data')
        const csvText = await response.text()

        Papa.parse<DonationRow>(csvText, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => processData(results.data),
          error: (err: Error) => {
            setError(err.message)
            setLoading(false)
          },
        })
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred')
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const processData = (rows: DonationRow[]) => {
    const areas = new Map<string, number>()
    const occupations = new Map<string, number>()
    let totalAmount = 0

    const areaToOcc: Record<string, Record<string, number>> = {}

    rows.forEach((row) => {
      if (!row.occupation || !row.area || !row.amount) return
      const amount = parseInt(row.amount, 10)
      if (isNaN(amount) || amount <= 0) return

      // ★修正点: データに空白が含まれている可能性を考慮して trim() を追加
      const area = row.area.trim()
      const occ = row.occupation.trim()

      totalAmount += amount

      areas.set(area, (areas.get(area) || 0) + amount)
      occupations.set(occ, (occupations.get(occ) || 0) + amount)

      if (!areaToOcc[area]) areaToOcc[area] = {}
      areaToOcc[area][occ] = (areaToOcc[area][occ] || 0) + amount
    })

    setGrandTotal(totalAmount)

    // ソートロジック（ここは元のままで正しく動作します）
    const sortByValueWithOtherLast = (map: Map<string, number>) => {
      return Array.from(map.keys()).sort((a, b) => {
        if (a === 'その他') return 1
        if (b === 'その他') return -1
        return (map.get(b) || 0) - (map.get(a) || 0)
      })
    }

    const areaArray = sortByValueWithOtherLast(areas)
    const occArray = sortByValueWithOtherLast(occupations)

    const nodes: SankeyNode[] = [
      ...areaArray.map((name) => ({ name })),
      ...occArray.map((name) => ({ name })),
    ]

    const getAreaIndex = (name: string) => areaArray.indexOf(name)
    const getOccIndex = (name: string) => areaArray.length + occArray.indexOf(name)

    const links: SankeyLink[] = []

    Object.entries(areaToOcc).forEach(([area, occMap]) => {
      Object.entries(occMap).forEach(([occ, value]) => {
        links.push({
          source: getAreaIndex(area),
          target: getOccIndex(occ),
          value,
        })
      })
    })

    setData({ nodes, links })
    setLoading(false)
  }

  const getColumnType = (x: number, width: number): 'source' | 'target' => {
    if (width === 0) return 'source'
    const relativeX = x / width
    return relativeX < 0.5 ? 'source' : 'target'
  }

  const getColor = (index: number, column: 'source' | 'target') => {
    const palette = COLOR_PALETTE[column]
    return palette[index % palette.length]
  }

  const renderNode = ({ x, y, width, height, index, payload }: DonationNodeProps) => {
    if (isNaN(x) || isNaN(y) || isNaN(width) || isNaN(height)) return null
    if (payload.value === 0) return null

    const column = getColumnType(x, containerWidth)
    const fill = getColor(index, column)
    const percentageVal = grandTotal > 0 && payload.value ? (payload.value / grandTotal) * 100 : 0

    const isNodeTooSmall = height < 10
    const isPercentageTiny = percentageVal < 1.0
    const hideLabel = isPercentageTiny || isNodeTooSmall

    const textAnchor = 'start'
    const textX = x + width + 6
    const textY = y + height / 2
    const dyName = 4

    return (
      <Layer key={`node-${index}`}>
        <defs>
          <filter id={`shadow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="1" stdDeviation="1" floodColor="#000000" floodOpacity="0.1" />
          </filter>
        </defs>

        <Rectangle
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          fillOpacity={0.9}
          radius={[3, 3, 3, 3]}
          filter={`url(#shadow-${index})`}
          stroke="#fff"
          strokeWidth={1}
        />

        {!hideLabel && (
          <Layer>
            <text
              x={textX}
              y={textY}
              textAnchor={textAnchor}
              fill="#000000"
              fontWeight={600}
              fontSize={11}
              dy={dyName}
              style={{
                pointerEvents: 'none',
                textShadow: '0 0 3px rgba(255, 255, 255, 0.9), 0 0 2px rgba(255, 255, 255, 1)',
              }}
            >
              {payload.name.substring(0, 10)}
              {payload.name.length > 10 ? '..' : ''}
            </text>
          </Layer>
        )}
      </Layer>
    )
  }

  if (loading) {
    return (
      <div className="flex h-64 w-full items-center justify-center bg-gray-50 rounded-lg border border-gray-100">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-64 w-full items-center justify-center bg-red-50 text-red-500 rounded-lg border border-red-100 text-xs">
        読み込みに失敗しました: {error}
      </div>
    )
  }

  if (data.nodes.length === 0) {
    return (
      <div className="text-center p-10 text-gray-500 text-xs">集計可能なデータがありません</div>
    )
  }

  return (
    <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-ws-primary p-4 text-white">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold tracking-tight flex items-center gap-2">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            政治資金レポート
          </h3>
          <div className="text-right">
            <p className="text-sm font-bold leading-none">
              ¥{(grandTotal / 10000).toLocaleString()}万
            </p>
          </div>
        </div>
      </div>

      <div
        className="w-full bg-gray-50/50 relative"
        ref={(el) => {
          if (el) setContainerWidth(el.getBoundingClientRect().width)
        }}
      >
        <div className="w-full aspect-[4/5] min-h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={data}
              node={renderNode}
              nodePadding={5}
              nodeWidth={50}
              // ★修正点: ここを追加。0にすることでRechartsの自動並び替えを無効化し、データ順を強制します
              iterations={0}
              margin={{
                left: 50,
                right: 80,
                top: 10,
                bottom: 10,
              }}
              link={{ stroke: '#cbd5e1', strokeOpacity: 0.35 }}
            >
              <Tooltip
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  padding: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  fontSize: '11px',
                }}
                itemStyle={{ color: '#1f2937', fontWeight: 600 }}
                formatter={(value: any, name: any, props: any) => {
                  if (props && props.payload && props.payload.source && props.payload.target) {
                    return [
                      `¥${Number(value).toLocaleString()}`,
                      <div
                        key="label"
                        className="mt-1 pb-1 border-b border-gray-100 mb-1 text-gray-500 font-normal"
                      >
                        {props.payload.source.name} <span className="text-gray-300">→</span>{' '}
                        {props.payload.target.name}
                      </div>,
                    ]
                  }
                  return [`¥${Number(value).toLocaleString()}`, name]
                }}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>
        <div className="absolute bottom-1 right-2 text-[9px] text-gray-400 pointer-events-none">
          タップで詳細
        </div>
      </div>
    </div>
  )
}
