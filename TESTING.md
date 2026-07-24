# Manual test checklist

1. Empty submission
   - Leave all fields blank and click Save.
   - Expect: submit stays disabled or shows validation errors for the required fields.

2. Whitespace-only name
   - Enter spaces in the Name field, blur it, and submit.
   - Expect: an error appears and the form is not accepted.

3. Invalid email
   - Enter an address such as `invalid-email` or `name@domain` and blur.
   - Expect: an error appears below the email field.

4. Valid + email addressing
   - Enter `name+tag@gmail.com` and blur.
   - Expect: no email error appears.

5. Short password
   - Enter `Abc123` and blur.
   - Expect: an error appears saying the password must be at least 8 characters.

6. Successful submit
   - Enter a valid name, a valid email, a password with at least 8 characters and one number, then submit.
   - Expect: the submit button becomes enabled, the form submits, and a success message appears.
