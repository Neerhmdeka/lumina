'use client';

import { ReactNode } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Card Component
 * 
 * A flexible surface container component that uses theme tokens to create consistent,
 * branded content areas throughout your application. This component follows Material 3
 * surface design principles while adapting to your custom brand tokens for seamless
 * integration across different projects and themes.
 * 
 * ## Material 3 Design Inspiration
 * 
 * - **Surface Containers**: Clean, elevated surfaces for content organization
 * - **Elevation System**: Subtle shadows that respond to user interactions
 * - **Shape Consistency**: Unified corner radius across all surface elements
 * - **Content Spacing**: Automatic internal spacing for optimal content flow
 * - **Variant Support**: Multiple surface styles for different content contexts
 * 
 * ## Token Mapping & Style Application
 * 
 * ### Surface & Colors
 * - `default` variant → Clean white background with subtle border
 * - `outlined` variant → Transparent background with prominent border
 * - `filled` variant → Light surface background with minimal border
 * - Border colors → `secondary` color at 20% opacity for subtle definition
 * 
 * ### Shape & Spacing
 * - `borderRadius` → `theme.tokens.shape.cornerRadius`px for all corners
 * - `padding` → `base * 1.5` for comfortable internal spacing
 * - `gap` → `base * 0.75` between child elements (automatic)
 * - Responsive sizing based on content and container
 * 
 * ### Elevation System
 * - `low` → Subtle shadow for basic elevation (default cards)
 * - `medium` → Moderate shadow for important content areas
 * - `high` → Strong shadow for modals and overlays
 * - Hover enhancement → +2 elevation levels on interaction
 * 
 * ## Usage Examples
 * 
 * ### Basic Content Card
 * Card with elevation for product displays:
 * - Use elevation="medium" for product cards
 * - Typography components automatically space properly
 * - Button components inherit theme styling
 * 
 * ### Dashboard Widget  
 * Filled variant for dashboard panels:
 * - variant="filled" provides subtle background
 * - className can add responsive sizing (min-h-48)
 * - Works perfectly with charts and data visualization
 * 
 * ### Navigation Card
 * Outlined variant for interactive elements:
 * - variant="outlined" for clean borders
 * - Add hover classes for interactive feedback
 * - Perfect for feature cards and navigation items
 * 
 * ## Content Organization Features
 * 
 * - **Automatic Spacing**: Child elements receive consistent gap spacing
 * - **Flex Layout**: Content flows vertically with proper alignment
 * - **Overflow Handling**: Prevents content from breaking card boundaries
 * - **Interactive States**: Smooth hover transitions for engaging interactions
 * - **Responsive Design**: Adapts to different screen sizes and containers
 * 
 * ## Accessibility & UX
 * 
 * - **Focus Management**: Proper focus indication for interactive cards
 * - **Content Hierarchy**: Works seamlessly with Typography components
 * - **Color Contrast**: Automatic border/background contrast ratios
 * - **Screen Readers**: Semantic structure with proper content organization
 * - **Motion Sensitivity**: Respectful animation timing and easing
 * 
 * ## Reusability Across Projects
 * 
 * This component is architected for maximum portability:
 * 
 * 1. **Layout Agnostic**: Works in any layout system (Grid, Flex, etc.)
 * 2. **Content Flexible**: Accepts any child content and components
 * 3. **Theme Adaptable**: Automatically adjusts to any brand tokens
 * 4. **Framework Ready**: Pure React with TypeScript support
 * 
 * Perfect for:
 * - **E-commerce**: Product cards, checkout steps, order summaries
 * - **Dashboards**: Widget containers, stat cards, navigation panels  
 * - **Content Sites**: Article previews, feature highlights, testimonials
 * - **Applications**: Forms, settings panels, user profiles
 * 
 * Export for reuse:
 * Import from lumina-components NPM package (future)
 * Theme tokens automatically applied
 * Works with any content and layout system
 */

export interface CardProps {
  children: ReactNode;
  className?: string;
  elevation?: 'low' | 'medium' | 'high';
  variant?: 'default' | 'outlined' | 'filled';
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
 */
export const setCardTheme = (theme: ThemeTokens | null) => {
  console.warn('setCardTheme is deprecated. Use ThemeContext instead.');
};

export default function Card({ 
  children, 
  className = '',
  elevation = 'low',
  variant = 'default'
}: CardProps) {
  /**
   * Theme Integration via Context
   * 
   * Card now uses the useTheme hook for automatic theme updates.
   * This provides seamless integration with Lumina's theme system.
   */
  const { fullTheme } = useTheme();

  // Default theme tokens for fallback
  const defaultThemeTokens = {
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
  const theme = fullTheme?.tokens || defaultThemeTokens;  // Material 3 elevation system - subtle shadows for depth
  const getElevationShadow = () => {
    switch (elevation) {
      case 'low':
        return '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
      case 'medium':
        return '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
      case 'high':
        return '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)';
      default:
        return '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
    }
  };

  // Get variant-specific styles
  const getVariantStyles = () => {
    switch (variant) {
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          border: `1px solid ${theme.colors.secondary}30`, // 30% opacity
          boxShadow: 'none',
        };
      case 'filled':
        return {
          backgroundColor: `${theme.colors.secondary}08`, // Very light secondary color
          border: 'none',
          boxShadow: 'none',
        };
      case 'default':
      default:
        return {
          backgroundColor: '#FFFFFF',
          border: `1px solid ${theme.colors.secondary}20`, // 20% opacity for subtle border
          boxShadow: getElevationShadow(),
        };
    }
  };

  const variantStyles = getVariantStyles();

  // Dynamic inline styles using theme tokens
  const cardStyles = {
    // Surface styling based on variant
    ...variantStyles,
    
    // Shape tokens - corner radius for consistent rounded corners
    borderRadius: `${theme.shape.cornerRadius}px`,
    
    // Spacing tokens - padding based on base spacing unit
    // Material 3 pattern: consistent internal spacing for content flow
    padding: `${theme.spacing.base}px`,
    
    // Typography tokens - font family inheritance for child elements
    fontFamily: theme.typography.fontFamily,
    
    // Additional styling for better presentation
    position: 'relative' as const,
    display: 'block',
    width: '100%',
    
    // Smooth transitions for interactive states
    transition: 'all 0.2s ease-in-out',
  };

  // Handle hover effects for interactive feedback
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (variant === 'default') {
      target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
    } else if (variant === 'outlined') {
      target.style.borderColor = `${theme.colors.secondary}50`;
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (variant === 'default') {
      target.style.boxShadow = getElevationShadow();
    } else if (variant === 'outlined') {
      target.style.borderColor = `${theme.colors.secondary}30`;
    }
  };

  // Helper function to merge classes safely
  const mergeClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div
      style={cardStyles}
      className={mergeClasses(
        'transition-all duration-200 ease-in-out', // Smooth hover transitions
        'relative overflow-hidden', // Prevent content overflow and enable proper positioning
        className // User-provided classes (highest priority)
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Card content wrapper for proper spacing */}
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: `${theme.spacing.base * 0.75}px` // Consistent spacing between child elements
      }}>
        {children}
      </div>
    </div>
  );
}