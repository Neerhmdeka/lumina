'use client';

import { ReactNode, forwardRef } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Checkbox Component
 * 
 * A fully customizable checkbox component that follows shadcn design principles
 * while integrating seamlessly with Lumina's theme system. Built for accessibility,
 * keyboard navigation, and consistent visual design.
 * 
 * ## Design Features
 * 
 * - **Material 3 Inspired**: Uses primary color roles and proper contrast ratios
 * - **Accessible**: Full keyboard navigation and screen reader support
 * - **Animated**: Smooth transitions for check state changes
 * - **Customizable**: Integrates with theme tokens for consistent branding
 * - **Shadcn Compatible**: Same API and behavior as shadcn/ui checkbox
 * 
 * ## Usage Examples
 * 
 * ### Basic Usage
 * ```tsx
 * import { Checkbox } from '@/components/generated';
 * 
 * <Checkbox id="terms" />
 * <Label htmlFor="terms">Accept terms</Label>
 * ```
 * 
 * ### Controlled Component
 * ```tsx
 * const [checked, setChecked] = useState(false);
 * 
 * <Checkbox
 *   id="notifications"
 *   checked={checked}
 *   onCheckedChange={setChecked}
 * />
 * ```
 * 
 * ### Disabled State
 * ```tsx
 * <Checkbox id="disabled" disabled />
 * ```
 */

export interface CheckboxProps {
  id?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  className?: string;
  onCheckedChange?: (checked: boolean) => void;
  children?: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ 
    id,
    checked,
    defaultChecked = false,
    disabled = false,
    required = false,
    name,
    value,
    className = '',
    onCheckedChange,
    children,
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

    // Handle checkbox change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled && onCheckedChange) {
        onCheckedChange(event.target.checked);
      }
    };

    // Calculate checkbox styles based on theme
    const checkboxStyles = {
      // Size and spacing
      width: '18px',
      height: '18px',
      
      // Shape - use theme corner radius but smaller for checkbox
      borderRadius: `${Math.min(theme.shape.cornerRadius, 4)}px`,
      
      // Colors - responsive to checked state
      border: checked 
        ? `2px solid ${theme.colors.primary}`
        : `2px solid ${disabled ? '#d1d5db' : '#9ca3af'}`,
      backgroundColor: checked 
        ? theme.colors.primary 
        : 'transparent',
      
      // Typography
      fontFamily: theme.typography.fontFamily,
      
      // Interaction states
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      
      // Transitions for smooth interactions
      transition: 'all 0.2s ease-in-out',
      
      // Position for custom styling
      position: 'relative' as const,
      
      // Remove default appearance
      appearance: 'none' as const,
      WebkitAppearance: 'none' as const,
      
      // Focus outline
      outline: 'none',
    };

    // Check mark styles
    const checkMarkStyles = {
      position: 'absolute' as const,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: theme.colors.onPrimary || '#ffffff',
      fontSize: '12px',
      fontWeight: 'bold',
      opacity: checked ? 1 : 0,
      transition: 'opacity 0.15s ease-in-out',
      pointerEvents: 'none' as const,
    };

    // Focus and hover styles (applied via CSS-in-JS events)
    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      target.style.boxShadow = `0 0 0 2px ${theme.colors.primary}40`;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      target.style.boxShadow = 'none';
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        if (!checked) {
          target.style.borderColor = theme.colors.primary;
          target.style.backgroundColor = `${theme.colors.primary}10`;
        }
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        const target = e.target as HTMLInputElement;
        if (!checked) {
          target.style.borderColor = '#9ca3af';
          target.style.backgroundColor = 'transparent';
        }
      }
    };

    // Merge classes safely
    const mergeClasses = (...classes: (string | undefined)[]) => {
      return classes.filter(Boolean).join(' ');
    };

    return (
      <div className="inline-flex items-center">
        <div className="relative">
          <input
            ref={ref}
            type="checkbox"
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            required={required}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={checkboxStyles}
            className={mergeClasses(
              'flex items-center justify-center',
              'focus:outline-none',
              className
            )}
            {...props}
          />
          {/* Custom checkmark */}
          <div style={checkMarkStyles}>
            ✓
          </div>
        </div>
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;