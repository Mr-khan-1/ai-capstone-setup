import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SettingsForm from './SettingsForm'

describe('SettingsForm', () => {
  it('shows errors on empty submission', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
    expect(screen.getByText('Email is required.')).toBeInTheDocument()
    expect(screen.getByText('Password is required.')).toBeInTheDocument()
  })

  it('rejects whitespace-only name', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/name/i), '   ')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
  })

  it('rejects invalid email', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/email/i), 'not-an-email')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument()
  })

  it('accepts valid plus-addressed email', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<SettingsForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText(/name/i), 'Jane Doe')
    await user.type(screen.getByLabelText(/email/i), 'jane+tag@example.com')
    await user.type(screen.getByLabelText(/password/i), 'secure1pass')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument()
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Jane Doe',
      email: 'jane+tag@example.com',
      password: 'secure1pass',
      notifications: false,
    })
  })

  it('rejects short password', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/password/i), 'abc1')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Password must be at least 8 characters.')).toBeInTheDocument()
  })

  it('rejects password without a number', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    await user.type(screen.getByLabelText(/password/i), 'abcdefgh')
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(screen.getByText('Password must contain at least 1 number.')).toBeInTheDocument()
  })

  it('calls onSubmit with trimmed data on successful submit', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()
    render(<SettingsForm onSubmit={handleSubmit} />)

    await user.type(screen.getByLabelText(/name/i), '  Alice  ')
    await user.type(screen.getByLabelText(/email/i), 'alice@example.com')
    await user.type(screen.getByLabelText(/password/i), 'password1')
    await user.click(screen.getByLabelText(/notifications/i))
    await user.click(screen.getByRole('button', { name: /save settings/i }))

    expect(handleSubmit).toHaveBeenCalledTimes(1)
    expect(handleSubmit).toHaveBeenCalledWith({
      name: 'Alice',
      email: 'alice@example.com',
      password: 'password1',
      notifications: true,
    })
  })

  it('validates on blur before submit', async () => {
    const user = userEvent.setup()
    render(<SettingsForm />)

    const nameInput = screen.getByLabelText(/name/i)
    await user.click(nameInput)
    await user.tab() // blur

    expect(screen.getByText('Name is required.')).toBeInTheDocument()
  })
})
