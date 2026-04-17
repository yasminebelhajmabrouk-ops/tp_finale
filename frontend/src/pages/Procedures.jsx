import ResourcePage from '../components/ResourcePage';
import { proceduresAPI } from '../api/client';
import { FiScissors } from 'react-icons/fi';

export default function Procedures() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (p) => <span className="badge badge-blue">#{p.patient}</span> },
    { label: 'Code', key: 'code', render: (p) => <code style={{ color: 'var(--accent-secondary)' }}>{p.code}</code> },
    { label: 'Description', key: 'description' },
    { label: 'Date', key: 'date', render: (p) => new Date(p.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'code', label: 'Code Procédure', required: true, placeholder: 'Ex: APPEND-01' },
    { name: 'description', label: 'Détails de l\'acte', type: 'textarea' },
  ];

  return (
    <ResourcePage
      title="Procédures"
      icon={<FiScissors />}
      api={proceduresAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="pink"
    />
  );
}
