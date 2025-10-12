'use client'

import { CardSkeleton, GroupAccountCard, SectionTitle } from '@/components/cards/AccountsCards';
import { CreditAccountCard } from '@/components/cards/AccountsCards';
import { useAccountsQuery } from '@/services/hooks/accounts';
import React from 'react'



const CardsPage = () => {
  const { data, isLoading } = useAccountsQuery();

  const { groupAccounts, creditAccounts } = React.useMemo(() => {
    if (!data) return { groupAccounts: [], creditAccounts: [] };

    const grouped = data.filter(account => account.groupId);
    const credits = data.filter(account => !account.groupId);

    return {
      groupAccounts: grouped,
      creditAccounts: credits
    };
  }, [data]);

  return (
    <div className='mt-8'>
      <section className='space-y-8'>
        {groupAccounts.length > 0 && (
          <div>
            <SectionTitle>Benefícios</SectionTitle>
            <div className='grid grid-cols-3 gap-4 items-start'>
              {groupAccounts.map((account) => (
                <GroupAccountCard key={account.id} account={account} />
              ))}
            </div>
          </div>
        )}

        {creditAccounts.length > 0 && (
          <div>
            <SectionTitle>Crédito</SectionTitle>
            <div className='grid grid-cols-3 gap-4 items-start'>
              {creditAccounts.map((account) => (
                <CreditAccountCard key={account.id} account={account} />
              ))}
            </div>
          </div>
        )}

        {
          isLoading && (
            <div className='grid grid-cols-3 gap-4 items-start'>
              <CardSkeleton />
              <CardSkeleton />
              <CardSkeleton />
            </div>
          )
        }
      </section>
    </div>
  );
};

export default CardsPage;
