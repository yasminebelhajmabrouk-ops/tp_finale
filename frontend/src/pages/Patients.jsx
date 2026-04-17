import ResourcePage from '../components/ResourcePage';
import { patientsAPI } from '../api/client';
import { FiUsers } from 'react-icons/fi';

export default function Patients() {
  const columns = [
    { 
      label: 'Nom Complet', 
      key: 'last_name', 
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className={`gender-avatar ${p.gender?.toLowerCase()}`}>
            {p.gender?.[0]?.toUpperCase() || '?'}
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            {p.last_name.toUpperCase()} {p.first_name}
          </span>
        </div>
      )
    },
    { label: 'Date de Naissance', key: 'birth_date' },
    { 
      label: 'Genre', 
      key: 'gender',
      render: (p) => (
        <span className={`badge ${p.gender?.toLowerCase() === 'male' ? 'badge-blue' : 'badge-pink'}`}>
          {p.gender === 'male' ? 'Homme' : p.gender === 'female' ? 'Femme' : p.gender}
        </span>
      )
    },
  ];

  const formFields = [
    { name: 'first_name', label: 'Prénom', required: true, placeholder: 'Ex: Jean' },
    { name: 'last_name', label: 'Nom', required: true, placeholder: 'Ex: Dupont' },
    { name: 'birth_date', label: 'Date de Naissance', type: 'date', required: true },
    { 
      name: 'gender', 
      label: 'Genre', 
      type: 'select', 
      required: true,
      options: [
        { value: 'male', label: 'Homme' },
        { value: 'female', label: 'Femme' },
        { value: 'other', label: 'Autre' }
      ]
    },
  ];

  return (
    <ResourcePage
      title="Patients"
      icon={<FiUsers />}
      api={patientsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="blue"
    />
  );
}
