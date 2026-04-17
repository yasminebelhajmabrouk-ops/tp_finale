import { useLocation } from 'react-router-dom';

const pageTitles = {
  '/': { title: 'Dashboard', subtitle: 'Vue d\'ensemble de votre système FHIR' },
  '/patients': { title: 'Patients', subtitle: 'Gestion des dossiers patients' },
  '/practitioners': { title: 'Praticiens', subtitle: 'Équipe médicale' },
  '/encounters': { title: 'Consultations', subtitle: 'Rencontres patient-praticien' },
  '/observations': { title: 'Observations', subtitle: 'Mesures et résultats cliniques' },
  '/conditions': { title: 'Conditions', subtitle: 'Diagnostics et pathologies' },
  '/procedures': { title: 'Procédures', subtitle: 'Actes médicaux réalisés' },
  '/medications': { title: 'Médicaments', subtitle: 'Catalogue de médicaments' },
  '/medication-requests': { title: 'Prescriptions', subtitle: 'Ordonnances médicales' },
  '/allergies': { title: 'Allergies', subtitle: 'Intolérances et allergies' },
  '/immunizations': { title: 'Vaccinations', subtitle: 'Historique vaccinal' },
  '/care-plans': { title: 'Plans de soins', subtitle: 'Parcours de soins coordonnés' },
  '/diagnostic-reports': { title: 'Rapports diagnostiques', subtitle: 'Résultats d\'examens' },
};

export default function Header() {
  const location = useLocation();
  const basePath = '/' + (location.pathname.split('/')[1] || '');
  const page = pageTitles[basePath] || { title: 'FHIR API', subtitle: '' };

  return (
    <header className="header">
      <div className="header-left">
        <h2>{page.title}</h2>
        <p>{page.subtitle}</p>
      </div>
      <div className="header-right">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '8px 16px',
          background: 'rgba(59, 130, 246, 0.08)',
          borderRadius: '10px',
          border: '1px solid rgba(59, 130, 246, 0.15)',
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.5)',
          }} />
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
            API Connectée
          </span>
        </div>
      </div>
    </header>
  );
}
