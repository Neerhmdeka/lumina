'use client';

import { useState } from 'react';

/**
 * Theme Configuration Form Component
 * 
 * Material 3 Design Token inspired form for configuring design system tokens.
 * Collects colors, typography, spacing, and shape tokens that will be used
 * to generate the complete design system.
 * 
 * Token Categories:
 * - Colors: Primary, Secondary, Tertiary color roles + optional on-colors
 * - Typography: Font family configuration
 * - Shape: Corner radius for consistent border radius
 * - Spacing: Base spacing unit for layout consistency
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

interface ThemeFormProps {
  onThemeSaved?: (theme: Theme) => void;
}

export default function ThemeForm({ onThemeSaved }: ThemeFormProps) {
  // Form state for all design tokens
  const [formData, setFormData] = useState({
    // Color tokens - Material 3 color roles
    primaryColor: '#6750A4',      // Primary brand color
    secondaryColor: '#625B71',    // Secondary supporting color
    tertiaryColor: '#7D5260',     // Tertiary accent color
    onPrimaryColor: '#FFFFFF',    // Text/icon color on primary surfaces
    onSecondaryColor: '#FFFFFF',  // Text/icon color on secondary surfaces
    
    // Typography tokens
    fontFamily: 'Inter, system-ui, sans-serif', // Base font family
    
    // Shape tokens
    cornerRadius: 8,              // Base corner radius in pixels
    
    // Spacing tokens
    baseSpacing: 16,              // Base spacing unit in pixels
  });

  // UI state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  /**
   * Handle form input changes
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission
   * Sends design tokens to API route for database storage
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/theme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitMessage('Theme saved successfully.');
        // Call the callback to update the preview with the saved theme
        if (onThemeSaved && result.theme) {
          onThemeSaved(result.theme);
        }
      } else {
        setSubmitMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setSubmitMessage('Failed to save theme. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Color Tokens Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Color Tokens</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Primary Color */}
          <div>
            <label htmlFor="primaryColor" className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color *
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="primaryColor"
                name="primaryColor"
                value={formData.primaryColor}
                onChange={handleInputChange}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                required
              />
              <input
                type="text"
                value={formData.primaryColor}
                onChange={handleInputChange}
                name="primaryColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#6750A4"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Main brand color for primary actions</p>
          </div>

          {/* Secondary Color */}
          <div>
            <label htmlFor="secondaryColor" className="block text-sm font-medium text-gray-700 mb-2">
              Secondary Color *
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="secondaryColor"
                name="secondaryColor"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                required
              />
              <input
                type="text"
                value={formData.secondaryColor}
                onChange={handleInputChange}
                name="secondaryColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#625B71"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Supporting color for secondary elements</p>
          </div>

          {/* Tertiary Color */}
          <div>
            <label htmlFor="tertiaryColor" className="block text-sm font-medium text-gray-700 mb-2">
              Tertiary Color *
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="tertiaryColor"
                name="tertiaryColor"
                value={formData.tertiaryColor}
                onChange={handleInputChange}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
                required
              />
              <input
                type="text"
                value={formData.tertiaryColor}
                onChange={handleInputChange}
                name="tertiaryColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#7D5260"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Accent color for highlights and contrast</p>
          </div>

          {/* On Primary Color */}
          <div>
            <label htmlFor="onPrimaryColor" className="block text-sm font-medium text-gray-700 mb-2">
              On Primary Color
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                id="onPrimaryColor"
                name="onPrimaryColor"
                value={formData.onPrimaryColor}
                onChange={handleInputChange}
                className="w-12 h-10 border border-gray-300 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.onPrimaryColor}
                onChange={handleInputChange}
                name="onPrimaryColor"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#FFFFFF"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Text/icon color on primary surfaces</p>
          </div>
        </div>
      </div>

      {/* Typography Tokens Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Typography Tokens</h3>
        <div>
          <label htmlFor="fontFamily" className="block text-sm font-medium text-gray-700 mb-2">
            Font Family
          </label>
          <input
            type="text"
            id="fontFamily"
            name="fontFamily"
            value={formData.fontFamily}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Inter, system-ui, sans-serif"
          />
          <p className="text-xs text-gray-500 mt-1">Base font family for all text elements</p>
        </div>
      </div>

      {/* Shape Tokens Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Shape Tokens</h3>
        <div>
          <label htmlFor="cornerRadius" className="block text-sm font-medium text-gray-700 mb-2">
            Corner Radius (px)
          </label>
          <input
            type="number"
            id="cornerRadius"
            name="cornerRadius"
            value={formData.cornerRadius}
            onChange={handleInputChange}
            min="0"
            max="50"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="8"
          />
          <p className="text-xs text-gray-500 mt-1">Base border radius for consistent rounded corners</p>
        </div>
      </div>

      {/* Spacing Tokens Section */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Spacing Tokens</h3>
        <div>
          <label htmlFor="baseSpacing" className="block text-sm font-medium text-gray-700 mb-2">
            Base Spacing (px)
          </label>
          <input
            type="number"
            id="baseSpacing"
            name="baseSpacing"
            value={formData.baseSpacing}
            onChange={handleInputChange}
            min="4"
            max="32"
            step="4"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="16"
          />
          <p className="text-xs text-gray-500 mt-1">Base spacing unit for consistent layout rhythm</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? 'Saving Theme...' : 'Save Theme Configuration'}
        </button>

        {/* Success/Error Message */}
        {submitMessage && (
          <div className={`mt-4 p-3 rounded-md text-sm ${
            submitMessage.includes('successfully') 
              ? 'bg-green-50 text-green-800 border border-green-200' 
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            {submitMessage}
          </div>
        )}
      </div>
    </form>
  );
}