import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          le compte est {count}
        </button>
        <p>
          Modifie <code>src/App.jsx</code> et sauvegarde le test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Clique dessus pour obtenir des recettes encore plus folles.
      </p>
    </>
  )
}

export default App
