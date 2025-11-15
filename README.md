# Instagram Profile Clone - React Native + Expo

A production-ready profile screen implementation with clean architecture and proper separation of concerns.

## Quick Start

```bash
npm install
npm start
```

Then press `a` for Android, `i` for iOS, or scan the QR code with Expo Go.

## Design Decisions

### Custom Hooks
Separated all data fetching into custom hooks (`useProfile`, `usePosts`, `useRefresh`) instead of cluttering components with API logic. Makes components cleaner and logic reusable.

### Service Layer
Built a proper API service layer even though we're using mocks. The `profileService` abstracts data fetching - swapping mocks for real endpoints is literally changing one function implementation. No component code needs to touch.

### Theme System
Centralized colors, spacing, and typography in `src/theme/`. Means I can tweak the entire app's look from one place, and it's trivial to add dark mode later.

### Component Architecture
Split into presentational (dumb UI) and container (smart logic) components. ProfileScreen orchestrates everything, presentational components just render what they're told.

## Mocking Approach

Using promise-based mocks with simulated delays:

```typescript
async getUserProfile() {
  return new Promise(resolve =>
    setTimeout(() => resolve(mockData), 500)
  );
}
```

This mimics real async behavior so loading states actually work. To switch to real APIs, just update the service functions to use the `apiClient`:

```typescript
async getUserProfile(userId: string) {
  return apiClient.get<UserProfile>(API_ENDPOINTS.profile.getProfile(userId));
}
```

The entire rest of the app stays the same.

## Tradeoffs & TODOs

**What I'd add with more time:**

- **Error UI** - Currently errors just log to console. Need proper error boundaries and user-facing messages.
- **Loading skeletons** - Have basic loading states but skeleton screens would be slicker.
- **Caching** - Add a proper cache layer (React Query or Zustand) to avoid refetching data unnecessarily.
- **Tests** - No tests yet. Would add Jest for hooks and React Testing Library for components.
- **Accessibility** - Missing screen reader labels and proper focus management.
- **Optimistic updates** - Like/follow actions should update UI immediately, not wait for API.

**Tradeoffs made:**

- Used `StyleSheet.create` instead of styled-components to avoid extra dependencies
- Single screen implementation to focus on quality over quantity
- Mock data means no real auth/error scenarios demonstrated

## Structure

```
src/
├── components/     # Reusable UI components
├── screens/        # Screen containers
├── hooks/          # Custom hooks for data fetching
├── services/       # API layer (currently mocked)
├── theme/          # Design tokens
└── types/          # TypeScript definitions
```

## Tech Stack

- React Native + Expo SDK 54
- TypeScript
- expo-image (better performance than Image)
- Custom hooks pattern
- Service layer architecture

## Key Files

- [ProfileScreen.tsx](src/screens/ProfileScreen.tsx) - Main container
- [useProfile.ts](src/hooks/useProfile.ts) - Profile data hook
- [profileService.ts](src/services/api/profileService.ts) - API service
- [theme/index.ts](src/theme/index.ts) - Design system