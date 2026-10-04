import { memo } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { BOOKING_STATUSES } from '@/types/admin'

type StatusPickerProps = {
  value: string
  onChange: (value: string) => void
}

export const StatusPicker = memo(function StatusPicker({
  value,
  onChange,
}: StatusPickerProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="h-8 w-full md:w-[130px] rounded-xl text-[11px] font-semibold border border-outline/70 bg-background">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {BOOKING_STATUSES.map((s) => (
          <SelectItem key={s.value} value={s.value} className="text-xs">
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
})
