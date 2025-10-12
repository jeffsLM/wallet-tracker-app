import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

interface Group {
  name: string;
  totalIncome: number;
  totalExpenses: number;
}

interface OverflowCreditData {
  allGroups: Group[];
  allGroupsExpenses: number;
  allGroupsIncome: number;
  amountRemaining: number;
}

interface OverflowCreditCardProps {
  data: OverflowCreditData | undefined;
  isLoading?: boolean;
}

export const OverflowCreditCard: React.FC<OverflowCreditCardProps> = ({
  data,
  isLoading = false
}) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <Card className='pt-0 col-span-3'>
      <CardHeader className='bg-base-800 py-7 rounded-tl-lg rounded-tr-lg'>
        <CardTitle className='text-foreground'>Transbordamento para Crédito</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex flex-row justify-between gap-16 py-4'>
            <ul className='w-full grid gap-6'>
              {[1, 2, 3].map((i) => (
                <li key={i}>
                  <div className='flex flex-row justify-between mb-2'>
                    <Skeleton className='h-4 w-24 bg-gray-700' />
                    <Skeleton className='h-4 w-16 bg-gray-700' />
                  </div>
                  <Skeleton className='h-2 w-full bg-gray-700' />
                  <Skeleton className='h-3 w-20 mt-1 bg-gray-700' />
                </li>
              ))}
            </ul>

            <div>
              <Separator orientation="vertical" className='h-full mx-12' />
            </div>

            <div className='w-full grid gap-3'>
              <ul className='grid gap-4'>
                <li className='flex flex-row justify-between'>
                  <Skeleton className='h-4 w-40 bg-gray-700' />
                  <Skeleton className='h-4 w-24 bg-gray-700' />
                </li>
                <li className='flex flex-row justify-between'>
                  <Skeleton className='h-4 w-40 bg-gray-700' />
                  <Skeleton className='h-4 w-24 bg-gray-700' />
                </li>
              </ul>
              <Separator orientation="horizontal" />
              <div>
                <Skeleton className='h-5 w-48 bg-gray-700' />
                <Skeleton className='h-8 w-32 mt-2 ml-auto bg-gray-700' />
              </div>
              <Skeleton className='h-10 w-full mt-2 bg-gray-700' />
            </div>
          </div>
        ) : (
          <div className='flex flex-row justify-between gap-16 py-4'>
            <ul className='w-full grid gap-6'>
              {data?.allGroups?.map((group) => {
                const amountRemaining = group.totalIncome - group.totalExpenses;
                const percentage = (group.totalExpenses / group.totalIncome * 100);
                const showPercentage = percentage >= 100;

                return (
                  <li key={group.name}>
                    <div className='flex flex-row justify-between'>
                      <p className='text-xs font-semibold'>{group.name}</p>
                      <p className='text-xs text-white/40'>
                        {showPercentage ? 'Esgotado' : percentage.toFixed(0) + '%' + ' usado'}
                      </p>
                    </div>
                    <Progress value={showPercentage ? 100 : percentage} className='mt-1' />
                    <p className='text-white/40 text-xs mt-1'>
                      {!showPercentage && formatCurrency(amountRemaining) + ' disponível'}
                    </p>
                  </li>
                );
              })}
            </ul>

            <div>
              <Separator orientation="vertical" className='h-full mx-12' />
            </div>

            <div className='w-full grid gap-3'>
              <ul className='grid gap-4'>
                <li className='flex flex-row justify-between'>
                  <p className='text-xs font-extralight'>Benefícios utilizados:</p>
                  <b className='text-sm'>{formatCurrency(data?.allGroupsExpenses || 0)}</b>
                </li>
                <li className='flex flex-row justify-between'>
                  <p className='text-xs font-extralight'>Benefícios depositados:</p>
                  <b className='text-sm'>{formatCurrency((data?.allGroupsIncome || 0) * -1)}</b>
                </li>
              </ul>
              <Separator orientation="horizontal" />
              <div>
                <p className='text-start'>Valor adicionado a divisão:</p>
                <p className='text-end text-3xl mt-2'>{formatCurrency(data?.amountRemaining || 0)}</p>
              </div>

              <p className='text-xs font-extralight mt-2 text-white/40'>
                O total considera apenas gastos que poderiam ter usado o beneficio ao invés do crédito
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
