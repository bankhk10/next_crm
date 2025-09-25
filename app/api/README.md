Place server-side API handlers and route modules here.

Guidelines:

- Use Next.js App Router route handlers (e.g., `route.ts`) for REST endpoints when appropriate.
- For server actions (used by client components as form actions), keep them in subfolders like `app/api/auth/actions.ts`.
- If you move an existing server action, consider adding a compatibility re-export (like `app/actions/auth.ts`) to avoid breaking imports.
- Export types alongside actions where useful (e.g., `LoginState`).

Examples:

- `app/api/auth/actions.ts` - login/logout server actions used by the login form.
- `app/api/customers/route.ts` - REST handlers for customers.

This folder is intended to centralize server-side endpoints and make imports and structure clearer.