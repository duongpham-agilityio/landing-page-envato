'use client';

import { Button, Text } from '@chakra-ui/react';

const GlobalError = ({ reset }: { reset: () => void }) => (
  <html>
    <body>
      <Text
        fontSize="lg"
        fontWeight="bold"
        color="text.primary"
        data-testid="global-error-title"
      >
        Something went wrong!
      </Text>
      <Button onClick={reset}>Try again</Button>
    </body>
  </html>
);

export default GlobalError;
