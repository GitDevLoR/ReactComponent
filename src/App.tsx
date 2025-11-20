import { useState } from 'react';
import Input from './components/Input';
import './styles.css';

const CornersIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.4">
    <path d="M4.5 1.5H1.5v3" />
    <path d="M13.5 1.5h3v3" />
    <path d="M4.5 16.5H1.5v-3" />
    <path d="M13.5 16.5h3v-3" />
  </svg>
);

export default function App() {
  const [metal, setMetal] = useState('Aluminium');

  return (
    <div className="app">
      <div className="card">
        <p className="card-title">M — контролируемый</p>
        <Input
          size="m"
          label="Материал детали"
          description="Description"
          value={metal}
          onChange={(event) => setMetal(event.target.value)}
          prefix={<CornersIcon />}
          suffix={<CornersIcon />}
        />
      </div>

      <div className="card">
        <p className="card-title">S — с prefix / suffix</p>
        <Input
          size="s"
          label="Материал детали"
          description="Description"
          defaultValue="Cuprum"
          prefix={<CornersIcon />}
          suffix={
            <button type="button" className="icon-button" aria-label="Очистить">
              +
            </button>
          }
        />
      </div>

      <div className="card">
        <p className="card-title">L — placeholder</p>
        <Input
          size="l"
          label="Материал детали"
          description="Description"
          placeholder="Placeholder"
          prefix={<CornersIcon />}
          suffix={<CornersIcon />}
        />
      </div>
    </div>
  );
}
