'use client';

import { ReactNode, forwardRef, useState } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Avatar Component
 * 
 * A flexible avatar component for displaying user profiles, with support for
 * images, initials, and fallback states. Integrates with Lumina's theme system
 * for consistent sizing and styling across your application.
 * 
 * ## Design Features
 * 
 * - **Multiple Sizes**: xs, sm, md, lg, xl variants
 * - **Fallback System**: Image → Initials → Default icon
 * - **Accessible**: Proper alt text and ARIA attributes
 * - **Theme Integration**: Uses design tokens for colors and spacing
 * - **Status Indicators**: Optional online/offline status badges
 * 
 * ## Usage Examples
 * 
 * ### Image Avatar
 * ```tsx
 * import { Avatar } from '@/components/generated';
 * 
 * <Avatar
 *   src="/user-photo.jpg"
 *   alt="John Doe"
 *   fallback="JD"
 * />
 * ```
 * 
 * ### Initials Avatar
 * ```tsx
 * <Avatar fallback="AB" size="lg" />
 * ```
 * 
 * ### With Status
 * ```tsx
 * <Avatar
 *   src="/user.jpg"
 *   alt="User"
 *   status="online"
 *   size="md"
 * />
 * ```
 */

export interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  status?: 'online' | 'offline' | 'busy' | 'away';
  onClick?: () => void;
}

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ 
    src,
    alt = '',
    fallback,
    size = 'md',
    className = '',
    status,
    onClick,
    ...props
  }, ref) => {
    const { fullTheme } = useTheme();
    const [imageError, setImageError] = useState(false);

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
      xs: {
        size: 24,
        fontSize: '10px',
        statusSize: 6,
        statusOffset: -2,
      },
      sm: {
        size: 32,
        fontSize: '12px',
        statusSize: 8,
        statusOffset: -2,
      },
      md: {
        size: 40,
        fontSize: '14px',
        statusSize: 10,
        statusOffset: -2,
      },
      lg: {
        size: 48,
        fontSize: '16px',
        statusSize: 12,
        statusOffset: -3,
      },
      xl: {
        size: 56,
        fontSize: '18px',
        statusSize: 14,
        statusOffset: -3,
      },
    };

    const currentSize = sizeConfig[size];

    // Status color configurations
    const statusColors = {
      online: '#22c55e',   // Green
      offline: '#9ca3af',  // Gray
      busy: '#ef4444',     // Red
      away: '#f59e0b',     // Yellow
    };

    // Calculate avatar container styles
    const avatarStyles = {
      width: `${currentSize.size}px`,
      height: `${currentSize.size}px`,
      borderRadius: '50%',
      backgroundColor: theme.colors.secondary,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative' as const,
      cursor: onClick ? 'pointer' : 'default',
      transition: 'all 0.2s ease-in-out',
      
      // Focus styles for interactive avatars
      outline: 'none',
    };

    // Image styles
    const imageStyles = {
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
      borderRadius: '50%',
    };

    // Fallback text styles
    const fallbackStyles = {
      fontFamily: theme.typography.fontFamily,
      fontSize: currentSize.fontSize,
      fontWeight: '600',
      color: theme.colors.onSecondary || '#ffffff',
      userSelect: 'none' as const,
      textTransform: 'uppercase' as const,
    };

    // Status indicator styles
    const statusStyles = status ? {
      position: 'absolute' as const,
      bottom: currentSize.statusOffset,
      right: currentSize.statusOffset,
      width: `${currentSize.statusSize}px`,
      height: `${currentSize.statusSize}px`,
      borderRadius: '50%',
      backgroundColor: statusColors[status],
      border: '2px solid #ffffff',
      boxSizing: 'border-box' as const,
    } : undefined;

    // Default user icon for when no image or initials
    const defaultIcon = (
      <svg 
        width={currentSize.size * 0.6} 
        height={currentSize.size * 0.6} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2"
        color={theme.colors.onSecondary || '#ffffff'}
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
      </svg>
    );

    // Handle image loading error
    const handleImageError = () => {
      setImageError(true);
    };

    // Handle click
    const handleClick = () => {
      if (onClick) {
        onClick();
      }
    };

    // Handle focus and hover for interactive avatars
    const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
      if (onClick) {
        const target = e.target as HTMLDivElement;
        target.style.boxShadow = `0 0 0 2px ${theme.colors.primary}40`;
      }
    };

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      if (onClick) {
        const target = e.target as HTMLDivElement;
        target.style.boxShadow = 'none';
      }
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        const target = e.target as HTMLDivElement;
        target.style.transform = 'scale(1.05)';
        target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
      if (onClick) {
        const target = e.target as HTMLDivElement;
        target.style.transform = 'scale(1)';
        target.style.boxShadow = 'none';
      }
    };

    // Determine what to render inside the avatar
    const renderAvatarContent = () => {
      // Try to render image first
      if (src && !imageError) {
        return (
          <img
            src={src}
            alt={alt}
            style={imageStyles}
            onError={handleImageError}
          />
        );
      }

      // Render initials if provided
      if (fallback) {
        return (
          <span style={fallbackStyles}>
            {fallback.slice(0, 2)}
          </span>
        );
      }

      // Render default icon
      return defaultIcon;
    };

    // Merge classes safely
    const mergeClasses = (...classes: (string | undefined)[]) => {
      return classes.filter(Boolean).join(' ');
    };

    return (
      <div
        ref={ref}
        style={avatarStyles}
        className={mergeClasses(
          'flex items-center justify-center rounded-full overflow-hidden',
          onClick && 'cursor-pointer focus:outline-none',
          className
        )}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={onClick ? 0 : undefined}
        role={onClick ? 'button' : undefined}
        aria-label={alt || 'Avatar'}
        {...props}
      >
        {renderAvatarContent()}
        
        {/* Status indicator */}
        {status && statusStyles && (
          <div style={statusStyles} aria-label={`Status: ${status}`} />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export default Avatar;