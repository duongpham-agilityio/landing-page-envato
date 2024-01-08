import type { Metadata } from 'next';
import './globals.css';

// Providers
import { ChakraProvider } from '@/ui/providers';

// Fonts
import { fontFamilies } from '@/ui/themes/bases';

export const metadata: Metadata = {
  title: 'Envato Dashboard ',
  description: 'Envato Dashboard',
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
      <body>
        <ChakraProvider>{children}</ChakraProvider>
      </body>
    </html>
  );
}
