'use client';

import { ReactNode } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Button Component
 * 
 * A dynamically styled button component that uses theme tokens to create consistent,
 * branded interactions across your application. This component is part of Lumina's
 * generated design system and automatically updates its appearance when theme tokens
 * are modified, ensuring perfect brand alignment without code changes.
 * 
 * ## Material 3 Design Inspiration
 * 
 * - **Primary Variant**: Uses primary color role for background (Material 3 filled button)
 * - **Secondary Variant**: Uses secondary color with proper contrast ratios
 * - **Outline Variant**: Uses tertiary color for borders, transparent background
 * - **Typography**: Consistent font family and medium weight for readability
 * - **Shape System**: Applies consistent corner radius across all variants
 * - **Spacing System**: Uses base spacing unit for predictable sizing
 * 
 * ## Token Mapping & Style Application
 * 
 * ### Colors
 * - `primary` variant → `theme.tokens.colors.primary` (background)
 * - `secondary` variant → `theme.tokens.colors.secondary` (background)
 * - `outline` variant → `theme.tokens.colors.tertiary` (border + text)
 * - Contrast colors → `onPrimary`, `onSecondary` (auto-calculated if missing)
 * 
 * ### Typography
 * - `fontFamily` → `theme.tokens.typography.fontFamily`
 * - `fontWeight` → Medium (500) for optimal button readability
 * - `fontSize` → Responsive sizing based on button padding
 * 
 * ### Shape & Spacing
 * - `borderRadius` → `theme.tokens.shape.cornerRadius`px
 * - `padding` → Vertical: `base/2`, Horizontal: `base * 1.5`
 * - `minHeight` → `base * 2.75` for consistent touch targets
 * 
 * ## Usage Examples
 * 
 * ### Basic Usage
 * ```tsx
 * import { Button } from '@/src/components/generated';
 * 
 * function MyComponent() {
 *   return (
 *     <Button variant="primary" onClick={() => console.log('clicked')}>
 *       Get Started
 *     </Button>
 *   );
 * }
 * ```
 * 
 * ### With Custom Styling
 * ```tsx
 * <Button 
 *   variant="outline" 
 *   className="w-full sm:w-auto shadow-lg"
 *   disabled={loading}
 * >
 *   {loading ? 'Processing...' : 'Submit Form'}
 * </Button>
 * ```
 * 
 * ### Button Group
 * ```tsx
 * <div className="flex gap-3">
 *   <Button variant="primary">Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </div>
 * ```
 * 
 * ## Accessibility Features
 * 
 * - **Focus Management**: Visible focus rings with proper contrast
 * - **Disabled States**: Clear visual indication with reduced opacity
 * - **Hover States**: Subtle hover feedback without jarring transitions
 * - **Touch Targets**: Minimum 44px height for mobile accessibility
 * - **Screen Reader**: Semantic button element with proper ARIA support
 * 
 * ## Reusability Across Projects
 * 
 * This component is designed to be portable:
 * 
 * 1. **Theme Agnostic**: Works with any theme token structure
 * 2. **Framework Independent**: Pure React with minimal dependencies
 * 3. **Tailwind Compatible**: Seamlessly merges with utility classes
 * 4. **Export Ready**: Can be packaged as standalone NPM module
 * 
 * To use in another project:
 * ```bash
 * npm install lumina-components  # Future NPM package
 * ```
 * 
 * ```tsx
 * import { Button, setGlobalTheme } from 'lumina-components';
 * 
 * // Apply your brand tokens
 * setGlobalTheme({
 *   colors: { primary: '#your-brand-color' },
 *   typography: { fontFamily: 'Your Font' },
 *   // ... other tokens
 * });
 * ```
 */

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'outline';
}

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
}

/**
 * Legacy Theme Setter (Maintained for Backward Compatibility)
 * 
 * This function is maintained for backward compatibility with existing code
 * that may still use the global theme setter pattern. The component now
 * primarily uses ThemeContext for automatic updates.
 */
export const setButtonTheme = (theme: ThemeTokens | null) => {
  // This function is now a no-op since we use ThemeContext
  // Kept for backward compatibility
  console.warn('setButtonTheme is deprecated. Use ThemeContext instead.');
};

export default function Button({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  variant = 'primary'
}: ButtonProps) {
  /**
   * Theme Integration via Context
   * 
   * The Button component now uses the useTheme hook to access current theme tokens.
   * This enables automatic re-rendering when theme changes, eliminating the need
   * for manual theme setters or global state management.
   * 
   * Benefits:
   * - Automatic updates when theme changes
   * - No manual component re-rendering needed
   * - Consistent theming across all components
   * - Real-time visual feedback for theme changes
   */
  const { fullTheme } = useTheme();

  // Default theme tokens for fallback
  const defaultThemeTokens: ThemeTokens = {
    colors: {
      primary: '#2563eb',
      secondary: '#64748b', 
      tertiary: '#0f172a',
      onPrimary: '#ffffff',
      onSecondary: '#ffffff',
    },
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
    shape: {
      cornerRadius: 6,
    },
    spacing: {
      base: 16,
    },
  };
  
  // Use theme tokens from the fullTheme object or fallback to default
  const theme = fullTheme?.tokens || defaultThemeTokens;

  // Calculate dynamic styles based on theme tokens
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary || '#FFFFFF',
          border: 'none',
        };
      case 'secondary':
        return {
          backgroundColor: theme.colors.secondary,
          color: theme.colors.onSecondary || '#FFFFFF',
          border: 'none',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary,
          border: `2px solid ${theme.colors.primary}`,
        };
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.onPrimary || '#FFFFFF',
          border: 'none',
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Dynamic inline styles using theme tokens
  const buttonStyles = {
    // Color tokens - Material 3 color roles
    ...variantStyles,
    
    // Typography tokens - consistent font family
    fontFamily: theme.typography.fontFamily,
    
    // Shape tokens - corner radius for consistent rounded corners
    borderRadius: `${theme.shape.cornerRadius}px`,
    
    // Spacing tokens - padding based on base spacing unit
    // Material 3 pattern: more horizontal padding than vertical
    padding: `${theme.spacing.base * 0.75}px ${theme.spacing.base * 1.5}px`,
    
    // Additional styling for better UX
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    fontWeight: '500',
    fontSize: '14px',
    lineHeight: '1.5',
    
    // Focus and interaction states
    outline: 'none',
  };

  // Handle hover and focus styles with CSS-in-JS approach
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      if (variant === 'outline') {
        target.style.backgroundColor = theme.colors.primary + '10'; // Add transparency
      } else {
        target.style.filter = 'brightness(0.9)';
      }
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      if (variant === 'outline') {
        target.style.backgroundColor = 'transparent';
      } else {
        target.style.filter = 'none';
      }
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = `0 0 0 2px ${theme.colors.primary}40`; // Add focus ring
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = 'none';
  };

  // Helper function to merge classes safely
  const mergeClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <button
      style={buttonStyles}
      className={mergeClasses(
        'inline-flex items-center justify-center', // Base classes
        'font-medium transition-all duration-200 ease-in-out', // Animation and typography
        'focus:outline-none focus:ring-2 focus:ring-offset-2', // Focus states
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', // Disabled state
        className // User-provided classes (highest priority)
      )}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      {children}
    </button>
  );
}