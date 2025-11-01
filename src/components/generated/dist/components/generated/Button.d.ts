import { ReactNode } from 'react';
/**
 * Generated Button Component
 *
 * A dynamically styled button component that uses theme tokens to create consistent,
 * branded interactions across your application. This component is part of Lumina's
 * generated design system and automatically updates its appearance when theme tokens
 * are modified, ensuring perfect brand alignment without code changes.
 *
 * ## Material 3 Design Inspiration
 *
 * - **Primary Variant**: Uses primary color role for background (Material 3 filled button)
 * - **Secondary Variant**: Uses secondary color with proper contrast ratios
 * - **Outline Variant**: Uses tertiary color for borders, transparent background
 * - **Typography**: Consistent font family and medium weight for readability
 * - **Shape System**: Applies consistent corner radius across all variants
 * - **Spacing System**: Uses base spacing unit for predictable sizing
 *
 * ## Token Mapping & Style Application
 *
 * ### Colors
 * - `primary` variant → `theme.tokens.colors.primary` (background)
 * - `secondary` variant → `theme.tokens.colors.secondary` (background)
 * - `outline` variant → `theme.tokens.colors.tertiary` (border + text)
 * - Contrast colors → `onPrimary`, `onSecondary` (auto-calculated if missing)
 *
 * ### Typography
 * - `fontFamily` → `theme.tokens.typography.fontFamily`
 * - `fontWeight` → Medium (500) for optimal button readability
 * - `fontSize` → Responsive sizing based on button padding
 *
 * ### Shape & Spacing
 * - `borderRadius` → `theme.tokens.shape.cornerRadius`px
 * - `padding` → Vertical: `base/2`, Horizontal: `base * 1.5`
 * - `minHeight` → `base * 2.75` for consistent touch targets
 *
 * ## Usage Examples
 *
 * ### Basic Usage
 * ```tsx
 * import { Button } from '@/src/components/generated';
 *
 * function MyComponent() {
 *   return (
 *     <Button variant="primary" onClick={() => console.log('clicked')}>
 *       Get Started
 *     </Button>
 *   );
 * }
 * ```
 *
 * ### With Custom Styling
 * ```tsx
 * <Button
 *   variant="outline"
 *   className="w-full sm:w-auto shadow-lg"
 *   disabled={loading}
 * >
 *   {loading ? 'Processing...' : 'Submit Form'}
 * </Button>
 * ```
 *
 * ### Button Group
 * ```tsx
 * <div className="flex gap-3">
 *   <Button variant="primary">Save</Button>
 *   <Button variant="outline">Cancel</Button>
 * </div>
 * ```
 *
 * ## Accessibility Features
 *
 * - **Focus Management**: Visible focus rings with proper contrast
 * - **Disabled States**: Clear visual indication with reduced opacity
 * - **Hover States**: Subtle hover feedback without jarring transitions
 * - **Touch Targets**: Minimum 44px height for mobile accessibility
 * - **Screen Reader**: Semantic button element with proper ARIA support
 *
 * ## Reusability Across Projects
 *
 * This component is designed to be portable:
 *
 * 1. **Theme Agnostic**: Works with any theme token structure
 * 2. **Framework Independent**: Pure React with minimal dependencies
 * 3. **Tailwind Compatible**: Seamlessly merges with utility classes
 * 4. **Export Ready**: Can be packaged as standalone NPM module
 *
 * To use in another project:
 * ```bash
 * npm install lumina-components  # Future NPM package
 * ```
 *
 * ```tsx
 * import { Button, setGlobalTheme } from 'lumina-components';
 *
 * // Apply your brand tokens
 * setGlobalTheme({
 *   colors: { primary: '#your-brand-color' },
 *   typography: { fontFamily: 'Your Font' },
 *   // ... other tokens
 * });
 * ```
 */
export interface ButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
    variant?: 'primary' | 'secondary' | 'outline';
}
interface ThemeTokens {
    colors: {
        primary: string;
        secondary: string;
        tertiary: string;
        onPrimary?: string;
        onSecondary?: string;
    };
    typography: {
        fontFamily: string;
    };
    shape: {
        cornerRadius: number;
    };
    spacing: {
        base: number;
    };
}
/**
 * Legacy Theme Setter (Maintained for Backward Compatibility)
 *
 * This function is maintained for backward compatibility with existing code
 * that may still use the global theme setter pattern. The component now
 * primarily uses ThemeContext for automatic updates.
 */
export declare const setButtonTheme: (theme: ThemeTokens | null) => void;
export default function Button({ children, className, onClick, disabled, variant }: ButtonProps): import("react/jsx-runtime").JSX.Element;
export {};
