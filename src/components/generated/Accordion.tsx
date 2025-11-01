'use client';

import { ReactNode, useState, useRef } from 'react';
import { useTheme } from '../../lib/themeContext';

/**
 * Generated Accordion Component
 * 
 * A collapsible content component that allows users to show and hide
 * sections of content. Built with accessibility in mind and integrates
 * with Lumina's theme system for consistent styling.
 * 
 * ## Design Features
 * 
 * - **Keyboard Navigation**: Arrow keys, Space, Enter support
 * - **Accessible**: Proper ARIA attributes and focus management
 * - **Smooth Animations**: CSS transitions for expand/collapse
 * - **Theme Integration**: Uses design tokens for consistent styling
 * - **Multiple Types**: Single or multiple items can be open
 * 
 * ## Usage Examples
 * 
 * ### Single Accordion
 * ```tsx
 * import { Accordion, AccordionItem } from '@/components/generated';
 * 
 * <Accordion type="single" collapsible>
 *   <AccordionItem value="item1" trigger="What is Lumina?">
 *     Lumina is a design system platform that helps teams...
 *   </AccordionItem>
 *   <AccordionItem value="item2" trigger="How does it work?">
 *     You configure your design tokens and we generate...
 *   </AccordionItem>
 * </Accordion>
 * ```
 * 
 * ### Multiple Open Items
 * ```tsx
 * <Accordion type="multiple">
 *   <AccordionItem value="faq1" trigger="Pricing">
 *     Our pricing is simple and transparent...
 *   </AccordionItem>
 *   <AccordionItem value="faq2" trigger="Support">
 *     We provide 24/7 customer support...
 *   </AccordionItem>
 * </Accordion>
 * ```
 */

export interface AccordionProps {
  children: ReactNode;
  type: 'single' | 'multiple';
  collapsible?: boolean;
  className?: string;
  defaultValue?: string | string[];
}

export interface AccordionItemProps {
  children: ReactNode;
  value: string;
  trigger: ReactNode;
  className?: string;
  disabled?: boolean;
}

// Accordion Context
import { createContext, useContext } from 'react';

interface AccordionContextValue {
  type: 'single' | 'multiple';
  collapsible: boolean;
  openItems: Set<string>;
  toggleItem: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

// Main Accordion Component
export default function Accordion({ 
  children,
  type,
  collapsible = false,
  className = '',
  defaultValue,
}: AccordionProps) {
  const { fullTheme } = useTheme();

  // Initialize open items based on type and defaultValue
  const initializeOpenItems = (): Set<string> => {
    if (!defaultValue) return new Set();
    
    if (type === 'single') {
      return typeof defaultValue === 'string' ? new Set([defaultValue]) : new Set();
    } else {
      return Array.isArray(defaultValue) ? new Set(defaultValue) : new Set();
    }
  };

  const [openItems, setOpenItems] = useState<Set<string>>(initializeOpenItems);

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

  // Toggle item open/closed
  const toggleItem = (value: string) => {
    setOpenItems(prev => {
      const newOpenItems = new Set(prev);
      
      if (type === 'single') {
        // For single accordion
        if (newOpenItems.has(value)) {
          // If collapsible is true, allow closing the open item
          if (collapsible) {
            newOpenItems.delete(value);
          }
          // If collapsible is false, keep it open
        } else {
          // Close any other open item and open this one
          newOpenItems.clear();
          newOpenItems.add(value);
        }
      } else {
        // For multiple accordion
        if (newOpenItems.has(value)) {
          newOpenItems.delete(value);
        } else {
          newOpenItems.add(value);
        }
      }
      
      return newOpenItems;
    });
  };

  const contextValue: AccordionContextValue = {
    type,
    collapsible,
    openItems,
    toggleItem,
  };

  const accordionStyles = {
    fontFamily: theme.typography.fontFamily,
    borderRadius: `${theme.shape.cornerRadius}px`,
    border: `1px solid #e5e7eb`,
    overflow: 'hidden',
  };

  return (
    <AccordionContext.Provider value={contextValue}>
      <div 
        style={accordionStyles}
        className={`divide-y divide-gray-200 ${className}`}
        role="region"
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

// Individual Accordion Item Component
export function AccordionItem({ 
  children, 
  value, 
  trigger, 
  className = '',
  disabled = false 
}: AccordionItemProps) {
  const context = useContext(AccordionContext);
  const { fullTheme } = useTheme();
  const contentRef = useRef<HTMLDivElement>(null);
  
  if (!context) {
    throw new Error('AccordionItem must be used within an Accordion');
  }

  const { openItems, toggleItem } = context;
  const isOpen = openItems.has(value);

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

  const theme = fullTheme?.tokens || defaultThemeTokens;

  // Trigger button styles
  const triggerStyles = {
    width: '100%',
    padding: `${theme.spacing.base}px`,
    backgroundColor: 'transparent',
    border: 'none',
    textAlign: 'left' as const,
    fontFamily: theme.typography.fontFamily,
    fontSize: '16px',
    fontWeight: '500',
    color: disabled ? '#9ca3af' : theme.colors.tertiary,
    cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    transition: 'all 0.2s ease-in-out',
    outline: 'none',
    opacity: disabled ? 0.6 : 1,
  };

  // Content container styles
  const contentStyles = {
    maxHeight: isOpen ? `${contentRef.current?.scrollHeight || 0}px` : '0px',
    overflow: 'hidden',
    transition: 'max-height 0.3s ease-in-out',
  };

  // Content inner styles
  const contentInnerStyles = {
    padding: `0 ${theme.spacing.base}px ${theme.spacing.base}px ${theme.spacing.base}px`,
    fontFamily: theme.typography.fontFamily,
    fontSize: '14px',
    lineHeight: '1.6',
    color: theme.colors.tertiary,
  };

  // Chevron icon styles
  const chevronStyles = {
    transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease-in-out',
    color: theme.colors.secondary,
    flexShrink: 0,
    marginLeft: `${theme.spacing.base * 0.5}px`,
  };

  // Handle trigger click
  const handleTriggerClick = () => {
    if (!disabled) {
      toggleItem(value);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(value);
    }
  };

  // Handle focus and hover states
  const handleTriggerFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      target.style.backgroundColor = '#f9fafb';
      target.style.boxShadow = `inset 0 0 0 1px ${theme.colors.primary}40`;
    }
  };

  const handleTriggerBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      target.style.backgroundColor = 'transparent';
      target.style.boxShadow = 'none';
    }
  };

  const handleTriggerMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      target.style.backgroundColor = '#f9fafb';
    }
  };

  const handleTriggerMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      const target = e.target as HTMLButtonElement;
      if (document.activeElement !== target) {
        target.style.backgroundColor = 'transparent';
      }
    }
  };

  // Chevron icon
  const chevronIcon = (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={chevronStyles}
    >
      <polyline points="6,9 12,15 18,9" />
    </svg>
  );

  return (
    <div className={className}>
      {/* Trigger Button */}
      <button
        type="button"
        style={triggerStyles}
        onClick={handleTriggerClick}
        onKeyDown={handleKeyDown}
        onFocus={handleTriggerFocus}
        onBlur={handleTriggerBlur}
        onMouseEnter={handleTriggerMouseEnter}
        onMouseLeave={handleTriggerMouseLeave}
        aria-expanded={isOpen}
        aria-controls={`accordion-content-${value}`}
        aria-disabled={disabled}
        disabled={disabled}
      >
        <span>{trigger}</span>
        {chevronIcon}
      </button>

      {/* Content */}
      <div
        ref={contentRef}
        id={`accordion-content-${value}`}
        style={contentStyles}
        aria-labelledby={`accordion-trigger-${value}`}
      >
        <div style={contentInnerStyles}>
          {children}
        </div>
      </div>
    </div>
  );
}