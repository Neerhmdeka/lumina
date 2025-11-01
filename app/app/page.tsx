import { currentUser } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";
import DashboardContent from "./DashboardContent";
import { prisma } from "../../src/lib/prisma";
import { ThemeProvider } from "../../src/lib/themeContext";

/**
 * Dashboard Page - Main App Route
 * 
 * This is the main dashboard that users see after logging in.
 * Protected by middleware.ts - redirects unauthenticated users to sign-in.
 * 
 * Features:
 * - Theme Input Form with Material 3 inspired design tokens
 * - Live Theme Preview showing current organization's theme
 * - Fixed header with "Lumina Dashboard" branding
 * - User authentication integration with Clerk
 * - Form submission to API route for database storage
 * - Minimal design using only React, Next.js, and Tailwind CSS
 */
export default async function Dashboard() {
  // Get the current user from Clerk (server-side)
  const user = await currentUser();

  // Fetch the current organization's theme from database
  let currentTheme: any = null;
  if (user) {
    try {
      // Find the user in our database
      const dbUser = await prisma.user.findUnique({
        where: { clerkId: user.id },
        include: {
          ownedOrganizations: {
            include: {
              themes: {
                take: 1, // Get the first theme for this organization
                orderBy: {
                  updatedAt: 'desc' // Most recently updated theme
                }
              }
            }
          }
        }
      });

      // Get the theme from the user's organization
      if (dbUser?.ownedOrganizations?.[0]?.themes?.[0]) {
        const rawTheme = dbUser.ownedOrganizations[0].themes[0];
        // Convert database theme to proper Theme type
        currentTheme = {
          ...rawTheme,
          tokens: rawTheme.tokens as any // Cast JsonValue to ThemeTokens
        };
      }
    } catch (error) {
      console.error('Error fetching theme:', error);
      // Continue without theme - will show "no theme" message
    }
  }

  if (!user) {
    // This shouldn't happen due to middleware protection, but good to handle
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="text-gray-600 mt-2">Please sign in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider initialTheme={currentTheme}>
      <div className="min-h-screen bg-gray-50">
        {/* Fixed Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-10">
          <div className="flex justify-between items-center px-6 py-4">
            <h1 className="text-xl font-bold text-gray-900">Lumina Dashboard</h1>
            <UserButton 
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8"
                }
              }}
            />
          </div>
        </header>

        {/* Main Content - Theme Configuration Form */}
        <main className="pt-20 pb-8 px-4">
          <DashboardContent initialTheme={currentTheme} />
        </main>
      </div>
    </ThemeProvider>
  );
}