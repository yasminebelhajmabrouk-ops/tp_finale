import ResourcePage from '../components/ResourcePage';
import { conditionsAPI } from '../api/client';
import { FiAlertCircle } from 'react-icons/fi';

export default function Conditions() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (c) => <span className="badge badge-blue">#{c.patient}</span> },
    { label: 'Code', key: 'code', render: (c) => <code style={{ color: 'var(--accent-danger)' }}>{c.code}</code> },
    { label: 'Description', key: 'description' },
    { label: 'Date', key: 'date', render: (c) => new Date(c.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'code', label: 'Code Diagnostic', required: true, placeholder: 'Ex: HTA, DIAB-2' },
    { name: 'description', label: 'Description', type: 'textarea' },
  ];

  return (
    <ResourcePage
      title="Conditions"
      icon={<FiAlertCircle />}
      api={conditionsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="red"
    />
  );
}
