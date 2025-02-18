import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/','/sign-in','/sign-up','/api/user', '/dashboard']); 
const isPrivateRoute= createRouteMatcher(['/api/addcard', '/api/addpass','/api/addupi'])
export default clerkMiddleware(async (auth, request) => {
  const {userId}=await auth();
  // Prevent infinite redirects: Allow public routes without forcing login
  if (!isPublicRoute(request)) {
    return null
    // return (await auth()).redirectToSignIn({returnBackUrl:"/"});// Require authentication for non-public routes
  }
  if(isPrivateRoute(request) && !userId){
    return Response.redirect(new URL('/sign-in', request.url));
  }

  return null;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
