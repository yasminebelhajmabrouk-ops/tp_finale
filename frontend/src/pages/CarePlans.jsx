import ResourcePage from '../components/ResourcePage';
import { carePlansAPI } from '../api/client';
import { FiClipboard } from 'react-icons/fi';

export default function CarePlans() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (c) => <span className="badge badge-blue">#{c.patient}</span> },
    { label: 'Description', key: 'description' },
    { 
      label: 'Période', 
      key: 'start_date', 
      render: (c) => (
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {c.start_date} → {c.end_date || 'En cours'}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'description', label: 'Description du plan de soins', type: 'textarea', required: true },
    { name: 'start_date', label: 'Date de Début', type: 'date', required: true },
    { name: 'end_date', label: 'Date de Fin (Optionnel)', type: 'date' },
  ];

  return (
    <ResourcePage
      title="Plans de soins"
      icon={<FiClipboard />}
      api={carePlansAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="blue"
    />
  );
}
