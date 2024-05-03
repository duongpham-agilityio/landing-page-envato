import { memo } from 'react';
import { Box } from '@chakra-ui/react';
import isEqual from 'react-fast-compare';
import Image from 'next/image';

// Utils
import { generatePlaceholder } from '@/lib/utils';

// Themes
import { colors } from '@/ui/themes/bases';

interface AvatarProps {
  src?: string;
  alt?: string;
}

const AvatarComponent = ({ src = '', alt = '' }: AvatarProps) => (
  <Box pos="relative" w="50px" h="50px">
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      placeholder="blur"
      blurDataURL={generatePlaceholder(52, 52)}
      style={{
        borderRadius: '12px',
        borderWidth: '1px',
        paddingTop: '2px',
        cursor: 'pointer',
        objectFit: 'cover',
        borderColor: colors.secondary[850],
      }}
    />
  </Box>
);

const Avatar = memo(AvatarComponent, isEqual);

export default Avatar;
