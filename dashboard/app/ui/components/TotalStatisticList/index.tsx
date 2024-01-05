import { memo } from 'react';

// Components
import { Grid, GridItem } from '@chakra-ui/react';
import {
  TotalStatisticCard,
  TotalStatisticListSkeleton,
} from '@/ui/components';

// Types
import { ISpendingStatistics } from '@/lib/interfaces';

// Mocks
import { INITIAL_TOTAL_STATISTICS } from '@/lib/mocks';

interface TotalListComponentProps {
  spendingStatistics?: ISpendingStatistics[];
  isLoading?: boolean;
}

const TotalStatisticListComponent = ({
  spendingStatistics = INITIAL_TOTAL_STATISTICS,
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
