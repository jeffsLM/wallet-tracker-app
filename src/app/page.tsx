"use client";

import { Card, CardDescription, CardTitle, CardHeader, CardFooter } from '@/components/ui/card';
import { BadgeDollarSign, ChartSpline, Gift } from 'lucide-react';
import { cn, formatCurrency, formatDateToBackend } from '@/lib/utils';
import { AreaChartDynamic } from '@/components/charts/AreaChart';
import PieChartDynamic from '@/components/charts/PieChart';
import { OverflowCreditCard } from '@/components/charts/OverflowCreditCard';
import { DateRangePicker } from '@/components/DateRangePicker';
import { FormProvider, useForm } from 'react-hook-form';
import { DateRange } from 'react-day-picker';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';


import { useExpansesOverviewPayerQuery, useExpansesOverviewQuery, useExpansesOverviewUsePeriodAndPayerQuery, useExpansesOverviewUsePeriodQuery, useOverflowToCreditQuery } from '@/services/hooks/reports';


interface FormValues {
  dateRange: DateRange;
}


export default function Home() {
  const methods = useForm<FormValues>({
    defaultValues: {
      dateRange: {
        from: dayjs().toDate(),
        to: dayjs().add(1, 'month').toDate(),
      }
    }
  });

  const FormValues = methods.watch();


  const { data: expansesOverview, isLoading } = useExpansesOverviewQuery({
    payload: { date: formatDateToBackend(FormValues.dateRange.from || new Date()) },
    options: {
      enabled: !!FormValues.dateRange.from
    }
  });
  const { data: overflowToCredit, isLoading: isLoadingOverflow } = useOverflowToCreditQuery({
    payload: { date: formatDateToBackend(FormValues.dateRange.from || new Date()) },
    options: {
      enabled: !!FormValues.dateRange.from
    }
  });
  const { data: expansesOverviewPayer, isLoading: isLoadingExpansesOverviewPayer } = useExpansesOverviewPayerQuery({
    payload: {
      date: formatDateToBackend(FormValues.dateRange.from || new Date()),
      accountType: ['CREDITO']
    },
    options: {
      enabled: !!FormValues.dateRange.from
    }
  });
  const { data: expansesOverviewUsePeriod, isLoading: isLoadingExpansesOverviewUsePeriod } = useExpansesOverviewUsePeriodQuery({
    payload: {
      startDate: formatDateToBackend(dayjs(FormValues.dateRange.from).add(-6, 'month').toDate() || new Date()),
      endDate: formatDateToBackend(FormValues.dateRange.from || new Date()),
      accountType: ['CREDITO']
    },
    options: {
      enabled: !!FormValues.dateRange.from
    }
  });
  const { data: expansesOverviewUsePeriodAndPayer, isLoading: isLoadingExpansesOverviewUsePeriodAndPayer } = useExpansesOverviewUsePeriodAndPayerQuery({
    payload: {
      startDate: formatDateToBackend(dayjs(FormValues.dateRange.from).add(-1, 'month').toDate() || new Date()),
      endDate: formatDateToBackend(dayjs(FormValues.dateRange.to).add(6, 'month').toDate() || new Date()),
      accountType: ['CREDITO']
    },
    options: {
      enabled: !!FormValues.dateRange.from
    }
  });

  const cards = [
    {
      title: 'Crédito',
      description: formatCurrency(expansesOverview?.totalCredit || 0), // expansesOverview?.totalCredit,
      balanceRemaining: '',
      icon: BadgeDollarSign,
      className: 'bg-destructive border border-destructive-border',
    },
    {
      title: 'Benefícios',
      description: formatCurrency(expansesOverview?.totalVoucher.totalVoucherUsed || 0), // expansesOverview?.totalVoucher.totalVoucherUsed.toFixed(2),
      balanceRemaining: formatCurrency(expansesOverview?.totalVoucher.totalVoucher || 0), // expansesOverview?.totalVoucher.totalVoucher.toFixed(2),
      icon: Gift,
      className: 'bg-success border border-success-border',
    },
    {
      title: 'Total de Gastos',
      description: formatCurrency(expansesOverview?.totalExpenses || 0), // expansesOverview?.totalExpenses.toFixed(2),
      balanceRemaining: '',
      icon: ChartSpline,
      className: 'bg-card border border-base-800',
    }
  ]

  return (
    <div className='w-full'>
      <section className='flex flex-col items-end my-12'>
        <FormProvider {...methods}>
          <DateRangePicker />
        </FormProvider>
      </section>

      <section className='grid grid-cols-3 gap-4'>
        {
          cards.map((card) => (
            <Card key={card.title} className={cn('gap-2', card.className)}>
              <CardHeader className='flex flex-row justify-between items-center'>
                <CardTitle>{card.title}</CardTitle>
                <div className='bg-gray-100/10 rounded-full p-3'>
                  <card.icon className='size-5' />
                </div>
              </CardHeader>
              <CardFooter className='flex flex-col items-start'>
                <CardDescription className='text-2xl font-medium text-foreground'>{card.description}</CardDescription>
                {card.balanceRemaining && <CardDescription className='text-sm text-muted-foreground'>Saldo disp. {card.balanceRemaining}</CardDescription>}
              </CardFooter>
            </Card>
          ))
        }
      </section>

      <h1 className='text-lg font-medium text-foreground mt-16'>Métricas</h1>

      <section className='mt-4 grid grid-cols-3 gap-2'>
        <OverflowCreditCard data={overflowToCredit} isLoading={isLoadingOverflow} />

        <PieChartDynamic
          data={expansesOverviewPayer || []}
          isLoading={isLoadingExpansesOverviewPayer}
          title='Demonstrativo'
          description='Por fonte pagadora'
          competence={dayjs(FormValues.dateRange.from).locale('pt-BR').format('MMMM/YYYY')}
          className='col-span-1'
        />
        <AreaChartDynamic
          data={expansesOverviewUsePeriodAndPayer || []}
          isLoading={isLoadingExpansesOverviewUsePeriodAndPayer}
          title='Demonstrativos de gastos por Fonte'
          description='Próximos 6 Meses'
          className='col-span-2'
        />
        <AreaChartDynamic
          data={expansesOverviewUsePeriod || []}
          isLoading={isLoadingExpansesOverviewUsePeriod}
          title='Demonstrativo dos Gastos'
          description='Últimos 6 meses (Apenas Crédito)'
          className='col-span-3'
        />
      </section>
    </div>
  );
}
