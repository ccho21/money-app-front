'use client'

import { useState } from "react"
import { addDays, format, startOfMonth, endOfMonth, subDays, subMonths } from "date-fns"
import { DateRange } from "react-day-picker"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../dialog"

export function DateRangeDialog({
  value,
  onApply,
}: {
  value: { startDate: string; endDate: string },
  onApply: (range: { startDate: string; endDate: string }) => void
}) {
  const [open, setOpen] = useState(false)
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(value.startDate),
    to: new Date(value.endDate),
  })

  const applyPreset = (preset: string) => {
    const today = new Date()
    let from, to

    switch (preset) {
      case 'today':
        from = today
        to = today
        break
      case 'last7':
        from = subDays(today, 6)
        to = today
        break
      case 'thisMonth':
        from = startOfMonth(today)
        to = endOfMonth(today)
        break
      case 'lastMonth':
        const lastMonth = subMonths(today, 1)
        from = startOfMonth(lastMonth)
        to = endOfMonth(lastMonth)
        break
      default:
        return
    }

    setRange({ from, to })
  }

  const formatDisplay = () => {
    if (!range?.from || !range?.to) return 'Select range'
    return `${format(range.from, "LLL d")} ~ ${format(range.to, "LLL d")}`
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-between">
          <span>{formatDisplay()}</span>
          <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Select Date Range</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Select onValueChange={applyPreset}>
            <SelectTrigger>
              <SelectValue placeholder="Quick select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last7">Last 7 Days</SelectItem>
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
            </SelectContent>
          </Select>

          <Calendar
            mode="range"
            selected={range}
            onSelect={setRange}
            numberOfMonths={2}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={() => {
              if (range?.from && range?.to) {
                onApply({
                  startDate: format(range.from, 'yyyy-MM-dd'),
                  endDate: format(range.to, 'yyyy-MM-dd'),
                })
                setOpen(false)
              }
            }}
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
