import { useState } from 'react';
import Input from './components/Input';
import './styles.css';

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="card">
      <h4>{title}</h4>
      <div className="example-row">{children}</div>
    </div>
  );
}

export default function App() {
  const [material, setMaterial] = useState('Aluminium');

  return (
    <div className="app">
      <div className="badge">DK2 Input demo</div>
      <p className="small-note">
        Базовый контрол с плавающим лейблом, кастомным описанием и состояниями
        default / error / disabled / read.
      </p>

      <h3 className="section-title">Default</h3>
      <div className="grid">
        <Card title="M — контролируемый">
          <Input
            label="Материал детали"
            description="Description"
            placeholder="Placeholder"
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
          />
        </Card>
        <Card title="S — с prefix / suffix">
          <Input
            label="Материал детали"
            description="Description"
            size="s"
            defaultValue="Cuprum"
            prefix={<span>№1</span>}
            suffix={<span>↔</span>}
          />
        </Card>
        <Card title="L — placeholder">
          <Input
            label="Материал детали"
            description="Description"
            size="l"
            placeholder="Placeholder"
          />
        </Card>
      </div>

      <h3 className="section-title">Error</h3>
      <div className="grid">
        <Card title="С текстом">
          <Input
            label="Материал детали"
            description="Описание ошибки"
            status="error"
            defaultValue="Cuprum"
          />
        </Card>
        <Card title="Пустое поле">
          <Input label="Материал детали" status="error" placeholder="Placeholder" />
        </Card>
      </div>

      <h3 className="section-title">Disabled</h3>
      <div className="grid">
        <Card title="Заполненный">
          <Input
            label="Материал детали"
            description="Description"
            defaultValue="Aluminium"
            disabled
          />
        </Card>
        <Card title="Пустой">
          <Input label="Материал детали" placeholder="Placeholder" disabled />
        </Card>
      </div>

      <h3 className="section-title">Read (data-display)</h3>
      <div className="grid">
        <Card title="Плотная ячейка">
          <Input
            label="Материал детали"
            description="Используется в таблице"
            value="Aluminium"
            read
            size="s"
          />
        </Card>
        <Card title="Широкий текст">
          <Input
            label="Материал детали"
            description="Description"
            value="A longer read-only value"
            read
            size="l"
          />
        </Card>
      </div>
    </div>
  );
}
