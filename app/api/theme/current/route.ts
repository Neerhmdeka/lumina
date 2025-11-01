import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '../../../../lib/prisma';

/**
 * Get Current Theme API Route
 * 
 * Fetches the current organization's theme for the authenticated user.
 * Used for refreshing the theme preview after updates.
 */
export async function GET() {
  try {
    // Authenticate user
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Find user and their organization's theme
    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
      include: {
        ownedOrganizations: {
          include: {
            themes: {
              take: 1,
              orderBy: {
                updatedAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (!user?.ownedOrganizations?.[0]?.themes?.[0]) {
      return NextResponse.json({
        success: true,
        theme: null,
        message: 'No theme found'
      });
    }

    const theme = user.ownedOrganizations[0].themes[0];

    return NextResponse.json({
      success: true,
      theme: {
        id: theme.id,
        name: theme.name,
        tokens: theme.tokens,
        organizationId: theme.organizationId,
        userId: theme.userId,
        createdAt: theme.createdAt,
        updatedAt: theme.updatedAt,
      }
    });

  } catch (error) {
    console.error('Get current theme error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch theme' },
      { status: 500 }
    );
  }
}