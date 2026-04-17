import ResourcePage from '../components/ResourcePage';
import { practitionersAPI } from '../api/client';
import { FiUserCheck } from 'react-icons/fi';

export default function Practitioners() {
  const columns = [
    { 
      label: 'Praticien', 
      key: 'last_name', 
      render: (p) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="gender-avatar male" style={{ background: 'var(--gradient-success)', color: 'white' }}>
            DR
          </div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
            Dr. {p.first_name} {p.last_name.toUpperCase()}
          </span>
        </div>
      )
    },
    { label: 'Genre', key: 'gender' },
    { label: 'Date de Naissance', key: 'birth_date', render: (p) => p.birth_date || 'N/A' },
  ];

  const formFields = [
    { name: 'first_name', label: 'Prénom', required: true },
    { name: 'last_name', label: 'Nom', required: true },
    { 
      name: 'gender', 
      label: 'Genre', 
      type: 'select', 
      required: true,
      options: [
        { value: 'male', label: 'Masculin' },
        { value: 'female', label: 'Féminin' },
      ]
    },
    { name: 'birth_date', label: 'Date de Naissance', type: 'date' },
  ];

  return (
    <ResourcePage
      title="Praticiens"
      icon={<FiUserCheck />}
      api={practitionersAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="green"
    />
  );
}
