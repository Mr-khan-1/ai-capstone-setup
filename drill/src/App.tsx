import SettingsForm from './SettingsForm'
import './App.css'

function App() {
  const handleSubmit = (data: { name: string; email: string; password: string; notifications: boolean }) => {
    console.log('Settings saved:', data)
    alert(`Settings saved for ${data.name}!`)
  }

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <SettingsForm onSubmit={handleSubmit} />
    </div>
  )
}

export default App
