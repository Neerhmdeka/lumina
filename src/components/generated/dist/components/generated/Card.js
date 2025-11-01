'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '../../lib/themeContext';
/**
 * Legacy Theme Setter (Maintained for Backward Compatibility)
 */
export const setCardTheme = (theme) => {
    console.warn('setCardTheme is deprecated. Use ThemeContext instead.');
};
export default function Card({ children, className = '', elevation = 'low', variant = 'default' }) {
    /**
     * Theme Integration via Context
     *
     * Card component uses useTheme hook for automatic theme updates.
     * Provides real-time visual feedback when theme tokens change.
     */
    const { theme } = useTheme();
    // Theme should never be null due to defaultThemeTokens fallback in context
    if (!theme) {
        throw new Error('Theme context not available. Ensure Card is wrapped in ThemeProvider.');
    }
    // Material 3 elevation system - subtle shadows for depth
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
    const cardStyles = Object.assign(Object.assign({}, variantStyles), { 
        // Shape tokens - corner radius for consistent rounded corners
        borderRadius: `${theme.shape.cornerRadius}px`, 
        // Spacing tokens - padding based on base spacing unit
        // Material 3 pattern: consistent internal spacing for content flow
        padding: `${theme.spacing.base}px`, 
        // Typography tokens - font family inheritance for child elements
        fontFamily: theme.typography.fontFamily, 
        // Additional styling for better presentation
        position: 'relative', display: 'block', width: '100%', 
        // Smooth transitions for interactive states
        transition: 'all 0.2s ease-in-out' });
    // Handle hover effects for interactive feedback
    const handleMouseEnter = (e) => {
        const target = e.target;
        if (variant === 'default') {
            target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)';
        }
        else if (variant === 'outlined') {
            target.style.borderColor = `${theme.colors.secondary}50`;
        }
    };
    const handleMouseLeave = (e) => {
        const target = e.target;
        if (variant === 'default') {
            target.style.boxShadow = getElevationShadow();
        }
        else if (variant === 'outlined') {
            target.style.borderColor = `${theme.colors.secondary}30`;
        }
    };
    // Helper function to merge classes safely
    const mergeClasses = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };
    return (_jsx("div", { style: cardStyles, className: mergeClasses('transition-all duration-200 ease-in-out', // Smooth hover transitions
        'relative overflow-hidden', // Prevent content overflow and enable proper positioning
        className // User-provided classes (highest priority)
        ), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, children: _jsx("div", { style: {
                display: 'flex',
                flexDirection: 'column',
                gap: `${theme.spacing.base * 0.75}px` // Consistent spacing between child elements
            }, children: children }) }));
}
