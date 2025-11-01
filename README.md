<<<<<<< HEAD
# Lumina - Design System Builder

A powerful design system builder that enables teams to create, manage, and distribute dynamic component libraries with automatic theme updates.

## ✨ Features

- **🎨 Dynamic Theming**: Components automatically update when theme tokens change
- **🚀 Live Updates**: Real-time theme synchronization across all components
- **📦 NPM Distribution**: Export component libraries as ready-to-use NPM packages
- **🎯 Material 3 Design**: Built following Material You design principles
- **⚡ TypeScript Support**: Full type safety with comprehensive interfaces
- **🔄 Theme Management**: Visual theme editor with database persistence

## 🏗️ Architecture

### Main Application (Next.js)
- **Theme Builder**: Visual interface for creating and editing themes
- **Component Preview**: Real-time component showcase with theme updates
- **Database Integration**: Persistent theme storage with Prisma

### Generated Component Library (`src/components/generated`)
- **Standalone NPM Package**: `@myorg/lumina-components`
- **ThemeProvider**: React Context for theme management
- **Component Collection**: Button, Card, Typography with automatic theme integration
- **Distribution Ready**: Built with Rollup for optimal bundle size

## 🚀 Getting Started

### Development

```bash
# Install dependencies
npm install

# Set up database
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the theme builder interface.

### Building Component Package

```bash
# Navigate to generated components
cd src/components/generated

# Install package dependencies
npm install

# Build the NPM package
npm run build

# Create distributable tarball
npm pack
```

## 🎨 Component Library Usage

### Installation

```bash
npm install @myorg/lumina-components
```

### Basic Usage

```tsx
import { ThemeProvider, Button, Card, Typography } from '@myorg/lumina-components';

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
      <Card variant="elevated">
        <Typography variant="headline">Welcome to Lumina</Typography>
        <Typography variant="body">
          Components automatically use your theme tokens.
        </Typography>
        <Button variant="primary">Get Started</Button>
      </Card>
    </ThemeProvider>
  );
}
```

### Dynamic Theme Updates

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

  return <button onClick={changeTheme}>Update Theme</button>;
}
```

## 📁 Project Structure

```
lumina/
├── app/                          # Next.js application
│   ├── app/                     # Theme builder interface
│   └── api/                     # API routes for theme management
├── src/
│   ├── lib/
│   │   ├── themeContext.tsx     # Main application theme context
│   │   └── prisma.ts           # Database utilities
│   └── components/generated/    # NPM package source
│       ├── ThemeProvider.tsx    # Standalone theme provider
│       ├── Button.tsx          # Button component
│       ├── Card.tsx            # Card component
│       ├── Typography.tsx      # Typography component
│       ├── index.ts            # Package exports
│       ├── package.json        # NPM package configuration
│       └── README.md           # Package documentation
└── prisma/                      # Database schema
```

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **Build System**: Rollup (for component package)
- **Styling**: Material 3 design principles
- **Package Management**: NPM with workspace support

## 📚 Documentation

- [Component Library Documentation](./src/components/generated/README.md)
- [Live Updates Guide](./LIVE_UPDATES.md)
- [Theme Structure Reference](./docs/theme-structure.md)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://lumina-design.vercel.app)
- [Component Package](https://npmjs.com/package/@myorg/lumina-components)
- [Documentation](https://lumina-docs.vercel.app)
=======
# lumina
Design System Builder
>>>>>>> 7bf39fcc741751da19edea023360abb497ffdee9
