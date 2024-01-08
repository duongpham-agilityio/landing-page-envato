'use client';

import { memo } from 'react';
import dynamic from 'next/dynamic';

// Components
import { Box, Image, HStack, Text, Flex } from '@chakra-ui/react';
// import Chart from 'react-apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false,
});

// Images
import { IMAGES } from '@/lib/constants';

// Utils
import { formatDecimalNumber } from '@/lib/utils';

interface TotalCardComponentProps {
  title: string;
  total: number;
  growth: number;
  weeklyIncome: number[];
}

const TotalCardComponent = ({
  title,
  total,
  growth,
  weeklyIncome,
}: TotalCardComponentProps) => (
  <Box p={5} bg="background.component.primary" rounded="lg">
    <Flex alignItems="center" justifyContent="space-between" mb={5}>
      <HStack w="fit-content">
        <Image
          w={12}
          h={38}
          src={IMAGES.TOTAL_EARN.url}
          alt={IMAGES.TOTAL_EARN.alt}
        />
        <Text variant="textLg" fontWeight="semibold">
          {title}
        </Text>
      </HStack>
    </Flex>
    <Flex alignItems="center" justifyContent="space-between">
      <Box>
        <Text variant="text3Xl">${formatDecimalNumber(total)}</Text>
        <HStack>
          <Image
            src={IMAGES.GROWTH.url}
            alt={IMAGES.GROWTH.alt}
            w={4}
            h={3.5}
          />
          <Text color="primary.500">
            + {growth}%{' '}
            <Text as="span" variant="textSm" color="text.textInfo">
              from last week
            </Text>
          </Text>
        </HStack>
      </Box>
      <Box maxW="150">
        <Chart
          options={{
            colors: ['#22C55E'],
            grid: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
            },
            tooltip: {
              enabled: false,
            },
            chart: {
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false,
              },
            },
            dataLabels: {
              enabled: false,
            },
          }}
          series={[
            {
              data: weeklyIncome,
            },
          ]}
          type="area"
          width="100%"
          height="auto"
        />
      </Box>
    </Flex>
  </Box>
);

const TotalCard = memo(TotalCardComponent);

export default TotalCard;
