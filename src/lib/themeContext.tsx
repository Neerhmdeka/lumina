'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';

/**
 * Theme Context for Lumina Design System
 * 
 * Provides centralized theme management across the entire application.
 * This context enables automatic theme updates for all generated components
 * without requiring page reloads or manual component re-renders.
 * 
 * ## How It Works
 * 
 * 1. **ThemeProvider** wraps the application and manages global theme state
 * 2. **useTheme hook** allows components to access current theme tokens
 * 3. **updateTheme function** triggers updates across all subscribed components
 * 4. **API integration** fetches latest theme from database when needed
 * 
 * ## Live Update Flow
 * 
 * User saves theme → API updates database → Context updates state → 
 * All components re-render with new theme → Instant visual updates
 * 
 * This eliminates the need for:
 * - Page reloads to see theme changes
 * - Manual component theme setters
 * - Global state management libraries
 * - Complex theme synchronization logic
 * 
 * ## Future Enhancements
 * 
 * - WebSocket integration for real-time multi-device updates
 * - Theme change animations and transitions
 * - Theme validation and error handling
 * - Performance optimization with selective re-renders
 */

/**
 * Theme Tokens Interface
 * 
 * Defines the complete structure of theme tokens that components expect.
 * Based on Material 3 design principles with extensions for Lumina's needs.
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
 * Theme Database Record Interface
 * 
 * Represents the complete theme object as stored in the database.
 * Includes metadata and organizational information.
 */
export interface Theme {
  id: string;
  name: string;
  tokens: ThemeTokens;
  organizationId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Theme Context Value Interface
 * 
 * Defines what the ThemeContext provides to consuming components.
 * Includes both state and functions for theme management.
 */
interface ThemeContextValue {
  /** Current theme tokens (null if no theme loaded) */
  theme: ThemeTokens | null;
  
  /** Complete theme object with metadata */
  fullTheme: Theme | null;
  
  /** Loading state for theme operations */
  isLoading: boolean;
  
  /** Error state for theme operations */
  error: string | null;
  
  /** Update theme tokens and trigger re-render of all components */
  updateTheme: (newTheme: Theme | null) => void;
  
  /** Fetch latest theme from database */
  refreshTheme: () => Promise<void>;
  
  /** Clear current theme and reset to defaults */
  clearTheme: () => void;
}

/**
 * Default Theme Tokens
 * 
 * Fallback theme used when no custom theme is available.
 * Based on Material 3 baseline with sensible defaults.
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
 * 
 * React context that provides theme state and management functions
 * to all components in the application tree.
 */
const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Theme Provider Props Interface
 */
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme | null;
}

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
export function ThemeProvider({ children, initialTheme = null }: ThemeProviderProps) {
  // Theme state management
  const [fullTheme, setFullTheme] = useState<Theme | null>(initialTheme);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Derive theme tokens from full theme object
  const theme = fullTheme?.tokens || defaultThemeTokens;

  /**
   * Update Theme Function
   * 
   * Updates the current theme and triggers re-render of all components
   * that consume the theme context. This is the primary way to apply
   * theme changes across the application.
   * 
   * @param newTheme - New theme object or null to reset to default
   */
  const updateTheme = useCallback((newTheme: Theme | null) => {
    setFullTheme(newTheme);
    setError(null);
    
    // Log theme update for debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Theme updated:', newTheme?.name || 'Default theme');
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
      } else {
        setFullTheme(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch theme';
      setError(errorMessage);
      
      // Log error for debugging
      console.error('Theme fetch error:', errorMessage);
    } finally {
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
  const contextValue: ThemeContextValue = {
    theme,
    fullTheme,
    isLoading,
    error,
    updateTheme,
    refreshTheme,
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
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error(
      'useTheme must be used within a ThemeProvider. ' +
      'Make sure to wrap your app with <ThemeProvider>.'
    );
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

/**
 * Theme Utilities Export
 * 
 * Theme and ThemeTokens interfaces are already exported above
 * No additional exports needed here
 */