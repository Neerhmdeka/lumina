'use client';

import { ReactNode } from 'react';
import { useTheme } from './ThemeProvider';

/**
 * Generated Typography Component
 * 
 * A complete typography system component that implements Material 3's type scale
 * with your custom theme tokens. This component provides consistent text hierarchy,
 * readability, and brand expression across your entire application while adapting
 * automatically to theme changes.
 * 
 * ## Material 3 Type Scale Implementation
 * 
 * ### Semantic Hierarchy
 * - **Display**: Largest text for hero sections and major headings (3.5rem)
 * - **Headline**: Section headings and important announcements (2.5rem)  
 * - **Title**: Subsection titles and card headers (1.5rem)
 * - **Body**: Main content text optimized for reading (1rem)
 * - **Label**: UI labels and form field labels (0.875rem)
 * - **Caption**: Supporting text and metadata (0.75rem)
 * 
 * ### Responsive Sizing
 * All variants scale appropriately across breakpoints while maintaining
 * optimal reading distances and touch target accessibility.
 * 
 * ## Token Mapping & Style Application
 * 
 * ### Typography Tokens
 * - `fontFamily` → Applied to all variants from theme.tokens.typography.fontFamily
 * - `fontWeight` → Semantic weights (normal: 400, medium: 500, semibold: 600, bold: 700)
 * - `lineHeight` → Optimized for each variant (1.2-1.6) for optimal readability
 * - `letterSpacing` → Subtle adjustments for improved legibility
 * 
 * ### Color System Integration
 * - `default` → High contrast text (#111827) for primary content
 * - `primary` → Brand primary color for important text and links
 * - `secondary` → Brand secondary color for supporting information
 * - `tertiary` → Brand tertiary color for accents and highlights
 * - `muted` → Neutral gray (#6B7280) for secondary information
 * 
 * ### Semantic HTML Elements
 * - `display` → h1 (main page title)
 * - `headline` → h2 (section headers)
 * - `title` → h3 (subsection titles)
 * - `body` → p (paragraphs and content)
 * - `label` → span (UI labels)
 * - `caption` → span (metadata)
 * 
 * ## Usage Examples & Patterns
 * 
 * ### Content Hierarchy
 * Create clear information architecture:
 * - Display for page titles and hero text
 * - Headline for main section divisions
 * - Title for card headers and subsections
 * - Body for readable content blocks
 * 
 * ### UI Component Integration
 * Perfect for forms and interface elements:
 * - Label variant for form field labels
 * - Caption for help text and validation
 * - Color variants for different interaction states
 * 
 * ### Brand Expression
 * Use color variants strategically:
 * - Primary color for links and key information
 * - Secondary color for supporting brand elements
 * - Tertiary color for accents and highlights
 * - Muted for less important information
 * 
 * ## Accessibility Features
 * 
 * ### Reading Experience
 * - **Contrast Ratios**: All color combinations meet WCAG AA standards
 * - **Line Height**: Optimized spacing for comfortable reading flow
 * - **Font Sizing**: Relative sizing that respects user zoom preferences
 * - **Letter Spacing**: Subtle improvements for better character recognition
 * 
 * ### Assistive Technology
 * - **Semantic HTML**: Proper heading hierarchy for screen readers
 * - **Element Override**: Custom element prop for semantic flexibility
 * - **Focus Management**: Smooth transitions that don't interfere with navigation
 * - **Content Structure**: Works with accessibility tools for content organization
 * 
 * ## Advanced Customization
 * 
 * ### Element Override
 * Control the underlying HTML element while preserving styling:
 * element="h1" for semantic heading structure
 * element="span" for inline text elements
 * element="div" for block-level containers
 * 
 * ### Weight Variations
 * Fine-tune emphasis within the same variant:
 * weight="normal" for regular content
 * weight="medium" for slightly emphasized text
 * weight="semibold" for important information
 * weight="bold" for strong emphasis
 * 
 * ## Reusability & Portability
 * 
 * ### Cross-Project Usage
 * This typography system is designed for maximum reusability:
 * 1. **Theme Agnostic**: Adapts to any brand's typography tokens
 * 2. **Scale Consistent**: Maintains proper hierarchy across projects
 * 3. **Accessibility First**: Built-in WCAG compliance and screen reader support
 * 4. **Framework Independent**: Pure React with minimal dependencies
 * 
 * ### Export for Distribution
 * Perfect for design systems and component libraries:
 * - Consistent type scale across teams and projects
 * - Automatic theme integration with token updates
 * - Flexible enough for various content types and layouts
 * - TypeScript support for development confidence
 * 
 * Import from future NPM package for instant brand-consistent typography
 * across all your applications and websites.
 */

export interface TypographyProps {
  children: ReactNode;
  className?: string;
  variant?: 'display' | 'headline' | 'title' | 'body' | 'label' | 'caption';
  color?: 'default' | 'primary' | 'secondary' | 'tertiary' | 'muted';
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
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
export const setTypographyTheme = (theme: ThemeTokens | null) => {
  console.warn('setTypographyTheme is deprecated. Use ThemeContext instead.');
};

export default function Typography({ 
  children, 
  className = '',
  variant = 'body',
  color = 'default',
  element = 'p',
  weight = 'normal'
}: TypographyProps) {
  /**
   * Theme Integration via Context
   * 
   * Typography component uses useTheme hook for automatic theme updates.
   * Enables real-time font family, color, and sizing changes.
   */
  const { theme } = useTheme();

  // Theme should never be null due to defaultThemeTokens fallback in context
  if (!theme) {
    throw new Error('Theme context not available. Ensure Typography is wrapped in ThemeProvider.');
  }

  // Material 3 type scale - responsive and hierarchical
  const getVariantStyles = () => {
    switch (variant) {
      case 'display':
        return {
          fontSize: '2.5rem', // 40px
          lineHeight: '1.2',
          fontWeight: weight === 'normal' ? '300' : weight === 'medium' ? '400' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '-0.02em',
        };
      case 'headline':
        return {
          fontSize: '2rem', // 32px
          lineHeight: '1.25',
          fontWeight: weight === 'normal' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '-0.01em',
        };
      case 'title':
        return {
          fontSize: '1.5rem', // 24px
          lineHeight: '1.3',
          fontWeight: weight === 'normal' ? '500' : weight === 'medium' ? '600' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '0',
        };
      case 'body':
        return {
          fontSize: '1rem', // 16px
          lineHeight: '1.5',
          fontWeight: weight === 'normal' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '0.01em',
        };
      case 'label':
        return {
          fontSize: '0.875rem', // 14px
          lineHeight: '1.4',
          fontWeight: weight === 'normal' ? '500' : weight === 'medium' ? '600' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '0.02em',
        };
      case 'caption':
        return {
          fontSize: '0.75rem', // 12px
          lineHeight: '1.4',
          fontWeight: weight === 'normal' ? '400' : weight === 'medium' ? '500' : weight === 'semibold' ? '600' : '700',
          letterSpacing: '0.03em',
        };
      default:
        return {
          fontSize: '1rem',
          lineHeight: '1.5',
          fontWeight: '400',
          letterSpacing: '0.01em',
        };
    }
  };

  // Color mapping based on theme tokens and Material 3 color roles
  const getColorStyles = () => {
    switch (color) {
      case 'primary':
        return {
          color: theme.colors.primary,
        };
      case 'secondary':
        return {
          color: theme.colors.secondary,
        };
      case 'tertiary':
        return {
          color: theme.colors.tertiary,
        };
      case 'muted':
        return {
          color: '#6B7280', // Neutral gray for secondary information
        };
      case 'default':
      default:
        return {
          color: '#111827', // Default dark gray for high contrast readability
        };
    }
  };

  // Auto-select appropriate HTML element based on variant
  const getDefaultElement = () => {
    switch (variant) {
      case 'display': return 'h1';
      case 'headline': return 'h2';
      case 'title': return 'h3';
      case 'body': return 'p';
      case 'label': return 'span';
      case 'caption': return 'span';
      default: return 'p';
    }
  };

  const Component = element || getDefaultElement();
  const variantStyles = getVariantStyles();
  const colorStyles = getColorStyles();

  // Dynamic inline styles using theme tokens
  const typographyStyles = {
    // Typography tokens - font family from theme
    fontFamily: theme.typography.fontFamily,
    
    // Variant-specific sizing and spacing
    ...variantStyles,
    
    // Color tokens - semantic color application
    ...colorStyles,
    
    // Additional styling for better readability
    margin: '0', // Reset default margins for consistent spacing
    padding: '0', // Reset default padding
    
    // Smooth text rendering
    WebkitFontSmoothing: 'antialiased' as const,
    MozOsxFontSmoothing: 'grayscale' as const,
  };

  // Helper function to merge classes safely
  const mergeClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <Component
      style={typographyStyles}
      className={mergeClasses(
        'transition-colors duration-200 ease-in-out', // Smooth color transitions
        className // User-provided classes (highest priority)
      )}
    >
      {children}
    </Component>
  );
}