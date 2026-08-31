import { useState } from 'react'

interface FormData {
  name: string
  email: string
  password: string
  notifications: boolean
}

interface FormErrors {
  name?: string
  email?: string
  password?: string
}

interface TouchedFields {
  name: boolean
  email: boolean
  password: boolean
}

/**
 * Validates a single field and returns an error message or undefined.
 * - name: required, non-empty after trim
 * - email: required, valid format, must accept plus-addressing (e.g. name+tag@domain.com)
 * - password: required, min 8 characters, at least 1 number
 */
function validateField(field: keyof FormErrors, value: string): string | undefined {
  switch (field) {
    case 'name': {
      if (!value.trim()) return 'Name is required.'
      return undefined
    }
    case 'email': {
      if (!value.trim()) return 'Email is required.'
      // RFC-compatible pattern that accepts plus-addressing like name+tag@domain.com
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailPattern.test(value.trim())) return 'Please enter a valid email address.'
      return undefined
    }
    case 'password': {
      if (!value) return 'Password is required.'
      if (value.length < 8) return 'Password must be at least 8 characters.'
      if (!/\d/.test(value)) return 'Password must contain at least 1 number.'
      return undefined
    }
    default:
      return undefined
  }
}

function validateAll(data: FormData): FormErrors {
  return {
    name: validateField('name', data.name),
    email: validateField('email', data.email),
    password: validateField('password', data.password),
  }
}

export interface SettingsFormProps {
  onSubmit?: (data: FormData) => void
}

export default function SettingsForm({ onSubmit }: SettingsFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    notifications: false,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({
    name: false,
    email: false,
    password: false,
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Re-validate on change if the field was already touched or form was submitted
    if (touched[field as keyof TouchedFields] || submitted) {
      const error = validateField(field as keyof FormErrors, value as string)
      setErrors((prev) => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: keyof FormErrors) => {
    setTouched((prev) => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)

    const validationErrors = validateAll(formData)
    setErrors(validationErrors)

    // Mark all fields as touched on submit
    setTouched({ name: true, email: true, password: true })

    const hasErrors = Object.values(validationErrors).some((err) => err !== undefined)
    if (hasErrors) return

    onSubmit?.({
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    })
  }

  /** Helper: should we show an error for this field? */
  const showError = (field: keyof FormErrors) =>
    (touched[field] || submitted) && errors[field]

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* ---- Name ---- */}
      <div className="field">
        <label htmlFor="settings-name">Name</label>
        <input
          id="settings-name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          onBlur={() => handleBlur('name')}
          aria-describedby="settings-name-error"
          aria-invalid={!!showError('name')}
        />
        <span id="settings-name-error" className="error" role="alert">
          {showError('name') ? errors.name : ''}
        </span>
      </div>

      {/* ---- Email ---- */}
      <div className="field">
        <label htmlFor="settings-email">Email</label>
        <input
          id="settings-email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          aria-describedby="settings-email-error"
          aria-invalid={!!showError('email')}
        />
        <span id="settings-email-error" className="error" role="alert">
          {showError('email') ? errors.email : ''}
        </span>
      </div>

      {/* ---- Password ---- */}
      <div className="field">
        <label htmlFor="settings-password">Password</label>
        <input
          id="settings-password"
          type="password"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          onBlur={() => handleBlur('password')}
          aria-describedby="settings-password-error"
          aria-invalid={!!showError('password')}
        />
        <span id="settings-password-error" className="error" role="alert">
          {showError('password') ? errors.password : ''}
        </span>
      </div>

      {/* ---- Notifications ---- */}
      <div className="field field--checkbox">
        <input
          id="settings-notifications"
          type="checkbox"
          checked={formData.notifications}
          onChange={(e) => handleChange('notifications', e.target.checked)}
        />
        <label htmlFor="settings-notifications">
          Enable notifications
        </label>
      </div>

      <button id="submit-button" type="submit">Save Settings</button>
    </form>
  )
}
