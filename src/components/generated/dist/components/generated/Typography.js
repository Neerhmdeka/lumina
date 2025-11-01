'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { useTheme } from '../../lib/themeContext';
/**
 * Legacy Theme Setter (Maintained for Backward Compatibility)
 */
export const setTypographyTheme = (theme) => {
    console.warn('setTypographyTheme is deprecated. Use ThemeContext instead.');
};
export default function Typography({ children, className = '', variant = 'body', color = 'default', element = 'p', weight = 'normal' }) {
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
    const typographyStyles = Object.assign(Object.assign(Object.assign({ 
        // Typography tokens - font family from theme
        fontFamily: theme.typography.fontFamily }, variantStyles), colorStyles), { 
        // Additional styling for better readability
        margin: '0', padding: '0', 
        // Smooth text rendering
        WebkitFontSmoothing: 'antialiased', MozOsxFontSmoothing: 'grayscale' });
    // Helper function to merge classes safely
    const mergeClasses = (...classes) => {
        return classes.filter(Boolean).join(' ');
    };
    return (_jsx(Component, { style: typographyStyles, className: mergeClasses('transition-colors duration-200 ease-in-out', // Smooth color transitions
        className // User-provided classes (highest priority)
        ), children: children }));
}
