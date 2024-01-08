import { memo } from 'react';
import dynamic from 'next/dynamic';
import { Box, Flex, Text, useColorMode } from '@chakra-ui/react';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Components
import Statistical from './Statistical';

// Constants
import { STROKE_COLORS, THEMES } from '@/lib/constants';

// Icons
import { Sort } from '@/ui/components/Icons';

// Types
import { IEfficiency } from '@/lib/interfaces';

// Colors
import { colors } from '@/ui/themes/bases/colors';

// Utils
import { formatDecimalNumber } from '@/lib/utils';

const EfficiencyComponent = ({
  statistical,
  arrival,
  spending,
}: IEfficiency): JSX.Element => {
  const { colorMode } = useColorMode();

  const sortIconColor =
    colorMode === THEMES.LIGHT
      ? colors.text.primary.default
      : colors.common.white;

  return (
    <Box py={4} px={5}>
      <Flex justifyContent="space-between" mb={4}>
        <Chart
          options={{
            plotOptions: {
              pie: {
                donut: {
                  size: '45%',
                },
              },
            },
            legend: {
              show: false,
            },

            annotations: {},
            colors: STROKE_COLORS,
            dataLabels: {
              enabled: true,
              formatter: (val) => val + '%',
            },
            tooltip: {
              custom: function ({ series, seriesIndex }) {
                return `<div style="padding: 10px; background-color: #000" >
              <span>
              ${statistical[seriesIndex].title}: ${series[seriesIndex]}%
              </span>
              </div>`;
              },
            },
          }}
          series={statistical.map((item) => item.value)}
          type="donut"
          width="200"
          height="auto"
        />
        <Box>
          <Box mb={6}>
            <Flex alignItems="center" gap={1}>
              <Text variant="textLg" color="text.currencyColor">
                ${formatDecimalNumber(arrival || 0, true)}
              </Text>
              <Sort />
            </Flex>
            <Text variant="textMd" color="text.secondary">
              Arrival
            </Text>
          </Box>
          <Box>
            <Flex alignItems="center" gap={1}>
              <Text variant="textLg">
                ${formatDecimalNumber(spending || 0, true)}
              </Text>
              <Sort color={sortIconColor} />
            </Flex>

            <Text variant="textMd" color="text.secondary">
              Spending
            </Text>
          </Box>
        </Box>
      </Flex>
      <Flex flexDirection="column" gap={1.5}>
        {statistical.map((item, index) => (
          <Statistical
            key={item.title}
            {...item}
            color={STROKE_COLORS[index]}
          />
        ))}
      </Flex>
    </Box>
  );
};

const EfficiencyInfo = memo(EfficiencyComponent);

export default EfficiencyInfo;
