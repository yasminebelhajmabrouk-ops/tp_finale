import ResourcePage from '../components/ResourcePage';
import { medicationRequestsAPI } from '../api/client';
import { FiFileText } from 'react-icons/fi';

export default function MedicationRequests() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (r) => <span className="badge badge-blue">#{r.patient}</span> },
    { label: 'Médicament ID', key: 'medication', render: (r) => <span className="badge badge-pink">#{r.medication}</span> },
    { label: 'Dosage', key: 'dosage' },
    { label: 'Date', key: 'date', render: (r) => new Date(r.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'medication', label: 'ID Médicament', type: 'number', required: true },
    { name: 'dosage', label: 'Posologie / Dosage', required: true, placeholder: 'Ex: 1 comprimé midi et soir' },
  ];

  return (
    <ResourcePage
      title="Prescriptions"
      icon={<FiFileText />}
      api={medicationRequestsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="amber"
    />
  );
}
