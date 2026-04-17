import ResourcePage from '../components/ResourcePage';
import { medicationsAPI } from '../api/client';
import { FiPackage } from 'react-icons/fi';

export default function Medications() {
  const columns = [
    { label: 'Nom du Médicament', key: 'name', render: (m) => <span style={{ fontWeight: 600 }}>{m.name}</span> },
    { label: 'Code', key: 'code', render: (m) => <code style={{ color: 'var(--accent-primary)' }}>{m.code}</code> },
  ];

  const formFields = [
    { name: 'name', label: 'Nom', required: true, placeholder: 'Ex: Paracétamol' },
    { name: 'code', label: 'Code Médicament', required: true, placeholder: 'Ex: PARA-500' },
  ];

  return (
    <ResourcePage
      title="Médicaments"
      icon={<FiPackage />}
      api={medicationsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="pink"
    />
  );
}
