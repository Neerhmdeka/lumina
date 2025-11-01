import { ReactNode } from 'react';
/**
 * Generated Card Component
 *
 * A flexible surface container component that uses theme tokens to create consistent,
 * branded content areas throughout your application. This component follows Material 3
 * surface design principles while adapting to your custom brand tokens for seamless
 * integration across different projects and themes.
 *
 * ## Material 3 Design Inspiration
 *
 * - **Surface Containers**: Clean, elevated surfaces for content organization
 * - **Elevation System**: Subtle shadows that respond to user interactions
 * - **Shape Consistency**: Unified corner radius across all surface elements
 * - **Content Spacing**: Automatic internal spacing for optimal content flow
 * - **Variant Support**: Multiple surface styles for different content contexts
 *
 * ## Token Mapping & Style Application
 *
 * ### Surface & Colors
 * - `default` variant → Clean white background with subtle border
 * - `outlined` variant → Transparent background with prominent border
 * - `filled` variant → Light surface background with minimal border
 * - Border colors → `secondary` color at 20% opacity for subtle definition
 *
 * ### Shape & Spacing
 * - `borderRadius` → `theme.tokens.shape.cornerRadius`px for all corners
 * - `padding` → `base * 1.5` for comfortable internal spacing
 * - `gap` → `base * 0.75` between child elements (automatic)
 * - Responsive sizing based on content and container
 *
 * ### Elevation System
 * - `low` → Subtle shadow for basic elevation (default cards)
 * - `medium` → Moderate shadow for important content areas
 * - `high` → Strong shadow for modals and overlays
 * - Hover enhancement → +2 elevation levels on interaction
 *
 * ## Usage Examples
 *
 * ### Basic Content Card
 * Card with elevation for product displays:
 * - Use elevation="medium" for product cards
 * - Typography components automatically space properly
 * - Button components inherit theme styling
 *
 * ### Dashboard Widget
 * Filled variant for dashboard panels:
 * - variant="filled" provides subtle background
 * - className can add responsive sizing (min-h-48)
 * - Works perfectly with charts and data visualization
 *
 * ### Navigation Card
 * Outlined variant for interactive elements:
 * - variant="outlined" for clean borders
 * - Add hover classes for interactive feedback
 * - Perfect for feature cards and navigation items
 *
 * ## Content Organization Features
 *
 * - **Automatic Spacing**: Child elements receive consistent gap spacing
 * - **Flex Layout**: Content flows vertically with proper alignment
 * - **Overflow Handling**: Prevents content from breaking card boundaries
 * - **Interactive States**: Smooth hover transitions for engaging interactions
 * - **Responsive Design**: Adapts to different screen sizes and containers
 *
 * ## Accessibility & UX
 *
 * - **Focus Management**: Proper focus indication for interactive cards
 * - **Content Hierarchy**: Works seamlessly with Typography components
 * - **Color Contrast**: Automatic border/background contrast ratios
 * - **Screen Readers**: Semantic structure with proper content organization
 * - **Motion Sensitivity**: Respectful animation timing and easing
 *
 * ## Reusability Across Projects
 *
 * This component is architected for maximum portability:
 *
 * 1. **Layout Agnostic**: Works in any layout system (Grid, Flex, etc.)
 * 2. **Content Flexible**: Accepts any child content and components
 * 3. **Theme Adaptable**: Automatically adjusts to any brand tokens
 * 4. **Framework Ready**: Pure React with TypeScript support
 *
 * Perfect for:
 * - **E-commerce**: Product cards, checkout steps, order summaries
 * - **Dashboards**: Widget containers, stat cards, navigation panels
 * - **Content Sites**: Article previews, feature highlights, testimonials
 * - **Applications**: Forms, settings panels, user profiles
 *
 * Export for reuse:
 * Import from lumina-components NPM package (future)
 * Theme tokens automatically applied
 * Works with any content and layout system
 */
export interface CardProps {
    children: ReactNode;
    className?: string;
    elevation?: 'low' | 'medium' | 'high';
    variant?: 'default' | 'outlined' | 'filled';
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
 */
export declare const setCardTheme: (theme: ThemeTokens | null) => void;
export default function Card({ children, className, elevation, variant }: CardProps): import("react/jsx-runtime").JSX.Element;
export {};
