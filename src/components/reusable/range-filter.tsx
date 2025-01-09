import { useState } from 'react';
import { Column } from '@tanstack/react-table';
import { RiFilterLine } from 'react-icons/ri';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/components/ui/use-toast';
import { formatCurrency, parseCurrency } from '@/lib/utils';

interface RangeFilter<TData, TValue> {
  column: Column<TData, TValue>;
  range: { min: number | null; max: number | null };
  title: string;
  variant: string;
}

export function RangeFilter<TData, TValue>({
  column,
  range,
  title,
  variant,
}: RangeFilter<TData, TValue>) {
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const { toast } = useToast();

  const applyFilter = () => {
    if (!minValue || !maxValue) {
      toast({
        title: 'Error',
        description: 'Min and Max values are required',
        variant: 'destructive',
      });
      return;
    }
    if (variant === 'currency') {
      const formattedMaxValue = parseCurrency(maxValue);
      const formattedMinValue = parseCurrency(minValue);
      column.setFilterValue([formattedMinValue, formattedMaxValue]);
    } else if (variant === 'date') {
      column.setFilterValue({
        min: parseInt(minValue, 10),
        max: parseInt(maxValue, 10),
      });
    }
  };

  const clearFilter = () => {
    setMinValue('');
    setMaxValue('');
    column.setFilterValue('');
  };

  // Function to handle Enter key press
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      applyFilter();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <RiFilterLine className="w-4 h-4 mr-2" />
          {title}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-4" align="start">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Min</label>
            <Input
              type="text"
              value={minValue}
              onChange={(e) => setMinValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                variant === 'currency' ? formatCurrency(range.min) : range.min?.toString()
              }
              className="w-full border shadow rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Max</label>
            <Input
              type="text"
              value={maxValue}
              onChange={(e) => setMaxValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                variant === 'currency' ? formatCurrency(range.max) : range.max?.toString()
              }
              className="w-full border shadow rounded"
            />
          </div>
          <div className="flex justify-between">
            <Button variant="default" onClick={applyFilter}>
              Apply
            </Button>
            <Button variant="outline" onClick={clearFilter}>
              Clear
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
