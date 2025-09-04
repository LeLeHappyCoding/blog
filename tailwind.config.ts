import type {Config} from 'tailwindcss';

export default {
    content: ['./src/**/*.{ts,tsx,js,jsx}'],
    theme: {
        extend: {
            colors: {
                side: 'var(--side-bg)',
                page: 'var(--page-bg)',
                content: 'var(--content-bg)',
                title: 'var(--title)',
                text: 'var(--text)',
                'text-secondary': 'var(--text-secondary)',
                primary: 'var(--primary)',
                'btn-plain-bg': 'var(--btn-plain-bg)',
                hilight: 'var(--hilight-color)',
                'side-border': 'var(--side-border)',
                'content-border': 'var(--content-border)',
                'nav-border': 'var(--nav-border-color)',
                'index-location': 'var(--index-location)',
                'side-about-icon': 'var(--side-about-icon)',
                'side-about-text': 'var(--side-about-text)',
            },
        },
    },
    plugins: [],
} satisfies Config;
