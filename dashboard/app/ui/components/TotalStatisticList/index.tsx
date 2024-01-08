import { memo } from 'react';
import dynamic from 'next/dynamic';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import { TotalStatisticListSkeleton } from '@/ui/components';

const TotalStatisticCard = dynamic(
  () => import('@/ui/components/TotalStatisticCard'),
  { ssr: false },
);

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { SPENDING_STATISTICS_MOCK } from '@/lib/mocks';

interface TotalListComponentProps {
  spendingStatistics?: ISpendingStatistics[];
  isLoading?: boolean;
}

const TotalStatisticListComponent = ({
  // TODO: call api later
  spendingStatistics = SPENDING_STATISTICS_MOCK,
  isLoading = false,
}: TotalListComponentProps) => {
  if (isLoading) return <TotalStatisticListSkeleton />;

  return (
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', xl: 'repeat(3, 1fr)' }}
      gap={6}
    >
      {spendingStatistics.map(
        ({ title, total, growth, weeklyIncome }: ISpendingStatistics) => (
          <GridItem key={title}>
            <TotalStatisticCard
              title={title}
              total={total}
              growth={growth}
              weeklyIncome={weeklyIncome}
            />
          </GridItem>
        ),
      )}
    </Grid>
  );
};

const TotalList = memo(TotalStatisticListComponent);

export default TotalList;
