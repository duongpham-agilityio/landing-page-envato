import React from 'react';
import whyDidYouRender from '@welldone-software/why-did-you-render';

// only check render on development environment
if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, {
    trackAllPureComponents: true,
    trackHooks: false,
  });
}
