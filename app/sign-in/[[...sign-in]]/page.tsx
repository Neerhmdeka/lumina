import { SignIn } from "@clerk/nextjs";

/**
 * Sign-In Page Component
 * 
 * Uses Clerk's <SignIn /> component to handle user authentication.
 * The [[...sign-in]] folder structure creates a catch-all route that
 * handles all sign-in related paths automatically.
 * 
 * Routes handled:
 * - /sign-in
 * - /sign-in/factor-one
 * - /sign-in/factor-two
 * - etc.
 */
export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to Lumina
          </h1>
          <p className="text-gray-600">
            Sign in to your design system workspace
          </p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "shadow-lg"
            }
          }}
        />
      </div>
    </div>
  );
}