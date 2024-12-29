import 'styles/theme.scss';
import Script from 'next/script';

export const metadata = {
    title: "Web API - Malik's Dashboard",
    description:
        'Web API by Malik is an open-source admin dashboard built with Next.js. Create stunning web apps with a free and powerful template, using the latest features of Next.js 13.',
    keywords:
        'Web API, Malik, Next.js 13, Admin dashboard, admin template, web apps, open-source, server components',
    openGraph: {
        title: "Web API - Malik's Dashboard",
        description:
            'Web API by Malik is an open-source admin dashboard built with Next.js. Create stunning web apps with a free and powerful template, using the latest features of Next.js 13.',
        url: 'https://api.malik-jmk.web.id',
        siteName: 'Next.js',
        images: [
            {
                url: 'https://next-learn-dashboard.vercel.sh/opengraph-image.png',
                width: 800,
                height: 600,
            },
            {
                url: 'https://next-learn-dashboard.vercel.sh/opengraph-image.png',
                width: 1800,
                height: 1600,
                alt: 'Next.js',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className="bg-light">
                {children}
                <Script
                    src="https://ddosnotification.github.io/snow-theme/snow.js"
                    strategy="beforeInteractive"
                />
                <Script id="snow-theme-config" strategy="lazyOnload">
                    {`
                        SnowTheme.config.snowflakes = ['❄', '●', '*', '+'];
                        SnowTheme.config.minSize = 1;
                        SnowTheme.config.maxSize = 2;
                        SnowTheme.config.minDuration = 10;
                        SnowTheme.config.maxDuration = 20;
                        SnowTheme.config.wind = 10;
                    `}
                </Script>
            </body>
        </html>
    );
}
