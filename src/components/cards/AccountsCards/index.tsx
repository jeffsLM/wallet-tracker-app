import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import { formatCurrency } from '@/lib/utils';
import { GetAccountsResponse } from '@/types/requests/accounts/getAccounts';

export const CardSkeleton = () => (
  <Card className='py-0 border-none h-auto'>
    <CardHeader className='bg-base-800 rounded-t-lg py-6 px-6 flex flex-row justify-between items-start'>
      <div className='flex-1 min-w-0'>
        <Skeleton className='h-5 w-32 mb-2 bg-base-700' />
        <Skeleton className='h-4 w-24 bg-base-700' />
      </div>
      <Skeleton className='h-6 w-16 bg-base-700' />
    </CardHeader>
    <CardContent className='px-6 py-8 flex flex-col items-start gap-4'>
      <div>
        <Skeleton className='h-4 w-20 mb-2 bg-zinc-700' />
        <Skeleton className='h-9 w-40 bg-zinc-700' />
      </div>
      <div className='space-y-2 w-full'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-4 w-16 bg-zinc-700' />
          <Skeleton className='h-4 w-24 bg-zinc-700' />
        </div>
        <Skeleton className='h-2 w-full bg-zinc-700' />
        <Skeleton className='h-3 w-24 bg-zinc-700' />
      </div>
    </CardContent>
  </Card>
);

interface AccountCardHeaderProps {
  name: string;
  last4Digits: string;
  type: string;
}

export const AccountCardHeader = ({ name, last4Digits, type }: AccountCardHeaderProps) => (
  <CardHeader className='bg-base-800 rounded-t-lg py-6 px-6 flex flex-row justify-between items-start'>
    <div className='flex-1 min-w-0'>
      <CardTitle className='text-base font-medium text-white mb-1'>
        {name}
      </CardTitle>
      <span className='text-zinc-400 text-sm'>
        Final {last4Digits}
      </span>
    </div>
    <div className='flex items-start gap-3 flex-shrink-0'>
      <Badge variant='secondary' className='bg-base-700 text-white capitalize px-3 py-1 border-none'>
        {type?.toLowerCase()}
      </Badge>
    </div>
  </CardHeader>
);

interface GroupAccountCardProps {
  account: GetAccountsResponse[number];
}


export const GroupAccountCard = ({ account }: GroupAccountCardProps) => {
  const saldoAtual = account?.totalUsed;
  const saldoTotal = account?.totalUsedGroup;
  const percentualUsado = saldoTotal > 0 ? ((saldoAtual / saldoTotal) * 100).toFixed(1) : 0;

  return (
    <Card className='py-0 border-none h-auto'>
      <AccountCardHeader
        name={account?.name}
        last4Digits={account?.last4Digits}
        type={account?.type}
      />
      <CardContent className='px-6 pb-8 flex flex-col items-start gap-4'>
        <div>
          <p className='text-zinc-400 text-sm mb-2'>Saldo atual</p>
          <p className='text-3xl font-semibold text-white'>
            {formatCurrency(saldoAtual)}
          </p>
        </div>

        <div className='space-y-2 w-full'>
          <div className='flex justify-between items-center'>
            <p className='text-zinc-400 text-sm'>Saldo</p>
            <p className='text-white font-medium text-sm'>
              {formatCurrency(saldoTotal)}
            </p>
          </div>

          <div className='relative'>
            <Progress
              value={Number(percentualUsado)}
              className='h-2 bg-base-700'
            />
          </div>

          <p className='text-zinc-400 text-xs'>
            {percentualUsado}% utilizado
          </p>
        </div>
      </CardContent>
    </Card>
  );
};


interface CreditAccountCardProps {
  account: GetAccountsResponse[number];
}

export const CreditAccountCard = ({ account }: CreditAccountCardProps) => {
  const saldoAtual = account?.totalUsed;

  return (
    <Card className='py-0 border-none h-auto'>
      <AccountCardHeader
        name={account?.name}
        last4Digits={account?.last4Digits}
        type={account?.type}
      />
      <CardContent className='px-6 pb-8 pt-4'>
        <div>
          <p className='text-zinc-400 text-sm mb-2'>Saldo atual</p>
          <p className='text-3xl font-semibold text-white'>
            {formatCurrency(saldoAtual)}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface SectionTitleProps {
  children: React.ReactNode;
}

export const SectionTitle = ({ children }: SectionTitleProps) => (
  <h2 className='text-xl font-semibold text-white mb-4 mt-16'>{children}</h2>
);
