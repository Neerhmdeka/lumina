# @myorg/lumina-components

A dynamically-themed React component library built with Material 3 design principles. Components automatically adapt their styling based on theme tokens provided through React Context, enabling real-time visual updates across your application.

## ✨ Features

- **🎨 Live Theme Updates**: Components automatically re-render when theme tokens change
- **🌟 Material 3 Design**: Built following Material You design principles
- **⚡ TypeScript Support**: Full type safety with comprehensive interfaces
- **🎯 Zero Dependencies**: Only requires React as a peer dependency
- **🚀 Tree Shakeable**: Import only the components you need
- **📱 Responsive**: All components work seamlessly across devices

## � Installation

```bash
npm install @myorg/lumina-components
# or
yarn add @myorg/lumina-components
# or
pnpm add @myorg/lumina-components
```

## 🚀 Quick Start

### 1. Wrap Your App with ThemeProvider

```tsx
import { ThemeProvider } from '@myorg/lumina-components';

const myTheme = {
  tokens: {
    colors: {
      primary: '#007AFF',
      secondary: '#FF3B30',
      tertiary: '#34C759'
    },
    typography: {
      fontFamily: 'Inter, sans-serif'
    },
    shape: {
      cornerRadius: 12
    },
    spacing: {
      base: 16
    }
  }
};

function App() {
  return (
    <ThemeProvider initialTheme={myTheme}>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 2. Use Components

```tsx
import { Button, Card, Typography } from '@myorg/lumina-components';

function MyComponent() {
  return (
    <Card variant="elevated">
      <Typography variant="headline">Welcome</Typography>
      <Typography variant="body">
        This content uses your custom theme tokens automatically.
      </Typography>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

### 3. Dynamic Theme Updates

```tsx
import { useTheme } from '@myorg/lumina-components';

function ThemeControls() {
  const { theme, updateTheme } = useTheme();

  const changeTheme = () => {
    updateTheme({
      tokens: {
        ...theme,
        colors: {
          ...theme.colors,
          primary: '#FF6B6B' // All components update instantly!
        }
      }
    });
  };

  return <button onClick={changeTheme}>Change Theme</button>;
}
```

## 🎨 Available Components

### Button

Interactive buttons with multiple variants and sizes.

```tsx
import { Button } from '@myorg/lumina-components';

<Button variant="primary" size="medium">Primary Button</Button>
<Button variant="secondary" size="large">Secondary Button</Button>
<Button variant="outline" size="small">Outline Button</Button>
```

**Props:**
- `variant`: `'primary'` | `'secondary'` | `'outline'` (default: `'primary'`)
- `size`: `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `disabled`: `boolean` (default: `false`)
- `onClick`: `() => void`
- `children`: `ReactNode`

### Card

Surface containers with elevation and border variants.

```tsx
import { Card } from '@myorg/lumina-components';

<Card variant="elevated">
  <h2>Card Title</h2>
  <p>Card content goes here...</p>
</Card>

<Card variant="outlined">
  <p>Outlined card with border</p>
</Card>
```

**Props:**
- `variant`: `'elevated'` | `'outlined'` | `'filled'` (default: `'elevated'`)
- `padding`: `'none'` | `'small'` | `'medium'` | `'large'` (default: `'medium'`)
- `children`: `ReactNode`

### Typography

Complete type scale from display to caption with semantic HTML elements.

```tsx
import { Typography } from '@myorg/lumina-components';

<Typography variant="display" color="primary">Display Text</Typography>
<Typography variant="headline" as="h1">Headline</Typography>
<Typography variant="title" as="h2">Title</Typography>
<Typography variant="body" as="p">Body text content</Typography>
<Typography variant="label">Label Text</Typography>
<Typography variant="caption">Caption text</Typography>
```

**Props:**
- `variant`: `'display'` | `'headline'` | `'title'` | `'body'` | `'label'` | `'caption'` (default: `'body'`)
- `color`: `'primary'` | `'secondary'` | `'tertiary'` | `'onSurface'` (default: `'onSurface'`)
- `as`: HTML element tag (default: based on variant)
- `children`: `ReactNode`

## �️ Theme Structure

### ThemeTokens Interface

```tsx
interface ThemeTokens {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    onPrimary?: string;
    onSecondary?: string;
    onTertiary?: string;
    surface?: string;
    onSurface?: string;
    outline?: string;
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
  elevation?: {
    low?: string;
    medium?: string;
    high?: string;
  };
}
```

### Complete Theme Object

```tsx
interface Theme {
  id?: string;
  name?: string;
  tokens: ThemeTokens;
  organizationId?: string | null;
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
```

## 🔧 Advanced Usage

### Custom Components with Theme Access

```tsx
import { useTheme } from '@myorg/lumina-components';

function CustomComponent() {
  const { theme } = useTheme();
  
  return (
    <div 
      style={{
        backgroundColor: theme.colors.surface,
        color: theme.colors.onSurface,
        borderRadius: theme.shape.cornerRadius,
        padding: theme.spacing.base,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      Custom themed content
    </div>
  );
}
```

### Theme Validation

```tsx
import { validateThemeTokens } from '@myorg/lumina-components';

const isValidTheme = validateThemeTokens(myThemeObject);
if (!isValidTheme) {
  console.error('Invalid theme structure');
}
```

### Default Theme

```tsx
import { defaultThemeTokens } from '@myorg/lumina-components';

// Use as fallback or starting point
const myTheme = {
  tokens: {
    ...defaultThemeTokens,
    colors: {
      ...defaultThemeTokens.colors,
      primary: '#custom-color' // Override specific tokens
    }
  }
};
```

## 📋 Requirements

- **React**: 16.8+ (hooks support required)
- **React DOM**: 16.8+
- **Tailwind CSS**: Must be configured in your project for styling utilities

## 🔄 Migration from Legacy API

If you're migrating from the legacy theme setter functions:

### Before (Legacy)
```tsx
import { setGlobalTheme } from '@myorg/lumina-components';

// Legacy approach
setGlobalTheme(newThemeTokens);
```

### After (Recommended)
```tsx
import { useTheme } from '@myorg/lumina-components';

function MyComponent() {
  const { updateTheme } = useTheme();
  
  // Modern React Context approach
  updateTheme(newTheme);
}
```

## 🎯 Best Practices

1. **Always wrap your app with ThemeProvider**:
   ```tsx
   <ThemeProvider initialTheme={theme}>
     <App />
   </ThemeProvider>
   ```

2. **Use the useTheme hook for dynamic updates**:
   ```tsx
   const { theme, updateTheme } = useTheme();
   ```

3. **Validate themes before applying**:
   ```tsx
   if (validateThemeTokens(newTheme)) {
     updateTheme(newTheme);
   }
   ```

4. **Leverage TypeScript for type safety**:
   ```tsx
   const theme: ThemeTokens = { /* your theme */ };
   ```

## 🐛 Troubleshooting

### "useTheme must be used within a ThemeProvider"

Make sure your components are wrapped in a ThemeProvider:

```tsx
// ❌ Wrong
<MyComponent /> 

// ✅ Correct
<ThemeProvider initialTheme={myTheme}>
  <MyComponent />
</ThemeProvider>
```

### Components not updating with theme changes

Ensure you're using the `updateTheme` function from the useTheme hook:

```tsx
const { updateTheme } = useTheme();
updateTheme(newTheme); // This will trigger re-renders
```

### Tailwind styles not applying

Make sure Tailwind CSS is properly configured in your project and includes the necessary utility classes.

## � TypeScript Support

This package includes comprehensive TypeScript definitions. Import types as needed:

```tsx
import type { 
  ThemeTokens, 
  Theme, 
  ButtonProps, 
  CardProps, 
  TypographyProps 
} from '@myorg/lumina-components';
```

## 🤝 Contributing

This package is generated from the Lumina design system. For issues or feature requests, please refer to the main Lumina repository.

## 📄 License

MIT License - see LICENSE file for details.

## 🔗 Links

- [Main Lumina Repository](https://github.com/lumina/lumina)
- [Documentation](https://lumina-components.dev)
- [NPM Package](https://www.npmjs.com/package/@myorg/lumina-components)

---

Built with ❤️ by the Lumina Design System team