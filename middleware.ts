import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define protected routes - /app pages require authentication, but exclude API routes
const isProtectedRoute = createRouteMatcher(['/app']);
const isApiRoute = createRouteMatcher(['/api(.*)', '/app/api(.*)']);

export default clerkMiddleware(async (auth, req) => {
  // Don't protect API routes - they handle their own authentication
  if (isApiRoute(req)) {
    return;
  }
  
  if (isProtectedRoute(req)) {
    // Redirect to sign-in if user is not authenticated and trying to access protected routes
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};