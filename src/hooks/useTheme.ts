/**
 * @Description: 主题切换
 * @Author: lele
 * @Date: 2025-08-31 15:30:58
 */
import {useEffect, useState, useCallback} from 'react';

export type Theme = 'light' | 'dark';

const THEME_KEY = 'theme';

// 获取系统主题
function getSystemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
}

// localstorage获取设置的主题
function getStoredTheme(): Theme | null {
    return (localStorage.getItem(THEME_KEY) as Theme) || null;
}

// 应用主题
function applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
}

export function useTheme() {
    const [theme, setTheme] = useState<Theme>(
        () => getStoredTheme() || getSystemTheme()
    );

    useEffect(() => {
        applyTheme(theme);

        // 如果没有用户手动选择，就跟随系统
        if (!getStoredTheme()) {
            const mq = window.matchMedia('(prefers-color-scheme: dark)');
            const handler = (e: MediaQueryListEvent) => {
                const next = e.matches ? 'dark' : 'light';
                setTheme(next);
                applyTheme(next);
            };
            mq.addEventListener('change', handler);
            return () => mq.removeEventListener('change', handler);
        }
    }, []);

    const setStoredTheme = useCallback((theme: Theme) => {
        localStorage.setItem(THEME_KEY, theme);
    }, []);

    // 切换主题
    const updateTheme = useCallback(
        (target?: Theme) => {
            let next: Theme = theme === 'dark' ? 'light' : 'dark';
            next = target ? target : next;
            setTheme(next);
            applyTheme(next);
            setStoredTheme(next);
        },
        [theme]
    );

    return {theme, updateTheme};
}
