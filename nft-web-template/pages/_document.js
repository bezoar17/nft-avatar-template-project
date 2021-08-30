import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

const title = '<PLACEHOLDER>';
const description = "<PLACEHOLDER>";
const siteTitle = '<PLACEHOLDER>';
const url = '<PLACEHOLDER>';
const img_url = '<PLACEHOLDER>';
const twitter_creator = 'https://twitter.com/<PLACEHOLDER>';

class MyDocument extends Document {
  render() {
    return (
      <html lang="en">
        <Head>
          <title>{`${title}`}</title>
          <meta name="description" content={description} />
          <meta name="title" content={title} />

          <meta property="og:type" content="website" />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:image" content={img_url} />
          <meta property="og:site_name" content={siteTitle} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:creator" content={twitter_creator} />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />

          <link href="images/favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="images/webclip.png" rel="apple-touch-icon" />
          {/* <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;600;700&display=swap" rel="stylesheet" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
