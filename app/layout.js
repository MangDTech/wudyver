// import theme style scss file
import Link from 'next/link';
import 'styles/theme.scss';

export const metadata = {
    title: 'Wudysoft - AI API',
    description: 'Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi.',
    keywords: 'Wudysoft, AI, API, Machine Learning, Next.js'
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <head>
        <title>Wudysoft - AI API</title>
        <meta name="description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="keywords" content="Wudysoft, AI, API, Machine Learning, Next.js" />
        <meta name="author" content="Wudysoft" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="robots" content="index, follow" />
        <meta charSet="UTF-8" />

        {/* Open Graph Tags */}
        <meta property="og:title" content="Wudysoft - AI API" />
        <meta property="og:description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="/" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="id_ID" />
        <meta property="og:site_name" content="Wudysoft" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Wudysoft - AI API" />
        <meta name="twitter:description" content="Wudysoft menyediakan API AI terbaik untuk kebutuhan bisnis dan pengembangan aplikasi." />
        <meta name="twitter:image" content="/favicon.png" />
        <meta name="twitter:site" content="@Wudysoft" />
        <meta name="twitter:creator" content="@Wudysoft" />

        {/* Google Verification */}
        <meta name="google-site-verification" content="your-google-verification-code" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        
        {/* Canonical Link */}
        <link rel="canonical" href="/" />
      </head>
            <body className='bg-light'>
                {children}
            </body>
        </html>
    )
}
