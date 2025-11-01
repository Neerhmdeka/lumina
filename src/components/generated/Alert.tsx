'use client';

import { ReactNode } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Alert Component
 * 
 * A versatile alert component for displaying important messages, notifications,
 * and status updates. Follows Material Design principles with customizable
 * variants and integrates seamlessly with Lumina's theme system.
 * 
 * ## Design Features
 * 
 * - **Multiple Variants**: Success, warning, error, and info states
 * - **Icon Support**: Optional icons for better visual communication
 * - **Dismissible**: Optional close button for user interaction
 * - **Accessible**: Proper ARIA attributes and keyboard navigation
 * - **Theme Integrated**: Uses design tokens for consistent styling
 * 
 * ## Usage Examples
 * 
 * ### Basic Alerts
 * ```tsx
 * import { Alert } from '@/components/generated';
 * 
 * <Alert variant="info">
 *   Your profile has been updated successfully.
 * </Alert>
 * 
 * <Alert variant="warning">
 *   Please verify your email address.
 * </Alert>
 * 
 * <Alert variant="error">
 *   Failed to save changes. Please try again.
 * </Alert>
 * ```
 * 
 * ### With Title and Description
 * ```tsx
 * <Alert variant="success">
 *   <AlertTitle>Success!</AlertTitle>
 *   <AlertDescription>
 *     Your changes have been saved successfully.
 *   </AlertDescription>
 * </Alert>
 * ```
 * 
 * ### Dismissible Alert
 * ```tsx
 * <Alert variant="info" dismissible onDismiss={() => setShowAlert(false)}>
 *   This is an important announcement.
 * </Alert>
 * ```
 */

export interface AlertProps {
  children: ReactNode;
  variant?: 'default' | 'info' | 'success' | 'warning' | 'error';
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  icon?: ReactNode;
}

export interface AlertTitleProps {
  children: ReactNode;
  className?: string;
}

export interface AlertDescriptionProps {
  children: ReactNode;
  className?: string;
}

// Main Alert Component
export default function Alert({ 
  children,
  variant = 'default',
  className = '',
  dismissible = false,
  onDismiss,
  icon,
}: AlertProps) {
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

  // Variant configurations with semantic colors
  const variantConfig = {
    default: {
      backgroundColor: '#f8fafc',
      borderColor: '#e2e8f0',
      textColor: theme.colors.tertiary,
      iconColor: theme.colors.secondary,
    },
    info: {
      backgroundColor: '#eff6ff',
      borderColor: '#bfdbfe',
      textColor: '#1e40af',
      iconColor: '#3b82f6',
    },
    success: {
      backgroundColor: '#f0fdf4',
      borderColor: '#bbf7d0',
      textColor: '#166534',
      iconColor: '#22c55e',
    },
    warning: {
      backgroundColor: '#fffbeb',
      borderColor: '#fed7aa',
      textColor: '#92400e',
      iconColor: '#f59e0b',
    },
    error: {
      backgroundColor: '#fef2f2',
      borderColor: '#fecaca',
      textColor: '#991b1b',
      iconColor: '#ef4444',
    },
  };

  const currentVariant = variantConfig[variant];

  // Default icons for each variant
  const defaultIcons = {
    default: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    info: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="16" x2="12" y2="12"/>
        <line x1="12" y1="8" x2="12.01" y2="8"/>
      </svg>
    ),
    success: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m9 12 2 2 4-4"/>
        <circle cx="12" cy="12" r="10"/>
      </svg>
    ),
    warning: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/>
        <line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    ),
    error: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10"/>
        <line x1="15" y1="9" x2="9" y2="15"/>
        <line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
    ),
  };

  // Calculate alert styles
  const alertStyles = {
    // Typography
    fontFamily: theme.typography.fontFamily,
    
    // Layout
    padding: `${theme.spacing.base}px`,
    borderRadius: `${theme.shape.cornerRadius}px`,
    border: `1px solid ${currentVariant.borderColor}`,
    
    // Colors
    backgroundColor: currentVariant.backgroundColor,
    color: currentVariant.textColor,
    
    // Display
    display: 'flex',
    alignItems: 'flex-start',
    gap: `${theme.spacing.base * 0.75}px`,
    
    // Position for relative positioning of dismiss button
    position: 'relative' as const,
  };

  // Icon container styles
  const iconStyles = {
    color: currentVariant.iconColor,
    flexShrink: 0,
    marginTop: '2px', // Slight adjustment for better alignment
  };

  // Dismiss button styles
  const dismissButtonStyles = {
    position: 'absolute' as const,
    top: `${theme.spacing.base * 0.75}px`,
    right: `${theme.spacing.base * 0.75}px`,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: currentVariant.textColor,
    opacity: 0.7,
    padding: '4px',
    borderRadius: '4px',
    transition: 'opacity 0.2s ease-in-out',
    
    // Focus styles
    outline: 'none',
  };

  // Handle dismiss button interactions
  const handleDismissMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.opacity = '1';
    target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
  };

  const handleDismissMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.opacity = '0.7';
    target.style.backgroundColor = 'transparent';
  };

  const handleDismissFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = `0 0 0 2px ${currentVariant.iconColor}40`;
  };

  const handleDismissBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.style.boxShadow = 'none';
  };

  // Merge classes safely
  const mergeClasses = (...classes: (string | undefined)[]) => {
    return classes.filter(Boolean).join(' ');
  };

  return (
    <div
      role="alert"
      style={alertStyles}
      className={mergeClasses(
        'relative border rounded-md',
        className
      )}
    >
      {/* Icon */}
      <div style={iconStyles}>
        {icon || defaultIcons[variant]}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        {children}
      </div>
      
      {/* Dismiss button */}
      {dismissible && onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          style={dismissButtonStyles}
          onMouseEnter={handleDismissMouseEnter}
          onMouseLeave={handleDismissMouseLeave}
          onFocus={handleDismissFocus}
          onBlur={handleDismissBlur}
          aria-label="Dismiss alert"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      )}
    </div>
  );
}

// Alert Title Component
export function AlertTitle({ children, className = '' }: AlertTitleProps) {
  const { fullTheme } = useTheme();

  const defaultThemeTokens = {
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  };

  const theme = fullTheme?.tokens || defaultThemeTokens;

  const titleStyles = {
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '1.4',
    marginBottom: '4px',
  };

  return (
    <div 
      style={titleStyles}
      className={`font-semibold ${className}`}
    >
      {children}
    </div>
  );
}

// Alert Description Component
export function AlertDescription({ children, className = '' }: AlertDescriptionProps) {
  const { fullTheme } = useTheme();

  const defaultThemeTokens = {
    typography: {
      fontFamily: 'Inter, system-ui, sans-serif',
    },
  };

  const theme = fullTheme?.tokens || defaultThemeTokens;

  const descriptionStyles = {
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    lineHeight: '1.5',
    opacity: 0.9,
  };

  return (
    <div 
      style={descriptionStyles}
      className={`text-sm ${className}`}
    >
      {children}
    </div>
  );
}