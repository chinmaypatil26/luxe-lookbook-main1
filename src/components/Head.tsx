export const Head = () => {
  return (
    <>
      {/* Basic Meta */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#0f0f0f" />

      {/* SEO Fallbacks */}
      <meta name="description" content="A modern portfolio showcasing creative projects, design work, and visual stories." />
      <meta name="keywords" content="portfolio, design, fashion, projects, creative work" />

      {/* OpenGraph Fallbacks */}
      <meta property="og:title" content="Portfolio" />
      <meta property="og:description" content="Explore a curated collection of projects and creative work." />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/og-default.jpg" />

      {/* Preconnect / Performance */}
      <link rel="preconnect" href="https://static.parastorage.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

      {/* Optional Google Font (example) */}
      {/* <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet" /> */}

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" sizes="48x48" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

      {/* Canonical URL (SEO best practice) */}
      <link rel="canonical" href={typeof window !== "undefined" ? window.location.href : ""} />
    </>
  );
};
