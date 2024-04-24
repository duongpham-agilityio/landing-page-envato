'use client';

// Fonts
import { HOMEPAGE_METADATA, OG_CONTENT, SIGN_IN_PAGE } from './lib/constants';
import { TAuthStoreData, authStore } from './lib/stores';
import { memo } from 'react';

const Metadata = () => {
  const user = authStore((state): TAuthStoreData['user'] => state.user);

  return (
    <head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <meta property="og:locale" content={OG_CONTENT.locale} />
      <meta property="og:site_name" content={OG_CONTENT.site} />
      <meta httpEquiv="Content-Type" content={OG_CONTENT.contentType} />
      <meta property="og:type" content={OG_CONTENT.type} />
      {user ? (
        <>
          <meta
            property="og:description"
            content={HOMEPAGE_METADATA.ogDescription}
          />
          <meta
            property="og:image:width"
            content={HOMEPAGE_METADATA.ogImageWidth}
          />
          <meta
            property="og:image:height"
            content={HOMEPAGE_METADATA.ogImageHeight}
          />
          <meta property="og:title" content={HOMEPAGE_METADATA.ogTitle} />
          <meta property="og:url" content={HOMEPAGE_METADATA.ogUrl} />
          <meta property="og:image" content={HOMEPAGE_METADATA.ogImage} />
        </>
      ) : (
        <>
          <meta
            property="og:description"
            content={SIGN_IN_PAGE.ogDescription}
          />
          <meta property="og:image:width" content={SIGN_IN_PAGE.ogImageWidth} />
          <meta
            property="og:image:height"
            content={SIGN_IN_PAGE.ogImageHeight}
          />
          <meta property="og:image:alt" content={SIGN_IN_PAGE.ogImageAlt} />
          <meta property="og:title" content={SIGN_IN_PAGE.ogTitle} />
          <meta property="og:url" content={SIGN_IN_PAGE.ogUrl} />
          <meta property="og:image" content={SIGN_IN_PAGE.ogImage} />
          <meta property="fb:app_id" content={SIGN_IN_PAGE.ogFbAppId} />
        </>
      )}
      <link rel="shortcut icon" href={'/logos/favicon.ico'} />
    </head>
  );
};

const MetadataMemorize = memo(Metadata);

export default MetadataMemorize;
