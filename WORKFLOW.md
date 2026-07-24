# AI workflow comparison: vague vs precise prompting

This repository demonstrates the difference between a vague AI prompt and a precise, verification-first prompt for a small capstone feature: a settings form with validation. The first round was built from a broad request that accepted the initial output without much review. The second round used a more deliberate workflow with explicit file targets, behavioral constraints, and an instruction to write tests and run them before considering the work complete.

The main difference was not just the final UI, but the quality of the implementation process. In the vague round, the form was created quickly, but it lacked a strong structure for accessibility, error handling, and regression testing. In the precise round, the work was broken into clear steps: inspect the existing files, implement the form, add targeted tests for empty submission, whitespace-only names, invalid emails, plus-addressing, short passwords, and successful submission, and verify the result by running the suite.

From a correctness perspective, the refined version is stronger because it validates user input more deliberately and ensures the form only submits when the requirements are satisfied. Accessibility also improved because the form uses proper labels, descriptive error text, and a more consistent relationship between controls and feedback. Edge cases such as whitespace-only names, invalid email syntax, and weak passwords are handled explicitly rather than relying on the model to infer them from a generic request.

The review effort was noticeably lower in the precise round. Because the implementation included tests and a clear acceptance checklist, it was faster to verify whether the feature behaved as intended. That is the key lesson: AI can generate working code quickly, but the real skill is guiding it with precise requirements, reviewing the result, and verifying that the behavior holds under tests.

This workflow is useful for capstone work because it makes the difference between "using AI" and "directing AI" visible. The latter produces more reliable, reviewable, and maintainable results.
