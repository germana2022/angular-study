# AGENTS.md - Agent Guidelines for angular-study

This file provides guidelines and commands for agentic coding agents working in this Angular project.

---

## Project Overview

- **Framework**: Angular 21 (latest)
- **Language**: TypeScript 5.9+
- **Package Manager**: npm
- **Style**: SCSS

---

## Commands

### Development

```bash
npm start           # Start dev server (hot reload)
npm run watch       # Build in watch mode (dev only)
npm run build       # Production build
npm test            # Run all tests (Karma + Jasmine)
ng test --watch     # Run tests in watch mode
ng test --include="**/my-component.spec.ts"  # Run single test file
ng test --coverage  # Run tests with coverage
ng test --watch=false  # Run tests in CI mode
```

---

## Code Style Guidelines

### TypeScript Configuration

- **Strict mode**: Enabled (`strict: true`)
- **No implicit override**: Enabled (`noImplicitOverride: true`)
- **No property access from index signature**: Enabled
- **No implicit returns**: Enabled (`noImplicitReturns: true`)
- **No fallthrough in switch**: Enabled
- **Strict templates**: Enabled
- **Target**: ES2022

### Formatting (Prettier)

- **Print width**: 100 characters
- **Quotes**: Single quotes (`'`)
- **Indentation**: 2 spaces

Run Prettier: `npx prettier --write .`

### EditorConfig

- **Charset**: UTF-8, **Indent**: 2 spaces, **Insert final newline**: true

---

## Angular Conventions

### Component Structure

```typescript
@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [...],
  templateUrl: './my-component.component.html',
  styleUrl: './my-component.component.scss'
})
export class MyComponent { }
```

### Naming Conventions

| Type              | Convention                       | Example                     |
| ----------------- | -------------------------------- | --------------------------- |
| Components        | kebab-case                       | `user-profile.component.ts` |
| Component classes | PascalCase                       | `UserProfileComponent`      |
| Services          | kebab-case + service             | `auth.service.ts`           |
| Service classes   | PascalCase + Service             | `AuthService`               |
| Interfaces/Types  | PascalCase                       | `UserModel`, `ApiResponse`  |
| Constants         | SCREAMING_SNAKE_CASE             | `MAX_RETRY_COUNT`           |
| Enums             | PascalCase (members UPPER_SNAKE) | `UserRole.ADMIN`            |

### Imports

- Use absolute imports starting with `@app/` for app code
- Use relative imports (`./`, `../`) for local components
- Group imports: Angular core → External → Internal

```typescript
// Good
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '@app/core/services/user.service';
import { User } from '@app/core/models';
```

### Templates

- Use Angular control flow (`@if`, `@for`, `@switch`) - new syntax
- Avoid `*ngIf` / `*ngFor` when possible
- Use strict typing in templates

---

## Error Handling

### RxJS Error Handling

```typescript
this.dataService
  .getData()
  .pipe(
    catchError((err) => {
      console.error('Error:', err);
      return of(fallbackValue);
    }),
  )
  .subscribe();
```

### HTTP Errors

```typescript
this.http.get<Data>('/api/data').pipe(
  catchError((error: HttpErrorResponse) => {
    if (error.status === 404) {
      /* Handle not found */
    }
    return throwError(() => error);
  }),
);
```

---

## Project Structure

```
src/
├── app/
│   ├── core/        # Singleton services, guards, interceptors
│   ├── shared/      # Shared components, pipes, directives
│   ├── features/    # Feature modules (lazy-loaded)
│   ├── layout/      # Layout components
│   └── demos/       # Demo components
├── assets/          # Static assets
├── styles.scss      # Global styles
└── main.ts          # Bootstrap
```

- Use **standalone components** (default in Angular 15+)
- Lazy-load routes using `loadComponent` or `loadChildren`

---

## Best Practices

1. **Avoid `any`**: Use proper types or `unknown` with type guards
2. **Use `const` over `let`**: Prefer immutable patterns
3. **OnPush change detection**: Use for better performance
4. **Destroy subscriptions**: Use `takeUntilDestroyed()` or unsubscribe
5. **TrackBy in loops**: Always use trackBy for `@for` loops
6. **Async pipe**: Use `AsyncPipe` to handle subscriptions automatically
7. **Strict null checks**: Handle null/undefined explicitly

---

## Common CLI Commands

```bash
ng g c components/my-component  # Generate component
ng g s services/my-service       # Generate service
ng g g guards/my-guard          # Generate guard
ng g interface models/my-model  # Generate interface
```

---

## Testing

This project uses Jasmine + Karma for testing.

### Commands

```bash
npm test                    # Run all tests (Karma + Jasmine)
ng test --watch            # Run tests in watch mode
ng test --include="**/my-component.spec.ts"  # Run single test file
ng test --coverage         # Run tests with coverage
ng test --watch=false      # Run tests in CI mode
```

### Test Files

- Tests use `.spec.ts` extension
- Test configuration: `karma.conf.js`
- Test specs: `src/app/core/data/topics.data.spec.ts` (validates interview answers)

### What is tested

- All 33 topics have interview questions
- Each topic has `interviewAnswerShort` (1-2 sentences)
- Each topic has `interviewAnswerStructured` (detailed with code examples)
- Topics are organized in 7 categories

---

## Additional Notes

- No ESLint configuration (not installed)
- Prettier is installed for formatting
- Tests are NOT generated by default for new items (configured in angular.json)
- Project uses Angular Signals for reactivity
