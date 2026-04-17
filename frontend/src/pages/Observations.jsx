import ResourcePage from '../components/ResourcePage';
import { observationsAPI } from '../api/client';
import { FiActivity } from 'react-icons/fi';

export default function Observations() {
  const columns = [
    { label: 'Code', key: 'code', render: (o) => <code style={{ color: 'var(--accent-secondary)' }}>{o.code}</code> },
    { 
      label: 'Valeur', 
      key: 'value', 
      render: (o) => (
        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
          {o.value} {o.unit}
        </span>
      )
    },
    { label: 'Patient ID', key: 'patient', render: (o) => <span className="badge badge-blue">#{o.patient}</span> },
    { label: 'Date', key: 'date', render: (o) => new Date(o.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'code', label: 'Code (LOINC/Local)', required: true, placeholder: 'Ex: 85354-9' },
    { name: 'value', label: 'Valeur', required: true, placeholder: 'Ex: 120' },
    { name: 'unit', label: 'Unité', placeholder: 'Ex: mmHg' },
  ];

  return (
    <ResourcePage
      title="Observations"
      icon={<FiActivity />}
      api={observationsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="purple"
    />
  );
}
