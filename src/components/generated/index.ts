/**
 * @myorg/lumina-components
 * 
 * A dynamically-themed React component library built with Material Design principles.
 * Components automatically adapt their styling based on theme tokens provided through
 * React Context, enabling real-time visual updates across your application.
 * 
 * ## Installation
 * 
 * ```bash
 * npm install @myorg/lumina-components
 * ```
 * 
 * ## Usage
 * 
 * ### Basic Import & Usage
 * ```tsx
 * import { Button, Card, Typography, ThemeProvider } from '@myorg/lumina-components';
 * 
 * function App() {
 *   return (
 *     <ThemeProvider initialTheme={myTheme}>
 *       <Card>
 *         <Typography variant="headline">Welcome</Typography>
 *         <Typography variant="body">
 *           This content uses your custom theme tokens automatically.
 *         </Typography>
 *         <Button variant="primary">Get Started</Button>
 *       </Card>
 *     </ThemeProvider>
 *   );
 * }
 * ```
 * 
 * ### Theme Configuration
 * ```tsx
 * import { ThemeProvider, useTheme } from '@myorg/lumina-components';
 * 
 * const myTheme = {
 *   colors: {
 *     primary: '#007AFF',
 *     secondary: '#FF3B30',
 *     tertiary: '#34C759'
 *   },
 *   typography: {
 *     fontFamily: 'Inter, sans-serif'
 *   },
 *   shape: {
 *     cornerRadius: 12
 *   },
 *   spacing: {
 *     base: 16
 *   }
 * };
 * 
 * // Wrap your app with ThemeProvider
 * <ThemeProvider initialTheme={myTheme}>
 *   <YourApp />
 * </ThemeProvider>
 * ```
 * 
 * ## Requirements
 * 
 * - **React**: 16.8+ (hooks support)
 * - **Tailwind CSS**: Must be configured in consuming project
 * - **TypeScript**: Optional but recommended for full type safety
 * 
 * ## Components
 * 
 * All components are responsive, accessible, and theme-aware:
 * - **Button**: Interactive buttons with primary/secondary/outline variants
 * - **Card**: Surface containers with elevation and border variants
 * - **Typography**: Complete type scale from display to caption
 * - **Checkbox**: Accessible checkboxes with custom styling
 * - **Input**: Form inputs with validation states
 * - **Label**: Semantic labels for form controls
 * - **Alert**: Status messages and notifications
 * - **Avatar**: User profile images with fallbacks
 * - **Accordion**: Collapsible content sections
 * - **ButtonGroup**: Grouped button layouts
 * - **ThemeProvider**: Context provider for theme management
 * - **useTheme**: Hook for accessing current theme in custom components
 * 
 * ## Live Theme Updates
 * 
 * Components automatically re-render when theme changes:
 * ```tsx
 * const { updateTheme } = useTheme();
 * 
 * // All components update instantly
 * updateTheme({
 *   colors: { primary: '#FF6B6B' }  // New color applied immediately
 * });
 * ```
 */

// Generated Components Export
export { default as Button } from './Button';
export { default as Card } from './Card';
export { default as Typography } from './Typography';
export { default as Checkbox } from './Checkbox';
export { default as Input } from './Input';
export { default as Label } from './Label';
export { default as Alert, AlertTitle, AlertDescription } from './Alert';
export { default as Avatar } from './Avatar';
export { default as Accordion, AccordionItem } from './Accordion';
export { default as ButtonGroup } from './ButtonGroup';

// Theme System Exports
export { ThemeProvider, useTheme, defaultThemeTokens, validateThemeTokens } from './ThemeProvider';
export type { ThemeTokens, Theme } from './ThemeProvider';

// Legacy theme functions for backward compatibility
import { setButtonTheme } from './Button';
import { setCardTheme } from './Card';
import { setTypographyTheme } from './Typography';

/**
 * Legacy Global Theme Setter
 * 
 * @deprecated Use ThemeProvider and useTheme hook instead for better performance and React patterns
 * 
 * Updates all component themes at once with new token values.
 * This function is kept for backward compatibility but it's recommended
 * to migrate to the ThemeProvider approach for better React integration.
 */
export const setGlobalTheme = (theme: any) => {
  setButtonTheme(theme);
  setCardTheme(theme);
  setTypographyTheme(theme);
};

// Type Exports for better TypeScript support
export type { ButtonProps } from './Button';
export type { CardProps } from './Card';
export type { TypographyProps } from './Typography';
export type { CheckboxProps } from './Checkbox';
export type { InputProps } from './Input';
export type { LabelProps } from './Label';
export type { AlertProps, AlertTitleProps, AlertDescriptionProps } from './Alert';
export type { AvatarProps } from './Avatar';
export type { AccordionProps, AccordionItemProps } from './Accordion';
export type { ButtonGroupProps } from './ButtonGroup';