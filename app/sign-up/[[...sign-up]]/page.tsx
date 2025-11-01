import { SignUp } from "@clerk/nextjs";

/**
 * Sign-Up Page Component
 * 
 * Uses Clerk's <SignUp /> component to handle user registration.
 * The [[...sign-up]] folder structure creates a catch-all route that
 * handles all sign-up related paths automatically.
 * 
 * Routes handled:
 * - /sign-up
 * - /sign-up/verify-email-address
 * - /sign-up/continue
 * - etc.
 */
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Join Lumina
          </h1>
          <p className="text-gray-600">
            Create your account and start building your design system
          </p>
        </div>
        <SignUp 
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