import ResourcePage from '../components/ResourcePage';
import { encountersAPI } from '../api/client';
import { FiCalendar } from 'react-icons/fi';

export default function Encounters() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (e) => <span className="badge badge-blue">#{e.patient}</span> },
    { label: 'Praticien ID', key: 'practitioner', render: (e) => <span className="badge badge-green">#{e.practitioner}</span> },
    { label: 'Raison', key: 'reason' },
    { label: 'Date', key: 'date', render: (e) => new Date(e.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'practitioner', label: 'ID Praticien', type: 'number', required: true },
    { name: 'reason', label: 'Raison de la consultation', placeholder: 'Ex: Examen de routine' },
  ];

  return (
    <ResourcePage
      title="Consultations"
      icon={<FiCalendar />}
      api={encountersAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="amber"
    />
  );
}
