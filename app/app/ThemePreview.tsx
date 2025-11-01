'use client';

import { Button, Card, Typography } from '../../src/components/generated';
import Checkbox from '../../src/components/generated/Checkbox';
import Input from '../../src/components/generated/Input';
import Label from '../../src/components/generated/Label';
import Alert, { AlertTitle, AlertDescription } from '../../src/components/generated/Alert';
import Avatar from '../../src/components/generated/Avatar';
import Accordion, { AccordionItem } from '../../src/components/generated/Accordion';
import ButtonGroup from '../../src/components/generated/ButtonGroup';
import { useTheme } from '../../src/lib/themeContext';

/**
 * Design System Preview Component
 * 
 * Displays a live preview of the generated design system using the saved theme tokens.
 * This component renders the actual generated components (Button, Card, Typography)
 * that make up Lumina's dynamically created design system.
 * 
 * Features:
 * - Uses generated Button, Card, Typography components
 * - Automatically updates component styling when theme tokens change
 * - Shows real design system components, not mockups
 * - Demonstrates component composition and interaction
 * - Fallback state when no theme is saved yet
 * 
 * Preview Structure:
 * - Card container with Typography heading and Button samples
 * - Multiple button variants (primary, secondary, outline)
 * - Typography samples showing different variants and colors
 * - Component composition examples
 */

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
  generatedAt?: string;
  version?: string;
}

interface Theme {
  id: string;
  name: string;
  tokens: ThemeTokens;
  organizationId: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

interface ThemePreviewProps {
  theme?: Theme | null; // Made optional for backward compatibility
}

export default function ThemePreview({ theme: propTheme }: ThemePreviewProps = {}) {
  /**
   * Theme Context Integration
   * 
   * ThemePreview now uses useTheme hook to get current theme directly from context.
   * This eliminates the need for theme props and enables automatic updates when
   * theme changes through the form submission.
   * 
   * Benefits:
   * - Automatic re-rendering when theme changes
   * - No need to pass theme as prop
   * - Consistent with generated components
   * - Real-time visual feedback
   */
  const { fullTheme } = useTheme();
  
  // Use theme from context, fallback to prop for backward compatibility
  const theme = fullTheme || propTheme;
  
  // Handle case where no theme is saved yet
  if (!theme) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-lg flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-9a2 2 0 00-2-2h-2M7 21V8a2 2 0 012-2h4a2 2 0 012 2v13M7 21h4a2 2 0 002-2v-4a2 2 0 00-2-2H7" />
          </svg>
        </div>
        <Typography variant="title" className="mb-2">No theme saved yet</Typography>
        <Typography variant="body" color="muted" className="max-w-md mx-auto">
          Submit the form above to preview your design system. Your generated components will appear here using your custom theme tokens.
        </Typography>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Theme Information Header */}
      <Card variant="filled" className="p-4">
        <Typography variant="title" className="mb-2">
          Generated Design System: {theme.name}
        </Typography>
        <Typography variant="body" color="muted">
          Last updated: {new Date(theme.updatedAt).toLocaleDateString()} at {new Date(theme.updatedAt).toLocaleTimeString()}
        </Typography>
      </Card>

      {/* Generated Design System Preview */}
      <div className="space-y-6">
        
        {/* Main Component Showcase */}
        <Card>
          <Typography variant="headline">Design System Overview</Typography>
          <Typography variant="body" color="muted" className="mb-4">
            Your generated design system components using the theme tokens you configured above.
          </Typography>
          
          {/* Button Variants Showcase */}
          <div className="space-y-4">
            <Typography variant="title">Button Components</Typography>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary Button</Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="outline">Outline Button</Button>
            </div>
            
            {/* Button Group */}
            <div className="space-y-2">
              <Typography variant="label">Button Group</Typography>
              <ButtonGroup>
                <Button variant="outline">Archive</Button>
                <Button variant="outline">Report</Button>
                <Button variant="outline">Delete</Button>
              </ButtonGroup>
            </div>
          </div>

          {/* Form Components Showcase */}
          <div className="space-y-4">
            <Typography variant="title">Form Components</Typography>
            
            {/* Input with Label */}
            <div className="space-y-2">
              <Label htmlFor="email-demo" required>Email Address</Label>
              <Input 
                id="email-demo" 
                type="email" 
                placeholder="you@example.com"
                size="default" 
              />
            </div>
            
            {/* Checkbox */}
            <div className="flex items-center space-x-3">
              <Checkbox id="terms-demo" />
              <Label htmlFor="terms-demo">I agree to the terms and conditions</Label>
            </div>
          </div>

          {/* Alert Components */}
          <div className="space-y-4">
            <Typography variant="title">Alert Components</Typography>
            
            <Alert variant="info">
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Your theme tokens are working correctly! All components are automatically styled.
              </AlertDescription>
            </Alert>
            
            <Alert variant="success">
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Component library generated successfully with your custom theme.
              </AlertDescription>
            </Alert>
          </div>

          {/* Avatar Component */}
          <div className="space-y-4">
            <Typography variant="title">Avatar Component</Typography>
            <div className="flex items-center space-x-4">
              <Avatar size="sm" fallback="SM" />
              <Avatar size="md" fallback="MD" />
              <Avatar size="lg" fallback="LG" status="online" />
              <Avatar size="xl" fallback="XL" />
            </div>
          </div>
        </Card>

        {/* Typography Showcase */}
        <Card variant="outlined">
          <Typography variant="display">Display Text</Typography>
          <Typography variant="headline">Headline Text</Typography>
          <Typography variant="title">Title Text</Typography>
          <Typography variant="body">
            Body text demonstrates how your custom font family creates consistent readability 
            and visual hierarchy throughout your design system. This text automatically 
            adapts when you update your typography tokens.
          </Typography>
          <Typography variant="label" color="primary" element="div">Primary Label</Typography>
          <Typography variant="caption" color="muted" element="div">Caption text for additional information</Typography>
        </Card>

        {/* Accordion Component */}
        <Card variant="outlined">
          <Typography variant="title" className="mb-4">Accordion Component</Typography>
          <Accordion type="single" collapsible>
            <AccordionItem value="item1" trigger="What is a design system?">
              A design system is a comprehensive guide consisting of reusable components, 
              guided by clear standards, that can be assembled together to build applications.
            </AccordionItem>
            <AccordionItem value="item2" trigger="How do theme tokens work?">
              Theme tokens are the visual design atoms of the design system. They store 
              visual design attributes like colors, spacing, typography, and more.
            </AccordionItem>
            <AccordionItem value="item3" trigger="Why use Lumina?">
              Lumina automatically generates component libraries from your design tokens, 
              ensuring consistency and saving development time.
            </AccordionItem>
          </Accordion>
        </Card>

        {/* Component Composition Example */}
        <Card variant="filled">
          <Typography variant="title" color="primary">
            Component Composition
          </Typography>
          <Typography variant="body" className="mb-4">
            This example shows how your generated components work together to create 
            cohesive user interfaces with consistent styling.
          </Typography>
          <div className="flex gap-3">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </Card>

        {/* Token Information Card */}
        <Card elevation="medium">
          <Typography variant="title" className="mb-3">
            Active Theme Tokens
          </Typography>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <Typography variant="label" element="div">Font Family</Typography>
              <Typography variant="caption" element="div" className="font-mono">
                {theme.tokens.typography.fontFamily}
              </Typography>
            </div>
            <div>
              <Typography variant="label" element="div">Corner Radius</Typography>
              <Typography variant="caption" element="div">
                {theme.tokens.shape.cornerRadius}px
              </Typography>
            </div>
            <div>
              <Typography variant="label" element="div">Base Spacing</Typography>
              <Typography variant="caption" element="div">
                {theme.tokens.spacing.base}px
              </Typography>
            </div>
            <div>
              <Typography variant="label">Colors</Typography>
              <div className="flex gap-1 mt-1">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: theme.tokens.colors.primary }}
                  title={`Primary: ${theme.tokens.colors.primary}`}
                />
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: theme.tokens.colors.secondary }}
                  title={`Secondary: ${theme.tokens.colors.secondary}`}
                />
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: theme.tokens.colors.tertiary }}
                  title={`Tertiary: ${theme.tokens.colors.tertiary}`}
                />
              </div>
            </div>
          </div>
        </Card>

        {/* Generated Components Info */}
        <Card variant="outlined">
          <Typography variant="title" color="secondary" className="mb-2">
            ✨ Generated Components
          </Typography>
          <div className="space-y-3">
            <Typography variant="body">
              These are actual components from your generated design system located at{' '}
              <span className="font-mono bg-gray-100 px-1 rounded text-xs">
                src/components/generated/
              </span>
            </Typography>
            <Typography variant="body">
              When you update your theme tokens and save the form, these components 
              automatically update their styling to reflect your new design decisions.
            </Typography>
          </div>
        </Card>

      </div>
    </div>
  );
}