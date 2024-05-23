'use client';

// Libs
import { memo, useCallback, useMemo } from 'react';
import { Button, Flex, Heading, useMediaQuery } from '@chakra-ui/react';
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
  const [isLargeThanMobile] = useMediaQuery('(min-width: 768px)');

  const handleViewDay = useCallback(() => onView(Views.DAY), [onView]);

  const handleViewWeek = useCallback(() => onView(Views.WEEK), [onView]);

  const handleViewMonth = useCallback(() => onView(Views.MONTH), [onView]);

  const handleBack = useCallback(
    () => onNavigate(Navigate.PREVIOUS),
    [onNavigate],
  );

  const handleNext = useCallback(() => onNavigate(Navigate.NEXT), [onNavigate]);

  const renderNextBackBtn = useMemo(
    () => (
      <Flex>
        <Button
          aria-label="btn-next"
          variant="iconSecondary"
          w="30px"
          h="30px"
          onClick={handleBack}
        >
          <Arrow color={primary} width={30} height={30} rotate="90deg" />
        </Button>

        <Button
          aria-label="btn-next"
          variant="iconSecondary"
          w="30px"
          h="30px"
          onClick={handleNext}
        >
          <Arrow color={primary} width={30} height={30} rotate="-90deg" />
        </Button>
      </Flex>
    ),
    [handleBack, handleNext, primary],
  );

  return (
    <Flex justifyContent="space-between" alignItems="center" wrap="wrap" mb={6}>
      <Heading as="h3" variant="heading2Xl" fontWeight="bold" lineHeight="9">
        Calendar
      </Heading>

      <Heading as="h3" variant="headingLg" lineHeight="7">
        {label}
      </Heading>

      {!isLargeThanMobile && renderNextBackBtn}

      <Flex
        alignItems="center"
        wrap="wrap"
        justifyContent="flex-end"
        gap={2}
        w={{ base: '100%', md: 'auto' }}
        mt={{ base: 2, md: 0 }}
      >
        <Flex
          flex={1}
          flexDir={{ base: 'column', md: 'row' }}
          gap={{ base: 3, md: 1 }}
        >
          <Button
            size="sm"
            w={{ base: '100%', md: '60px' }}
            bg={view === Views.MONTH ? 'primary.600' : 'primary.500'}
            onClick={handleViewMonth}
          >
            Month
          </Button>

          <Button
            size="sm"
            w={{ base: '100%', md: '60px' }}
            bg={view === Views.WEEK ? 'primary.600' : 'primary.500'}
            onClick={handleViewWeek}
          >
            Week
          </Button>
          <Button
            size="sm"
            w={{ base: '100%', md: '60px' }}
            bg={view === Views.DAY ? 'primary.600' : 'primary.500'}
            onClick={handleViewDay}
          >
            Day
          </Button>
        </Flex>
        {isLargeThanMobile && renderNextBackBtn}
      </Flex>
    </Flex>
  );
};

const CustomToolbar = memo(CustomToolbarComponent);

export default CustomToolbar;
