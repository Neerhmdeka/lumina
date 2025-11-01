'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '../../lib/themeContext';
/**
 * Legacy Theme Setter (Maintained for Backward Compatibility)
 *
 * This function is maintained for backward compatibility with existing code
 * that may still use the global theme setter pattern. The component now
 * primarily uses ThemeContext for automatic updates.
 */
export const setButtonTheme = (theme) => {
    // This function is now a no-op since we use ThemeContext
    // Kept for backward compatibility
    console.warn('setButtonTheme is deprecated. Use ThemeContext instead.');
};
export default function Button({ children, className = '', onClick, disabled = false, variant = 'primary' }) {
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
    const { theme } = useTheme();
    // Theme should never be null due to defaultThemeTokens fallback in context
    if (!theme) {
        throw new Error('Theme context not available. Ensure Button is wrapped in ThemeProvider.');
    }
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
    const buttonStyles = Object.assign(Object.assign({}, variantStyles), { 
        // Typography tokens - consistent font family
        fontFamily: theme.typography.fontFamily, 
        // Shape tokens - corner radius for consistent rounded corners
        borderRadius: `${theme.shape.cornerRadius}px`, 
        // Spacing tokens - padding based on base spacing unit
        // Material 3 pattern: more horizontal padding than vertical
        padding: `${theme.spacing.base * 0.75}px ${theme.spacing.base * 1.5}px`, 
        // Additional styling for better UX
        cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.6 : 1, transition: 'all 0.2s ease-in-out', fontWeight: '500', fontSize: '14px', lineHeight: '1.5', 
        // Focus and interaction states
        outline: 'none' });
    // Handle hover and focus styles with CSS-in-JS approach
    const handleMouseEnter = (e) => {
        if (!disabled) {
            const target = e.target;
            if (variant === 'outline') {
                target.style.backgroundColor = theme.colors.primary + '10'; // Add transparency
            }
            else {
                target.style.filter = 'brightness(0.9)';
            }
        }
    };
    const handleMouseLeave = (e) => {
        if (!disabled) {
            const target = e.target;
            if (variant === 'outline') {
                target.style.backgroundColor = 'transparent';
            }
            else {
                target.style.filter = 'none';
            }
        }
    };
    const handleFocus = (e) => {
        const target = e.target;
        target.style.boxShadow = `0 0 0 2px ${theme.colors.primary}40`; // Add focus ring
    };
    const handleBlur = (e) => {
        const target = e.target;
        target.style.boxShadow = 'none';
    };
    // Helper function to merge classes safely
    const mergeClasses = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };
    return (_jsx("button", { style: buttonStyles, className: mergeClasses('inline-flex items-center justify-center', // Base classes
        'font-medium transition-all duration-200 ease-in-out', // Animation and typography
        'focus:outline-none focus:ring-2 focus:ring-offset-2', // Focus states
        disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer', // Disabled state
        className // User-provided classes (highest priority)
        ), onClick: onClick, disabled: disabled, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, onFocus: handleFocus, onBlur: handleBlur, children: children }));
}
