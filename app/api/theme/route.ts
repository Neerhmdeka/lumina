import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../../lib/prisma';

/**
 * Theme API Route - Save Theme Tokens
 * 
 * Handles saving theme configuration data to the database for organizations.
 * This endpoint processes Material 3-inspired design tokens (colors, typography, 
 * spacing, shapes) and stores them as JSON in the theme's tokens field.
 * 
 * POST /api/theme
 * - Authenticates user with Clerk
 * - Fetches user's organization (assumes user is owner or member)
 * - Validates required theme fields
 * - Creates or updates organization's theme using Prisma
 * - Returns success/error response with theme data
 */

/**
 * Handle unsupported HTTP methods
 * Only POST is supported for this endpoint
 */
export async function GET() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to save theme data.' 
    },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    // Step 1: Authenticate user with Clerk
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required. Please sign in.' },
        { status: 401 }
      );
    }

    // Step 2: Parse and validate request body
    const body = await request.json();
    const {
      primaryColor,
      secondaryColor,
      tertiaryColor,
      onPrimaryColor,
      onSecondaryColor,
      fontFamily,
      cornerRadius,
      baseSpacing,
    } = body;

    // Validate required fields - colors are mandatory for theme generation
    if (!primaryColor || !secondaryColor || !tertiaryColor) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Primary, secondary, and tertiary colors are required fields.' 
        },
        { status: 400 }
      );
    }

    // Step 3: Find or create user in our database
    let user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        ownedOrganizations: true,  // Organizations this user owns
      }
    });

    if (!user) {
      // Create user if they don't exist in our database
      user = await prisma.user.create({
        data: {
          clerkId: userId,
        },
        include: {
          ownedOrganizations: true,
        }
      });
    }

    // Step 4: Get or create user's organization
    // For now, we'll create a default organization if the user doesn't have one
    let organization = user.ownedOrganizations[0];
    
    if (!organization) {
      // Create a default organization for the user
      organization = await prisma.organization.create({
        data: {
          name: 'My Organization',
          ownerId: user.id,
        }
      });
    }

    // Step 5: Structure theme tokens following Material 3 design token format
    const tokens = {
      // Color tokens - core color roles
      colors: {
        primary: primaryColor,
        secondary: secondaryColor,
        tertiary: tertiaryColor,
        // Optional on-color variants
        ...(onPrimaryColor && { onPrimary: onPrimaryColor }),
        ...(onSecondaryColor && { onSecondary: onSecondaryColor }),
      },
      // Typography tokens
      typography: {
        fontFamily: fontFamily || 'Inter, system-ui, sans-serif',
      },
      // Shape tokens - corner radius for consistent rounded corners
      shape: {
        cornerRadius: cornerRadius ? Number(cornerRadius) : 8,
      },
      // Spacing tokens - base unit for consistent layout rhythm
      spacing: {
        base: baseSpacing ? Number(baseSpacing) : 16,
      },
      // Metadata
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
    };

    // Step 6: Save or update the organization's theme
    // First check if a theme exists for this organization
    const existingTheme = await prisma.theme.findFirst({
      where: {
        organizationId: organization.id,
      },
    });

    let theme;
    if (existingTheme) {
      // Update existing theme
      theme = await prisma.theme.update({
        where: {
          id: existingTheme.id,
        },
        data: {
          name: 'Organization Theme',
          tokens,
          updatedAt: new Date(),
        },
        // Include related data in response
        include: {
          organization: {
            select: {
              id: true,
              name: true,
            }
          },
          user: {
            select: {
              id: true,
              clerkId: true,
            }
          }
        }
      });
    } else {
      // Create new theme
      theme = await prisma.theme.create({
        data: {
          name: 'Organization Theme',
          tokens,
          organizationId: organization.id,
          userId: user.id,
        },
        // Include related data in response
        include: {
          organization: {
            select: {
              id: true,
              name: true,
            }
          },
          user: {
            select: {
              id: true,
              clerkId: true,
            }
          }
        }
      });
    }

    // Step 7: Return success response with saved theme data
    return NextResponse.json({
      success: true,
      message: 'Theme saved successfully',
      theme: {
        id: theme.id,
        name: theme.name,
        tokens: theme.tokens,
        organizationId: theme.organizationId,
        organization: theme.organization,
        createdAt: theme.createdAt,
        updatedAt: theme.updatedAt,
      }
    });

  } catch (error) {
    // Step 8: Comprehensive error handling
    console.error('Theme save error:', error);
    
    // Handle specific Prisma errors
    if (error && typeof error === 'object' && 'code' in error) {
      const prismaError = error as any;
      
      if (prismaError.code === 'P2002') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'A theme already exists for this organization. Please try updating instead.' 
          },
          { status: 409 }
        );
      }
      
      if (prismaError.code === 'P2025') {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Organization not found. Please ensure you have access to an organization.' 
          },
          { status: 404 }
        );
      }
    }

    // Handle validation errors
    if (error instanceof Error && error.message.includes('validation')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid theme data provided.',
          details: error.message 
        },
        { status: 400 }
      );
    }

    // Generic server error response
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to save theme. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error?.toString() : undefined
      },
      { status: 500 }
    );
  }
}

/**
 * Handle unsupported HTTP methods
 */
export async function PUT() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to save theme data.' 
    },
    { status: 405 }
  );
}

export async function DELETE() {
  return NextResponse.json(
    { 
      success: false, 
      error: 'Method not allowed. Use POST to save theme data.' 
    },
    { status: 405 }
  );
}