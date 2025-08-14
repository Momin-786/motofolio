import React from 'react'
import Head from 'next/head';

export default function Meta() {
    return (
        <Head>
            {/* Primary Meta Tags */}
            <title>Momin - Full-Stack Developer & AI Enthusiast</title>
            <meta charSet="utf-8" />
            <meta name="title" content="Momin Portfolio - Full-Stack Developer & AI Enthusiast" />
            <meta name="description"
                content="Momin's Personal Portfolio Website. Full-stack developer and AI enthusiast, specializing in web, mobile, and AI-driven solutions. Built with Kali Linux theme using Next.js and Tailwind CSS." />
            <meta name="author" content="Momin" />
            <meta name="keywords"
                content="Momin, Momin portfolio, x3rcyb, Momin full-stack developer, Momin AI, Momin Kali Linux, full-stack portfolio, AI portfolio, Next.js portfolio, Tailwind CSS" />
            <meta name="robots" content="index, follow" />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="language" content="English" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="theme-color" content="#1A2B6D" />

            {/* Search Engine */}
            <meta name="image" content="/images/logos/favicon.png" />
            {/* Schema.org for Google */}
            <meta itemProp="name" content="Momin Portfolio - Full-Stack Developer & AI Enthusiast" />
            <meta itemProp="description"
                content="Momin's Personal Portfolio Website. Full-stack developer and AI enthusiast, specializing in web, mobile, and AI-driven solutions. Built with Kali Linux theme using Next.js and Tailwind CSS." />
            <meta itemProp="image" content="/images/logos/favicon.png" />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Momin Portfolio - Full-Stack Developer & AI Enthusiast" />
            <meta name="twitter:description"
                content="Momin's Personal Portfolio Website. Full-stack developer and AI enthusiast, specializing in web, mobile, and AI-driven solutions. Built with Kali Linux theme using Next.js and Tailwind CSS." />
            <meta name="twitter:site" content="@x3rcyb" />
            <meta name="twitter:creator" content="@x3rcyb" />
            <meta name="twitter:image:src" content="/images/logos/logo_1024.png" />
            {/* Open Graph general (Facebook, Pinterest & Google+) */}
            <meta name="og:title" content="Momin Portfolio - Full-Stack Developer & AI Enthusiast" />
            <meta name="og:description"
                content="Momin's Personal Portfolio Website. Full-stack developer and AI enthusiast, specializing in web, mobile, and AI-driven solutions. Built with Kali Linux theme using Next.js and Tailwind CSS." />
            <meta name="og:image" content="/images/logos/logo_1200.png" />
            <meta name="og:url" content="https://mosol.infy.uk" />
            <meta name="og:site_name" content="Momin Personal Portfolio" />
            <meta name="og:locale" content="en_US" />
            <meta name="og:type" content="website" />

            <link rel="icon" href="/images/logos/momin-logo.png" />
            <link rel="apple-touch-icon" href="/images/logos/momin-logo.png" />
            <link rel="preload" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" as="style" />
            <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&display=swap" rel="stylesheet" />
        </Head>
    )
}