import ResourcePage from '../components/ResourcePage';
import { allergiesAPI } from '../api/client';
import { FiShield } from 'react-icons/fi';

export default function Allergies() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (a) => <span className="badge badge-blue">#{a.patient}</span> },
    { label: 'Substance', key: 'substance', render: (a) => <span style={{ fontWeight: 600 }}>{a.substance}</span> },
    { label: 'Réaction', key: 'reaction', render: (a) => <span className="badge badge-red">{a.reaction}</span> },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'substance', label: 'Substance', required: true, placeholder: 'Ex: Pénicilline, Arachides' },
    { name: 'reaction', label: 'Type de réaction', placeholder: 'Ex: Éruption cutanée, Choc anaphylactique' },
  ];

  return (
    <ResourcePage
      title="Allergies"
      icon={<FiShield />}
      api={allergiesAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="red"
    />
  );
}
