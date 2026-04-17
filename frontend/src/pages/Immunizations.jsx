import ResourcePage from '../components/ResourcePage';
import { immunizationsAPI } from '../api/client';
import { FiHeart } from 'react-icons/fi';

export default function Immunizations() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (i) => <span className="badge badge-blue">#{i.patient}</span> },
    { label: 'Vaccin', key: 'vaccine', render: (i) => <span style={{ fontWeight: 600 }}>{i.vaccine}</span> },
    { label: 'Date', key: 'date', render: (i) => new Date(i.date).toLocaleDateString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'vaccine', label: 'Nom du Vaccin', required: true, placeholder: 'Ex: BCG, COVID-19' },
  ];

  return (
    <ResourcePage
      title="Vaccinations"
      icon={<FiHeart />}
      api={immunizationsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="green"
    />
  );
}
