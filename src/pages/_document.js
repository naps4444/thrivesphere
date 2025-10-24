import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Fonts for better performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Google Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Cinzel:wght@400;700&family=Lusitana:wght@400;700&family=Rubik+Maps&family=Volkhov:wght@400;700&family=Rakkas&family=Rage+Italic&display=swap"
          rel="stylesheet"
        />

        {/* Google Analytics (load gtag.js only once) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-CNEL7YV09Y"
        ></script>

        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              // Configure both Google Analytics properties
              gtag('config', 'G-CNEL7YV09Y', {
                page_path: window.location.pathname,
              });
              gtag('config', 'G-T9YVRJHVBG', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
