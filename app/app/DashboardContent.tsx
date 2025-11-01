'use client';

import { useCallback } from 'react';
import ThemeForm from './ThemeForm';
import ThemePreview from './ThemePreview';
import { useTheme } from '../../src/lib/themeContext';

/**
 * Dashboard Content Component
 * 
 * Client-side component that manages theme state and handles dynamic updates.
 * Bridges the gap between server-side initial theme data and client-side form updates.
 * 
 * Features:
 * - Manages current theme state on client-side
 * - Handles theme updates after form submission
 * - Refreshes preview when new theme is saved
 * - Provides callback for form to update preview
 */

interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    onPrimary?: string;
    onSecondary?: string;
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
  generatedAt?: string;
  version?: string;
}

interface Theme {
  id: string;
  name: string;
  tokens: ThemeTokens;
  organizationId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface DashboardContentProps {
  initialTheme: Theme | null;
}

export default function DashboardContent({ initialTheme }: DashboardContentProps) {
  /**
   * Theme Context Integration
   * 
   * DashboardContent now uses the ThemeContext for centralized theme management.
   * This enables automatic updates across all components when theme changes.
   * 
   * Benefits:
   * - Eliminates local theme state duplication
   * - Automatic component updates when theme saved
   * - Consistent theme across all generated components
   * - Real-time visual feedback without page reloads
   */
  const { fullTheme, isLoading, updateTheme, refreshTheme } = useTheme();

  /**
   * Handle successful form submission
   * Updates the theme context which automatically triggers re-renders
   * of all components using the theme
   */
  const handleThemeSaved = useCallback((savedTheme: Theme) => {
    updateTheme(savedTheme);
  }, [updateTheme]);

  return (
    <div className="max-w-2xl mx-auto">
      {/* Theme Configuration Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Design System Configuration
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Configure your design tokens to generate your custom design system
          </p>
        </div>
        
        {/* Theme Input Form with callback to update preview */}
        <ThemeForm onThemeSaved={handleThemeSaved} />
      </div>

      {/* Live Theme Preview Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mt-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            Live Theme Preview
            {isLoading && (
              <span className="ml-2 text-sm text-blue-600">(Updating...)</span>
            )}
          </h2>
          <p className="text-gray-600">
            See your design tokens in action
          </p>
        </div>
        
        {/* Theme Preview with context theme - automatically updates */}
        <ThemePreview theme={fullTheme} />
      </div>
    </div>
  );
}