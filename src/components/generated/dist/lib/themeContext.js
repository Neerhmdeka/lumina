'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
/**
 * Default Theme Tokens
 *
 * Fallback theme used when no custom theme is available.
 * Based on Material 3 baseline with sensible defaults.
 */
export const defaultThemeTokens = {
    colors: {
        primary: '#6750A4',
        secondary: '#625B71',
        tertiary: '#7D5260',
        onPrimary: '#FFFFFF',
        onSecondary: '#FFFFFF',
        onTertiary: '#FFFFFF',
        surface: '#FFFBFE',
        onSurface: '#1C1B1F',
        outline: '#79747E',
    },
    typography: {
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    shape: {
        cornerRadius: 12,
    },
    spacing: {
        base: 16,
    },
    elevation: {
        low: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
        medium: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
        high: '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
    },
    version: '1.0.0',
};
/**
 * Theme Context
 *
 * React context that provides theme state and management functions
 * to all components in the application tree.
 */
const ThemeContext = createContext(null);
/**
 * Theme Provider Component
 *
 * Wraps the application and provides theme context to all child components.
 * Manages theme state, API calls, and automatic updates.
 *
 * ## Usage
 *
 * ```tsx
 * import { ThemeProvider } from '@/src/lib/themeContext';
 *
 * function App() {
 *   return (
 *     <ThemeProvider initialTheme={serverTheme}>
 *       <YourAppComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 *
 * ## State Management
 *
 * - **theme**: Current theme tokens for component styling
 * - **fullTheme**: Complete theme object with metadata
 * - **isLoading**: Loading state for async operations
 * - **error**: Error state for failed operations
 *
 * ## Automatic Updates
 *
 * When theme is updated via updateTheme(), all components using useTheme()
 * will automatically re-render with the new theme tokens.
 */
export function ThemeProvider({ children, initialTheme = null }) {
    // Theme state management
    const [fullTheme, setFullTheme] = useState(initialTheme);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    // Derive theme tokens from full theme object
    const theme = (fullTheme === null || fullTheme === void 0 ? void 0 : fullTheme.tokens) || defaultThemeTokens;
    /**
     * Update Theme Function
     *
     * Updates the current theme and triggers re-render of all components
     * that consume the theme context. This is the primary way to apply
     * theme changes across the application.
     *
     * @param newTheme - New theme object or null to reset to default
     */
    const updateTheme = useCallback((newTheme) => {
        setFullTheme(newTheme);
        setError(null);
        // Log theme update for debugging
        if (process.env.NODE_ENV === 'development') {
            console.log('Theme updated:', (newTheme === null || newTheme === void 0 ? void 0 : newTheme.name) || 'Default theme');
        }
    }, []);
    /**
     * Refresh Theme Function
     *
     * Fetches the latest theme from the database and updates the context.
     * Useful for syncing theme changes across browser tabs or sessions.
     */
    const refreshTheme = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/theme/current');
            if (!response.ok) {
                if (response.status === 404) {
                    // No theme found - use default
                    setFullTheme(null);
                    return;
                }
                throw new Error(`Failed to fetch theme: ${response.status}`);
            }
            const data = await response.json();
            if (data.success && data.theme) {
                setFullTheme(data.theme);
            }
            else {
                setFullTheme(null);
            }
        }
        catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch theme';
            setError(errorMessage);
            // Log error for debugging
            console.error('Theme fetch error:', errorMessage);
        }
        finally {
            setIsLoading(false);
        }
    }, []);
    /**
     * Clear Theme Function
     *
     * Resets the theme to default state, useful for testing
     * or when user wants to remove custom theming.
     */
    const clearTheme = useCallback(() => {
        setFullTheme(null);
        setError(null);
    }, []);
    // Context value object
    const contextValue = {
        theme,
        fullTheme,
        isLoading,
        error,
        updateTheme,
        refreshTheme,
        clearTheme,
    };
    return (_jsx(ThemeContext.Provider, { value: contextValue, children: children }));
}
/**
 * useTheme Hook
 *
 * Custom React hook that provides access to the current theme context.
 * This is the primary way for components to access theme tokens and
 * management functions.
 *
 * ## Usage in Components
 *
 * ```tsx
 * import { useTheme } from '@/src/lib/themeContext';
 *
 * function MyComponent() {
 *   const { theme, updateTheme, isLoading } = useTheme();
 *
 *   return (
 *     <div style={{
 *       backgroundColor: theme.colors.primary,
 *       borderRadius: theme.shape.cornerRadius
 *     }}>
 *       {isLoading ? 'Loading...' : 'Content'}
 *     </div>
 *   );
 * }
 * ```
 *
 * ## Automatic Re-rendering
 *
 * Components using this hook will automatically re-render when:
 * - Theme tokens are updated via updateTheme()
 * - Theme is refreshed from the database
 * - Theme is cleared or reset
 *
 * This ensures that all styled components stay in sync with the
 * current theme without manual intervention.
 *
 * @returns ThemeContextValue object with theme state and functions
 * @throws Error if used outside of ThemeProvider
 */
export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider. ' +
            'Make sure to wrap your app with <ThemeProvider>.');
    }
    return context;
}
/**
 * Theme Validation Utility
 *
 * Validates that a theme object contains all required properties.
 * Useful for ensuring theme integrity before applying.
 *
 * @param theme - Theme object to validate
 * @returns true if valid, false otherwise
 */
export function validateThemeTokens(theme) {
    return (theme &&
        theme.colors &&
        typeof theme.colors.primary === 'string' &&
        typeof theme.colors.secondary === 'string' &&
        typeof theme.colors.tertiary === 'string' &&
        theme.typography &&
        typeof theme.typography.fontFamily === 'string' &&
        theme.shape &&
        typeof theme.shape.cornerRadius === 'number' &&
        theme.spacing &&
        typeof theme.spacing.base === 'number');
}
