import type { Metadata } from 'next';

// Providers
import {
  ChakraProvider,
  CheckAuthenticationProvider,
  QueryProvider,
} from '@/ui/providers';

// Fonts
import { fontFamilies } from '@/ui/themes/bases';
import MetadataMemorize from './metadata';

export const metadata: Metadata = {
  title: 'Envato Market - Manage users and transactions on every purchase',
  description:
    'Envato Market will receive all transactions from furniture purchase and show users in the system.',
  icons: {
    icon: '/icons/logo-mini-light.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontFamilies.urbanist.variable} ${fontFamilies.poppins.variable}`}
    >
      <MetadataMemorize />
      <body>
        <QueryProvider>
          <ChakraProvider>
            <CheckAuthenticationProvider>
              {children}
            </CheckAuthenticationProvider>
          </ChakraProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
