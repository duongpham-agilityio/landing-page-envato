// Libs
import { memo, useCallback } from 'react';
import { Button, Flex, Heading } from '@chakra-ui/react';
import { Navigate, ToolbarProps, Views } from 'react-big-calendar';

// Components
import { Arrow } from '@/ui/components';

// Themes
import { useColorfill } from '@/ui/themes/bases';

const CustomToolbarComponent = ({
  label,
  view,
  onView,
  onNavigate,
}: ToolbarProps) => {
  const { primary } = useColorfill();

  const handleViewDay = useCallback(() => onView(Views.DAY), [onView]);

  const handleViewWeek = useCallback(() => onView(Views.WEEK), [onView]);

  const handleViewMonth = useCallback(() => onView(Views.MONTH), [onView]);

  const handleBack = useCallback(
    () => onNavigate(Navigate.PREVIOUS),
    [onNavigate],
  );

  const handleNext = useCallback(() => onNavigate(Navigate.NEXT), [onNavigate]);

  return (
    <Flex justifyContent="space-between" alignItems="center" wrap="wrap" mb={6}>
      <Heading as="h3" variant="heading2Xl" fontWeight="bold" lineHeight="9">
        Calendar
      </Heading>

      <Heading as="h3" variant="headingLg" lineHeight="7">
        {label}
      </Heading>

      <Flex alignItems="center" wrap="wrap" gap={3}>
        <Flex gap={1} wrap="wrap">
          <Button
            size="sm"
            bg={view === Views.MONTH ? 'primary.600' : 'primary.500'}
            onClick={handleViewMonth}
          >
            month
          </Button>
          <Button
            size="sm"
            bg={view === Views.WEEK ? 'primary.600' : 'primary.500'}
            onClick={handleViewWeek}
          >
            week
          </Button>
          <Button
            size="sm"
            bg={view === Views.DAY ? 'primary.600' : 'primary.500'}
            onClick={handleViewDay}
          >
            day
          </Button>
        </Flex>

        <Flex wrap="wrap">
          <Button
            aria-label="btn-next"
            variant="iconSecondary"
            w={6}
            h={6}
            onClick={handleBack}
          >
            <Arrow color={primary} rotate="90deg" />
          </Button>

          <Button
            aria-label="btn-next"
            variant="iconSecondary"
            w={6}
            h={6}
            onClick={handleNext}
          >
            <Arrow color={primary} rotate="-90deg" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

const CustomToolbar = memo(CustomToolbarComponent);

export default CustomToolbar;
