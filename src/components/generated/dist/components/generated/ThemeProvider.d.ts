import { ReactNode } from 'react';
/**
 * ThemeProvider for Lumina Components
 *
 * Standalone theme provider that can be used in any React application.
 * This is a lightweight version of the main Lumina ThemeContext designed
 * specifically for the NPM package distribution.
 *
 * ## Usage
 *
 * ```tsx
 * import { ThemeProvider } from '@myorg/lumina-components';
 *
 * function App() {
 *   return (
 *     <ThemeProvider initialTheme={myTheme}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   );
 * }
 * ```
 */
/**
 * Theme Tokens Interface
 *
 * Defines the complete structure of theme tokens that components expect.
 * Based on Material 3 design principles with extensions for comprehensive theming.
 */
export interface ThemeTokens {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        onPrimary?: string;
        onSecondary?: string;
        onTertiary?: string;
        surface?: string;
        onSurface?: string;
        outline?: string;
    };
    typography: {
        fontFamily: string;
    };
    shape: {
        cornerRadius: number;
    };
    spacing: {
        base: number;
    };
    elevation?: {
        low?: string;
        medium?: string;
        high?: string;
    };
    generatedAt?: string;
    version?: string;
}
/**
 * Theme Object Interface
 *
 * Complete theme object structure for compatibility with Lumina ecosystem
 */
export interface Theme {
    id?: string;
    name?: string;
    tokens: ThemeTokens;
    organizationId?: string | null;
    userId?: string;
    createdAt?: Date;
    updatedAt?: Date;
}
/**
 * Theme Context Value Interface
 */
interface ThemeContextValue {
    /** Current theme tokens (never null due to defaults) */
    theme: ThemeTokens;
    /** Complete theme object */
    fullTheme: Theme | null;
    /** Update theme tokens and trigger re-render */
    updateTheme: (newTheme: Theme | null) => void;
    /** Clear theme and reset to defaults */
    clearTheme: () => void;
}
/**
 * Default Theme Tokens
 *
 * Material 3 baseline theme used when no custom theme is provided.
 */
export declare const defaultThemeTokens: ThemeTokens;
/**
 * Theme Provider Props
 */
interface ThemeProviderProps {
    children: ReactNode;
    initialTheme?: Theme | null;
}
/**
 * ThemeProvider Component
 *
 * Provides theme context to all Lumina components in the component tree.
 *
 * @param children - React children to wrap with theme context
 * @param initialTheme - Optional initial theme object
 */
export declare function ThemeProvider({ children, initialTheme }: ThemeProviderProps): import("react/jsx-runtime").JSX.Element;
/**
 * useTheme Hook
 *
 * Custom React hook that provides access to the current theme context.
 * Must be used within a ThemeProvider.
 *
 * @returns ThemeContextValue object with theme state and functions
 * @throws Error if used outside of ThemeProvider
 *
 * ## Usage
 *
 * ```tsx
 * import { useTheme } from '@myorg/lumina-components';
 *
 * function MyComponent() {
 *   const { theme, updateTheme } = useTheme();
 *
 *   return (
 *     <div style={{
 *       backgroundColor: theme.colors.primary,
 *       borderRadius: theme.shape.cornerRadius
 *     }}>
 *       Themed content
 *     </div>
 *   );
 * }
 * ```
 */
export declare function useTheme(): ThemeContextValue;
/**
 * Theme Validation Utility
 *
 * Validates that a theme object contains all required properties.
 *
 * @param theme - Theme object to validate
 * @returns true if valid, false otherwise
 */
export declare function validateThemeTokens(theme: any): theme is ThemeTokens;
export {};
