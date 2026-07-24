# Claude Code Rules

## Stack

- Node.js (LTS)
- TypeScript (strict mode)
- React (Vite for standalone drills, Next.js for capstone)
- Git + GitHub

## Coding Rules

- Use ES6+ and TypeScript — no `any` types unless explicitly justified in a comment
- Use async/await for all asynchronous operations
- Follow Conventional Commits (e.g. `feat:`, `fix:`, `chore:`, `docs:`)
- Extract reusable components into their own files with typed props interfaces

## Project Conventions

- Follow Conventional Commits.
- Keep functions small and readable.
- Explain AI-generated code before using it.
- Update documentation whenever features change.
- Use precise prompts with file references, constraints, and verification steps.

## Form Handling Rules (learned from FE-03 drill)

These rules apply to every form component in the project. They were established during the vague-vs-precise prompt drill and are non-negotiable going forward.

1. **Validate on blur AND on submit** — never only on submit. Users must see inline feedback the moment they leave a field, not only after clicking the submit button.

2. **Email validation must accept plus-addressing** — patterns like `name+tag@domain.com` are valid. Use a regex that allows `+` in the local part (e.g. `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`). Never use a regex that restricts the local part to `[a-zA-Z0-9]` only.

3. **Whitespace-only input must be rejected the same as empty input** — always `.trim()` text values before validation. A name field containing only spaces is not a valid name.

4. **Every form input needs a linked `<label>` (via `htmlFor`/`id`) and an `aria-describedby` pointing to its error message element** — error messages must be rendered in a `<span>` with `role="alert"`, not via native browser tooltips or `title` attributes.

5. **Every new form feature ships with tests** — at minimum, test these cases: empty submission, whitespace-only text input, invalid format input, valid edge-case input (e.g. plus-addressed email), and a full successful submission. Use Vitest + React Testing Library.

6. **Forms use `noValidate` on the `<form>` element** — we handle all validation ourselves; native browser validation bubbles are inconsistent and inaccessible.

7. **Trim text inputs before passing to `onSubmit`** — the parent component should receive cleaned data, not raw input with leading/trailing whitespace.