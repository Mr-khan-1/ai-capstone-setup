import SettingsForm from './SettingsForm'
import './App.css'

function App() {
  const handleSubmit = (data: { name: string; email: string; password: string; notifications: boolean }) => {
    console.log('Settings saved:', data)
    alert(`Settings saved for ${data.name}!`)
  }

  return (
    <main className="page">
      <section className="card" aria-labelledby="settings-title">
        <div className="card__header">
          <p className="eyebrow">Preferences</p>
          <h1 id="settings-title">Account settings</h1>
          <p className="subtitle">Update your profile details and keep your account secure.</p>
        </div>
        <SettingsForm onSubmit={handleSubmit} />
      </section>
    </main>
  )
}

export default App
