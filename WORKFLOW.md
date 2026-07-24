# AI workflow comparison: vague vs precise prompting

This repository demonstrates the difference between a vague AI prompt and a precise, verification-first prompt for a small capstone feature: a settings form with validation. The first round was built from a broad request that accepted the initial output without much review. The second round used a more deliberate workflow with explicit file targets, behavioral constraints, and an instruction to write tests and run them before considering the work complete.

The main difference was not just the final UI, but the quality of the implementation process. In the vague round, the form was created quickly, but it lacked a strong structure for accessibility, error handling, and regression testing. In the precise round, the work was broken into clear steps: inspect the existing files, implement the form, add targeted tests for empty submission, whitespace-only names, invalid emails, plus-addressing, short passwords, and successful submission, and verify the result by running the suite.

From a correctness perspective, the refined version is stronger because it validates user input more deliberately and ensures the form only submits when the requirements are satisfied. Accessibility also improved because the form uses proper labels, descriptive error text, and a more consistent relationship between controls and feedback. Edge cases such as whitespace-only names, invalid email syntax, and weak passwords are handled explicitly rather than relying on the model to infer them from a generic request.

The review effort was noticeably lower in the precise round. Because the implementation included tests and a clear acceptance checklist, it was faster to verify whether the feature behaved as intended. That is the key lesson: AI can generate working code quickly, but the real skill is guiding it with precise requirements, reviewing the result, and verifying that the behavior holds under tests.

This workflow is useful for capstone work because it makes the difference between "using AI" and "directing AI" visible. The latter produces more reliable, reviewable, and maintainable results.

---

## React implementation + honest note on Round 1

We repeated the vague-vs-precise drill in React + TypeScript (Vite scaffold in `drill/`) to align with the rest of the capstone track, which is built on React/Next.js.

### Honest note on Round 1

Even with a genuinely lazy one-sentence prompt ("Make me a settings form"), the AI produced a structurally reasonable component: it used `useState` for each field, `e.preventDefault()` on submit, and a clean JSX layout. This is worth calling out because the assignment brief expects the vague round to come out noticeably worse, but modern AI models have internalized enough best practices that a bare-minimum prompt still yields a "good enough" form. **We are documenting this honestly rather than pretending Round 1 was broken** — the lesson is that the gaps are subtler than "it doesn't work at all."

### Concrete gaps in Round 1 vs Round 2

Despite Round 1's superficial polish, diffing the two branches reveals real, meaningful gaps:

1. **No validation at all.** Round 1 has zero validation — the form accepts empty fields, whitespace-only names, invalid emails, and short passwords without complaint. Round 2 validates every field against explicit rules (name must be non-empty after trim, email must match a pattern that accepts plus-addressing, password needs ≥8 chars and ≥1 digit).

2. **No blur-time feedback.** Round 1 only does anything on submit (an `alert()`). Round 2 validates on blur AND on submit, so users see errors the moment they leave a field.

3. **No `aria-describedby` or `aria-invalid`.** Round 1 labels exist but are not linked to inputs via `htmlFor`/`id`, and there are no error regions with `role="alert"`. Round 2 links every `<label>` to its input via `htmlFor`, and every input has `aria-describedby` pointing to its error `<span>` with `role="alert"`.

4. **No tests.** Round 1 ships with zero test files. Round 2 includes 8 Vitest + React Testing Library tests covering: empty submission, whitespace-only name, invalid email, valid plus-addressed email, short password, password without a number, successful submit with trimmed data, and blur validation.

5. **No component separation.** Round 1 puts everything in `App.tsx`. Round 2 extracts a `SettingsForm` component with a typed `onSubmit` prop, making it reusable and testable in isolation.

6. **No input trimming.** Round 1 passes raw input values through. Round 2 trims `name` and `email` before submitting, so `"  Alice  "` becomes `"Alice"`.

### AI mistake caught during the drill

During Round 2 development, the initial email validation regex used a pattern that would have rejected plus-addressed emails like `name+tag@domain.com` — the `+` character was not accounted for in the character class. This was caught because the prompt explicitly required plus-addressing support and the test for `jane+tag@example.com` was written before the regex was finalized. The regex was corrected to `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`, which accepts any non-whitespace, non-`@` characters (including `+`) in the local part. Without the explicit constraint and pre-written test, this would have shipped broken.

### Takeaway

The real value of the precise prompt was not that it made the code "work" (Round 1 technically worked too, for zero-validation definitions of "worked") — it was that it defined what "correct" means and shipped proof that correctness holds. Round 2's review effort was near-zero because the tests did the reviewing. Round 1 would have required manual testing of every edge case, and most of them would have been missed.

*Word count for this section: ~480 words*
