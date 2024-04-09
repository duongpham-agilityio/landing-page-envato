import '@testing-library/jest-dom';
import React, { ReactElement, ReactNode } from 'react';
import * as jestFunc from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

// Themes
import { configThemes } from './app/ui/themes';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  ...jest.requireActual('firebase/firestore'),
  getFirestore: jest.fn(),
  collection: jest.fn(),
  getDocs: jest.fn(() =>
    Promise.resolve({
      docs: [
        {
          id: '1',
          data: () => ({ displayName: 'User One', uid: 'uid1' }),
        },
        {
          id: '2',
          data: () => ({ displayName: 'SUPER_ADMIN', uid: 'uidAdmin' }),
        },
      ],
    }),
  ),
  getDoc: jest.fn(() =>
    Promise.resolve({
      exists: () => true,

      data: () => ({
        messages: [
          {
            id: ':r1f:',
            date: {
              seconds: 1707099591,
              nanoseconds: 620000000,
            },
            senderId: 'lBNWnoNBQGZ260KgnF9NxQCPlqf1',
            text: 'Hi',
          },
        ],
      }),
    }),
  ),
  onSnapshot: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(() =>
    Promise.resolve({
      exists: () => true,

      data: () => ({
        messages: [
          {
            id: ':r1f:',
            date: {
              seconds: 1707099591,
              nanoseconds: 620000000,
            },
            senderId: 'lBNWnoNBQGZ260KgnF9NxQCPlqf1',
            text: 'Hi',
          },
        ],
      }),
    }),
  ),
}));

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  getAuth: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  ...jest.requireActual('firebase/app'),
  initializeApp: jest.fn(),
}));

jest.mock('firebase/storage', () => ({
  ...jest.requireActual('firebase/storage'),
  getStorage: jest.fn(),
}));

jest.mock('firebase/messaging', () => ({
  ...jest.requireActual('firebase/messaging'),
  getMessaging: jest.fn(),
}));

jest.mock('react-intersection-observer');

jest.mock('react-intersection-observer', () => ({
  InView: ({
    children,
  }: {
    children: (props: { inView: boolean; ref: () => void }) => ReactNode;
  }) => children({ inView: true, ref: jest.fn() }) as ReactElement,
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    matches: true,
    media: '480px',
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const customRender = <
  Q extends jestFunc.Queries = typeof jestFunc.queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactElement,
  options?: jestFunc.RenderOptions<Q, Container, BaseElement>,
) =>
  jestFunc.render(ui, {
    ...options,
    wrapper: ({ children }: { children: React.ReactElement }) => {
      const CustomWrapper = options?.wrapper
        ? options.wrapper
        : ({ children }: { children: React.ReactElement }) => children;

      return (
        <ChakraProvider theme={configThemes}>
          <CustomWrapper>{children}</CustomWrapper>
        </ChakraProvider>
      );
    },
  });

/**
 * Add test handler into global
 */
globalThis.testLibReactUtils = {
  ...jestFunc,
  render: customRender,
};

/**
 * The same above, but it limit handler:
 * - (render, waitFor, renderHook, act, fireEvent, screen => screenJest)
 * If you need use more handler of Testing, you can use testLibReactUtils above
 */
Object.assign(global, {
  ...jestFunc,
  render: customRender,
  screenJest: jestFunc.screen,
});

jest.setTimeout(30000);

export const testing = { ...jestFunc, render: customRender };
