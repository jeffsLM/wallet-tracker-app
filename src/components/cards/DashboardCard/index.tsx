import { LucideIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  balanceRemaining?: string;
  className?: string;
  isLoading?: boolean;
}

export function DashboardCard({
  title,
  description,
  icon: Icon,
  balanceRemaining,
  className,
  isLoading = false
}: DashboardCardProps) {
  if (isLoading) {
    return (
      <Card className={cn('gap-2')}>
        <CardHeader className='flex flex-row justify-between items-center'>
          <Skeleton className='h-6 w-32 bg-gray-700' />
          <Skeleton className='h-11 w-11 rounded-full bg-gray-700' />
        </CardHeader>
        <CardFooter className='flex flex-col items-start gap-2'>
          <Skeleton className='h-8 w-24 bg-gray-700' />
          {balanceRemaining !== undefined && <Skeleton className='h-4 w-40' />}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className={cn('gap-2', className)}>
      <CardHeader className='flex flex-row justify-between items-center'>
        <CardTitle>{title}</CardTitle>
        <div className='bg-gray-100/10 rounded-full p-3'>
          <Icon className='size-5' />
        </div>
      </CardHeader>
      <CardFooter className='flex flex-col items-start'>
        <CardDescription className='text-2xl font-medium text-foreground'>
          {description}
        </CardDescription>
        {balanceRemaining && (
          <CardDescription className='text-sm text-muted-foreground'>
            Saldo disp. {balanceRemaining}
          </CardDescription>
        )}
      </CardFooter>
    </Card>
  );
}
