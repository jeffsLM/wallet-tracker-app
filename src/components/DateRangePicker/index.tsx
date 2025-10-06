import React, { useState } from 'react';
import { useForm, FormProvider, useFormContext, Controller, FieldValues } from 'react-hook-form';
import { Calendar, ChevronRight } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { Badge } from '../ui/badge';

// Tipos
interface DateRange {
  from: Date;
  to: Date;
}

interface PresetRange {
  label: string;
  value: string;
}

interface PresetsListProps {
  onPresetClick: (value: string) => void;
  selectedPreset: string;
}

interface DateInputsProps {
  dateRange: DateRange | null | undefined;
  formatDate: (date: Date) => string;
}

interface DateRangePickerProps {
  name?: string;
  defaultValue?: DateRange;
  placeholder?: string;
}

type PresetFunction = (today: Date) => DateRange;

interface PresetFunctions {
  [key: string]: PresetFunction;
}

interface FormValues extends FieldValues {
  dateRange: DateRange;
}

// Componente de Presets
const PresetsList: React.FC<PresetsListProps> = ({ onPresetClick, selectedPreset }) => {
  const presetRanges: PresetRange[] = [
    { label: 'Personalizado', value: 'custom' },
    { label: 'Hoje', value: 'today' },
    { label: 'Ontem', value: 'yesterday' },
    { label: 'Esta semana (Dom - Hoje)', value: 'thisWeek' },
    { label: 'Semana passada (Dom - Sáb)', value: 'lastWeek' },
    { label: 'Últimos 7 dias', value: 'last7' },
    { label: 'Últimos 28 dias', value: 'last28' },
    { label: 'Últimos 30 dias', value: 'last30' },
    { label: 'Últimos 90 dias', value: 'last90' },
    { label: 'Últimos 12 meses', value: 'last12months' },
  ];

  return (
    <div className="border-r rounded-l-md bg-card p-2 w-56 gap-1 grid">
      <div className="text-xs font-medium text-gray-500 px-3 py-2 mb-1">
        PERÍODO
      </div>
      {presetRanges.map((preset) => (
        <button
          key={preset.value}
          type="button"
          onClick={() => preset.value !== 'custom' && onPresetClick(preset.value)}
          className={cn(
            "w-full text-left px-3 py-2 text-sm rounded-md transition-colors",
            "hover:bg-secondary/80 text-gray-300 ",
            selectedPreset === preset.value && "bg-purple-50 text-secondary hover:bg-purple-100 font-semibold"
          )}
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
};

// Componente de Inputs de Data
const DateInputs: React.FC<DateInputsProps> = ({ dateRange, formatDate }) => {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Data de início</label>
        <input
          type="text"
          value={dateRange?.from ? formatDate(dateRange.from) : ''}
          readOnly
          placeholder="Selecione"
          className="px-3 py-1.5 text-sm border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
      <span className="self-end mb-1.5 text-gray-400">–</span>
      <div className="flex flex-col">
        <label className="text-xs text-gray-500 mb-1">Data de termo</label>
        <input
          type="text"
          value={dateRange?.to ? formatDate(dateRange.to) : ''}
          readOnly
          placeholder="Selecione"
          className="px-3 py-1.5 text-sm border rounded-md w-40 focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>
    </div>
  );
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  name = 'dateRange',
  defaultValue,
  placeholder = 'Selecione o período'
}) => {
  const { control } = useFormContext<FormValues>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedPreset, setSelectedPreset] = useState<string>('last28');

  const monthNames: string[] = [
    'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
    'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
  ];

  const presetLabels: { [key: string]: string } = {
    custom: 'Personalizado',
    today: 'Hoje',
    yesterday: 'Ontem',
    thisWeek: 'Esta semana',
    lastWeek: 'Semana passada',
    last7: 'Últimos 7 dias',
    last28: 'Últimos 28 dias',
    last30: 'Últimos 30 dias',
    last90: 'Últimos 90 dias',
    last12months: 'Últimos 12 meses'
  };

  const presetFunctions: PresetFunctions = {
    today: (today: Date): DateRange => ({ from: today, to: today }),

    yesterday: (today: Date): DateRange => {
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      return { from: yesterday, to: yesterday };
    },

    thisWeek: (today: Date): DateRange => {
      const thisWeekStart = new Date(today);
      thisWeekStart.setDate(today.getDate() - today.getDay());
      return { from: thisWeekStart, to: today };
    },

    lastWeek: (today: Date): DateRange => {
      const lastWeekEnd = new Date(today);
      lastWeekEnd.setDate(today.getDate() - today.getDay() - 1);
      const lastWeekStart = new Date(lastWeekEnd);
      lastWeekStart.setDate(lastWeekEnd.getDate() - 6);
      return { from: lastWeekStart, to: lastWeekEnd };
    },

    last7: (today: Date): DateRange => {
      const last7 = new Date(today);
      last7.setDate(last7.getDate() - 6);
      return { from: last7, to: today };
    },

    last28: (today: Date): DateRange => {
      const last28 = new Date(today);
      last28.setDate(last28.getDate() - 27);
      return { from: last28, to: today };
    },

    last30: (today: Date): DateRange => {
      const last30 = new Date(today);
      last30.setDate(last30.getDate() - 29);
      return { from: last30, to: today };
    },

    last90: (today: Date): DateRange => {
      const last90 = new Date(today);
      last90.setDate(last90.getDate() - 89);
      return { from: last90, to: today };
    },

    last12months: (today: Date): DateRange => {
      const last12 = new Date(today);
      last12.setMonth(last12.getMonth() - 12);
      return { from: last12, to: today };
    }
  };

  const handlePresetClick = (value: string): void => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const presetFunction = presetFunctions[value];
    if (presetFunction) {
      const newRange = presetFunction(today);
      setTempDateRange(newRange);
      setSelectedPreset(value);
    }
  };

  const formatDate = (date: Date): string => {
    if (!date) return '';
    return `${date.getDate()} de ${monthNames[date.getMonth()].substring(0, 3)}. de ${date.getFullYear()}`;
  };

  const formatDateRange = (dateRange: DateRange | null | undefined): string => {
    if (!dateRange?.from) return placeholder;
    if (!dateRange?.to) return formatDate(dateRange.from);
    return `${formatDate(dateRange.from)} - ${formatDate(dateRange.to)}`;
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => {
        const handleApply = (): void => {
          if (tempDateRange?.from && tempDateRange?.to) {
            field.onChange(tempDateRange);
          }
          setIsOpen(false);
        };

        const handleCancel = (): void => {
          setTempDateRange(field.value);
          setIsOpen(false);
        };

        const handleOpenChange = (open: boolean): void => {
          if (open) {
            setTempDateRange(field.value);
          }
          setIsOpen(open);
        };

        return (
          <div className="flex items-center gap-4">
            <div className="text-sm font-medium text-gray-700">
              <Badge variant='secondary' className='min-h-8'>

                {presetLabels[selectedPreset] || 'Período'}
              </Badge>
            </div>
            <Popover open={isOpen} onOpenChange={handleOpenChange}>
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="justify-between text-left font-normal w-[340px]"
                >
                  <div className="flex items-center">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span className="text-sm truncate">{formatDateRange(field.value)}</span>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-base-900" align="start">
                <div className="flex">
                  <PresetsList
                    onPresetClick={handlePresetClick}
                    selectedPreset={selectedPreset}
                  />
                  <div className="p-4">
                    <DateInputs
                      dateRange={tempDateRange}
                      formatDate={formatDate}
                    />
                    <CalendarComponent
                      mode="range"
                      selected={tempDateRange}
                      onSelect={(range) => {
                        if (range) {
                          setTempDateRange(range as DateRange);
                          setSelectedPreset('custom');
                        }
                      }}
                      numberOfMonths={2}
                      showOutsideDays={false}
                      className="rounded-md"
                    />
                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        onClick={handleApply}
                        disabled={!tempDateRange?.from || !tempDateRange?.to}
                      >
                        Aplicar
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div >
        );
      }}
    />
  );
};
