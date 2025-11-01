'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

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
export const defaultThemeTokens: ThemeTokens = {
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
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

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
export function ThemeProvider({ children, initialTheme = null }: ThemeProviderProps) {
  const [fullTheme, setFullTheme] = useState<Theme | null>(initialTheme);

  // Derive theme tokens from full theme object or use defaults
  const theme = fullTheme?.tokens || defaultThemeTokens;

  /**
   * Update Theme Function
   * 
   * Updates the current theme and triggers re-render of all components
   * that consume the theme context.
   */
  const updateTheme = useCallback((newTheme: Theme | null) => {
    setFullTheme(newTheme);
  }, []);

  /**
   * Clear Theme Function
   * 
   * Resets theme to default state
   */
  const clearTheme = useCallback(() => {
    setFullTheme(null);
  }, []);

  const contextValue: ThemeContextValue = {
    theme,
    fullTheme,
    updateTheme,
    clearTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

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
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure to wrap your app with <ThemeProvider> from @myorg/lumina-components.'
    );
  }
  
  return context;
}

/**
 * Theme Validation Utility
 * 
 * Validates that a theme object contains all required properties.
 * 
 * @param theme - Theme object to validate
 * @returns true if valid, false otherwise
 */
export function validateThemeTokens(theme: any): theme is ThemeTokens {
  return (
    theme &&
    theme.colors &&
    typeof theme.colors.primary === 'string' &&
    typeof theme.colors.secondary === 'string' &&
    typeof theme.colors.tertiary === 'string' &&
    theme.typography &&
    typeof theme.typography.fontFamily === 'string' &&
    theme.shape &&
    typeof theme.shape.cornerRadius === 'number' &&
    theme.spacing &&
    typeof theme.spacing.base === 'number'
  );
}