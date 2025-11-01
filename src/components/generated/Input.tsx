'use client';

import { ReactNode, forwardRef } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Input Component
 * 
 * A flexible input field component that integrates with Lumina's theme system
 * and follows shadcn design principles. Supports all standard HTML input types
 * with consistent styling and accessibility features.
 * 
 * ## Design Features
 * 
 * - **Material 3 Inspired**: Clean borders, proper spacing, focus states
 * - **Type Flexible**: Supports text, email, password, number, etc.
 * - **Accessible**: Proper focus management and screen reader support
 * - **Themeable**: Uses design tokens for consistent branding
 * - **Responsive**: Adapts to different screen sizes and containers
 * 
 * ## Usage Examples
 * 
 * ### Basic Input
 * ```tsx
 * import { Input } from '@/components/generated';
 * 
 * <Input type="email" placeholder="Enter your email" />
 * ```
 * 
 * ### With Label
 * ```tsx
 * <div className="space-y-2">
 *   <Label htmlFor="email">Email Address</Label>
 *   <Input id="email" type="email" placeholder="you@example.com" />
 * </div>
 * ```
 * 
 * ### Controlled Input
 * ```tsx
 * const [value, setValue] = useState('');
 * 
 * <Input
 *   value={value}
 *   onChange={(e) => setValue(e.target.value)}
 *   placeholder="Type something..."
 * />
 * ```
 */

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  variant?: 'default' | 'filled';
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className = '',
    type = 'text',
    size = 'default',
    variant = 'default',
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
        padding: `${theme.spacing.base * 0.5}px ${theme.spacing.base * 0.75}px`,
        fontSize: '14px',
        lineHeight: '1.4',
      },
      default: {
        padding: `${theme.spacing.base * 0.625}px ${theme.spacing.base * 0.75}px`,
        fontSize: '14px',
        lineHeight: '1.5',
      },
      lg: {
        padding: `${theme.spacing.base * 0.75}px ${theme.spacing.base}px`,
        fontSize: '16px',
        lineHeight: '1.5',
      },
    };

    // Variant configurations
    const variantConfig = {
      default: {
        backgroundColor: '#ffffff',
        border: '1px solid #d1d5db',
        focusBorderColor: theme.colors.primary,
        focusRingColor: `${theme.colors.primary}20`,
      },
      filled: {
        backgroundColor: '#f9fafb',
        border: '1px solid transparent',
        focusBorderColor: theme.colors.primary,
        focusRingColor: `${theme.colors.primary}20`,
      },
    };

    const currentSize = sizeConfig[size];
    const currentVariant = variantConfig[variant];

    // Calculate input styles based on theme tokens
    const inputStyles = {
      // Typography
      fontFamily: theme.typography.fontFamily,
      fontSize: currentSize.fontSize,
      lineHeight: currentSize.lineHeight,
      
      // Layout and spacing
      width: '100%',
      padding: currentSize.padding,
      
      // Shape
      borderRadius: `${theme.shape.cornerRadius}px`,
      
      // Colors
      backgroundColor: disabled ? '#f3f4f6' : currentVariant.backgroundColor,
      border: disabled ? '1px solid #e5e7eb' : currentVariant.border,
      color: disabled ? '#9ca3af' : theme.colors.tertiary,
      
      // Interaction states
      cursor: disabled ? 'not-allowed' : 'text',
      opacity: disabled ? 0.6 : 1,
      
      // Transitions
      transition: 'all 0.2s ease-in-out',
      
      // Focus outline
      outline: 'none',
      
      // Placeholder styling
      '::placeholder': {
        color: '#9ca3af',
        opacity: 1,
      },
    };

    // Focus and interaction handlers
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        target.style.borderColor = currentVariant.focusBorderColor;
        target.style.boxShadow = `0 0 0 3px ${currentVariant.focusRingColor}`;
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        target.style.borderColor = currentVariant.border.split(' ')[2]; // Extract original border color
        target.style.boxShadow = 'none';
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        if (document.activeElement !== target) { // Don't override focus styles
          target.style.borderColor = '#9ca3af';
        }
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        if (document.activeElement !== target) { // Don't override focus styles
          target.style.borderColor = currentVariant.border.split(' ')[2];
        }
      }
    };

    // Merge classes safely
    const mergeClasses = (...classes: (string | undefined)[]) => {
      return classes.filter(Boolean).join(' ');
    };

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        style={inputStyles}
        className={mergeClasses(
          'block w-full rounded-md border font-medium',
          'placeholder:text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          disabled ? 'cursor-not-allowed opacity-50' : undefined,
          className
        )}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;