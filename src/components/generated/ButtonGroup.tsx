'use client';

import { ReactNode } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated ButtonGroup Component
 * 
 * A container component for grouping related buttons together with
 * seamless visual connections. Follows shadcn design patterns and
 * integrates with Lumina's theme system.
 * 
 * ## Design Features
 * 
 * - **Visual Grouping**: Buttons are visually connected with shared borders
 * - **Flexible Layout**: Horizontal and vertical orientations
 * - **Responsive**: Adapts to container width with wrap support
 * - **Theme Integration**: Uses design tokens for consistent styling
 * - **Nested Groups**: Support for nested button groups
 * 
 * ## Usage Examples
 * 
 * ### Basic Button Group
 * ```tsx
 * import { ButtonGroup, Button } from '@/components/generated';
 * 
 * <ButtonGroup>
 *   <Button variant="outline">Archive</Button>
 *   <Button variant="outline">Report</Button>
 *   <Button variant="outline">Delete</Button>
 * </ButtonGroup>
 * ```
 * 
 * ### Vertical Orientation
 * ```tsx
 * <ButtonGroup orientation="vertical">
 *   <Button variant="outline">Option 1</Button>
 *   <Button variant="outline">Option 2</Button>
 *   <Button variant="outline">Option 3</Button>
 * </ButtonGroup>
 * ```
 * 
 * ### Responsive Layout
 * ```tsx
 * <ButtonGroup className="flex-wrap">
 *   <Button variant="outline">Action 1</Button>
 *   <Button variant="outline">Action 2</Button>
 *   <Button variant="outline">Long Action Name</Button>
 * </ButtonGroup>
 * ```
 * 
 * ### Mixed with Other Elements
 * ```tsx
 * <ButtonGroup>
 *   <Button variant="outline">Save</Button>
 *   <DropdownMenu>
 *     <DropdownMenuTrigger asChild>
 *       <Button variant="outline" size="icon">
 *         <MoreHorizontalIcon />
 *       </Button>
 *     </DropdownMenuTrigger>
 *   </DropdownMenu>
 * </ButtonGroup>
 * ```
 */

export interface ButtonGroupProps {
  children: ReactNode;
  orientation?: 'horizontal' | 'vertical';
  className?: string;
  size?: 'sm' | 'default' | 'lg';
}

export default function ButtonGroup({ 
  children,
  orientation = 'horizontal',
  className = '',
  size = 'default',
}: ButtonGroupProps) {
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
      gap: '1px',
    },
    default: {
      gap: '1px',
    },
    lg: {
      gap: '1px',
    },
  };

  const currentSize = sizeConfig[size];

  // Base container styles
  const containerStyles = {
    display: 'inline-flex',
    flexDirection: orientation === 'vertical' ? 'column' as const : 'row' as const,
    borderRadius: `${theme.shape.cornerRadius}px`,
    overflow: 'hidden',
    // Create a subtle border around the entire group
    border: '1px solid #e5e7eb',
    backgroundColor: '#ffffff',
    fontFamily: theme.typography.fontFamily,
  };

  // Custom CSS to handle button group styling
  const buttonGroupCSS = `
    .button-group > * {
      border-radius: 0 !important;
      border-left: none !important;
      border-right: none !important;
      position: relative;
      z-index: 1;
    }

    .button-group > *:first-child {
      border-left: 1px solid transparent !important;
      ${orientation === 'horizontal' 
        ? `border-top-left-radius: ${theme.shape.cornerRadius}px !important; border-bottom-left-radius: ${theme.shape.cornerRadius}px !important;`
        : `border-top-left-radius: ${theme.shape.cornerRadius}px !important; border-top-right-radius: ${theme.shape.cornerRadius}px !important;`
      }
    }

    .button-group > *:last-child {
      border-right: 1px solid transparent !important;
      ${orientation === 'horizontal'
        ? `border-top-right-radius: ${theme.shape.cornerRadius}px !important; border-bottom-right-radius: ${theme.shape.cornerRadius}px !important;`
        : `border-bottom-left-radius: ${theme.shape.cornerRadius}px !important; border-bottom-right-radius: ${theme.shape.cornerRadius}px !important;`
      }
    }

    ${orientation === 'vertical' ? `
      .button-group > * {
        border-top: none !important;
        border-bottom: none !important;
      }

      .button-group > *:first-child {
        border-top: 1px solid transparent !important;
      }

      .button-group > *:last-child {
        border-bottom: 1px solid transparent !important;
      }
    ` : ''}

    /* Hover and focus states */
    .button-group > *:hover,
    .button-group > *:focus {
      z-index: 2;
    }

    /* Active state */
    .button-group > *:active {
      z-index: 3;
    }

    /* Ensure buttons don't have individual shadows that interfere with grouping */
    .button-group > * {
      box-shadow: none !important;
    }

    /* Special handling for focus rings */
    .button-group > *:focus {
      box-shadow: 0 0 0 2px ${theme.colors.primary}40 !important;
      border-color: ${theme.colors.primary} !important;
    }
  `;

  // Merge classes safely
  const mergeClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <>
      {/* Inject custom CSS for button group styling */}
      <style dangerouslySetInnerHTML={{ __html: buttonGroupCSS }} />
      
      <div
        role="group"
        style={containerStyles}
        className={mergeClasses(
          'button-group inline-flex',
          orientation === 'vertical' ? 'flex-col' : 'flex-row',
          className
        )}
      >
        {children}
      </div>
    </>
  );
}

// Alternative approach using CSS-in-JS for individual button styling
export function useButtonGroupStyles() {
  const { fullTheme } = useTheme();

  const defaultThemeTokens = {
    shape: {
      cornerRadius: 6,
    },
  };

  const theme = fullTheme?.tokens || defaultThemeTokens;

  return {
    getButtonStyles: (position: 'first' | 'middle' | 'last', orientation: 'horizontal' | 'vertical' = 'horizontal') => {
      const baseStyles = {
        borderRadius: '0',
        marginLeft: '0',
        marginRight: '0',
        position: 'relative' as const,
        zIndex: 1,
      };

      if (orientation === 'horizontal') {
        if (position === 'first') {
          return {
            ...baseStyles,
            borderTopLeftRadius: `${theme.shape.cornerRadius}px`,
            borderBottomLeftRadius: `${theme.shape.cornerRadius}px`,
          };
        } else if (position === 'last') {
          return {
            ...baseStyles,
            borderTopRightRadius: `${theme.shape.cornerRadius}px`,
            borderBottomRightRadius: `${theme.shape.cornerRadius}px`,
          };
        }
      } else {
        if (position === 'first') {
          return {
            ...baseStyles,
            borderTopLeftRadius: `${theme.shape.cornerRadius}px`,
            borderTopRightRadius: `${theme.shape.cornerRadius}px`,
          };
        } else if (position === 'last') {
          return {
            ...baseStyles,
            borderBottomLeftRadius: `${theme.shape.cornerRadius}px`,
            borderBottomRightRadius: `${theme.shape.cornerRadius}px`,
          };
        }
      }

      return baseStyles;
    },
  };
}