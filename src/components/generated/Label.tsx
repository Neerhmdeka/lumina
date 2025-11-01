'use client';

import { ReactNode, forwardRef } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Label Component
 * 
 * A semantic label component that provides accessible form labeling
 * with consistent typography and spacing. Integrates with Lumina's
 * theme system for brand-consistent styling.
 * 
 * ## Design Features
 * 
 * - **Semantic HTML**: Uses proper label element for accessibility
 * - **Theme Integration**: Typography and colors from design tokens
 * - **Click Handling**: Automatically focuses associated form controls
 * - **Size Variants**: Multiple sizes for different use cases
 * - **Disabled States**: Visual indication for disabled form controls
 * 
 * ## Usage Examples
 * 
 * ### Basic Label
 * ```tsx
 * import { Label } from '@/components/generated';
 * 
 * <Label htmlFor="email">Email Address</Label>
 * <Input id="email" type="email" />
 * ```
 * 
 * ### With Size Variants
 * ```tsx
 * <Label size="sm">Small Label</Label>
 * <Label size="default">Default Label</Label>
 * <Label size="lg">Large Label</Label>
 * ```
 * 
 * ### Required Field Indicator
 * ```tsx
 * <Label htmlFor="password" required>
 *   Password
 * </Label>
 * ```
 */

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: ReactNode;
  htmlFor?: string;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  required?: boolean;
  disabled?: boolean;
}

const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    children,
    htmlFor,
    className = '',
    size = 'default',
    required = false,
    disabled = false,
    ...props
  }, ref) => {
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

    // Use theme tokens or fallback to default
    const theme = fullTheme?.tokens || defaultThemeTokens;

    // Size configurations
    const sizeConfig = {
      sm: {
        fontSize: '12px',
        lineHeight: '1.4',
        marginBottom: `${theme.spacing.base * 0.25}px`,
      },
      default: {
        fontSize: '14px',
        lineHeight: '1.5',
        marginBottom: `${theme.spacing.base * 0.375}px`,
      },
      lg: {
        fontSize: '16px',
        lineHeight: '1.5',
        marginBottom: `${theme.spacing.base * 0.5}px`,
      },
    };

    const currentSize = sizeConfig[size];

    // Calculate label styles based on theme tokens
    const labelStyles = {
      // Typography
      fontFamily: theme.typography.fontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      fontWeight: '500',
      
      // Colors
      color: disabled ? '#9ca3af' : theme.colors.tertiary,
      
      // Layout
      display: 'block',
      marginBottom: currentSize.marginBottom,
      
      // Interaction states
      cursor: disabled ? 'not-allowed' : htmlFor ? 'pointer' : 'default',
      opacity: disabled ? 0.6 : 1,
      
      // Transitions
      transition: 'color 0.2s ease-in-out',
    };

    // Required field indicator styles
    const requiredStyles = {
      color: '#ef4444', // Red color for required indicator
      marginLeft: '2px',
      fontSize: 'inherit',
    };

    // Merge classes safely
    const mergeClasses = (...classes: (string | undefined)[]) => {
      return classes.filter(Boolean).join(' ');
    };

    return (
      <label
        ref={ref}
        htmlFor={htmlFor}
        style={labelStyles}
        className={mergeClasses(
          'block text-sm font-medium leading-6',
          disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          className
        )}
        {...props}
      >
        {children}
        {required && (
          <span style={requiredStyles} aria-label="required">
            *
          </span>
        )}
      </label>
    );
  }
);

Label.displayName = 'Label';

export default Label;