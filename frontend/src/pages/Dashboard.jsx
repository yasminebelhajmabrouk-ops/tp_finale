import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FiUsers, FiActivity, FiUserCheck, FiCalendar,
  FiAlertCircle, FiScissors, FiPackage, FiFileText,
  FiShield, FiHeart, FiClipboard, FiFile, FiArrowRight
} from 'react-icons/fi';
import {
  patientsAPI, observationsAPI, practitionersAPI, encountersAPI,
  conditionsAPI, proceduresAPI, medicationsAPI, medicationRequestsAPI,
  allergiesAPI, immunizationsAPI, carePlansAPI, diagnosticReportsAPI
} from '../api/client';

const resourceCards = [
  { key: 'patients', label: 'Patients', icon: <FiUsers />, api: patientsAPI, gradient: 'var(--gradient-primary)', path: '/patients' },
  { key: 'practitioners', label: 'Praticiens', icon: <FiUserCheck />, api: practitionersAPI, gradient: 'var(--gradient-success)', path: '/practitioners' },
  { key: 'observations', label: 'Observations', icon: <FiActivity />, api: observationsAPI, gradient: 'var(--gradient-purple)', path: '/observations' },
  { key: 'encounters', label: 'Consultations', icon: <FiCalendar />, api: encountersAPI, gradient: 'var(--gradient-warm)', path: '/encounters' },
];

const allResources = [
  { label: 'Patients', icon: <FiUsers />, path: '/patients', color: '#3b82f6' },
  { label: 'Praticiens', icon: <FiUserCheck />, path: '/practitioners', color: '#10b981' },
  { label: 'Consultations', icon: <FiCalendar />, path: '/encounters', color: '#f59e0b' },
  { label: 'Observations', icon: <FiActivity />, path: '/observations', color: '#8b5cf6' },
  { label: 'Conditions', icon: <FiAlertCircle />, path: '/conditions', color: '#ef4444' },
  { label: 'Procédures', icon: <FiScissors />, path: '/procedures', color: '#06b6d4' },
  { label: 'Médicaments', icon: <FiPackage />, path: '/medications', color: '#ec4899' },
  { label: 'Prescriptions', icon: <FiFileText />, path: '/medication-requests', color: '#f97316' },
  { label: 'Allergies', icon: <FiShield />, path: '/allergies', color: '#ef4444' },
  { label: 'Vaccinations', icon: <FiHeart />, path: '/immunizations', color: '#10b981' },
  { label: 'Plans de soins', icon: <FiClipboard />, path: '/care-plans', color: '#3b82f6' },
  { label: 'Rapports', icon: <FiFile />, path: '/diagnostic-reports', color: '#8b5cf6' },
];

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCounts() {
      try {
        const results = await Promise.all(
          resourceCards.map(r => r.api.getAll({ page: 1 }).then(res => {
            const data = res.data;
            return { key: r.key, count: data.count !== undefined ? data.count : (Array.isArray(data) ? data.length : 0) };
          }).catch(() => ({ key: r.key, count: 0 })))
        );
        const map = {};
        results.forEach(r => map[r.key] = r.count);
        setCounts(map);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchCounts();
  }, []);

  return (
    <div>
      <div className="dashboard-welcome">
        <h1>Bienvenue sur <span>FHIR Medical</span></h1>
        <p>Gérez vos ressources médicales conformes au standard HL7 FHIR</p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        {resourceCards.map((r, i) => (
          <Link to={r.path} key={r.key} className="stat-card" style={{ animationDelay: `${i * 0.08}s`, textDecoration: 'none', color: 'inherit' }}>
            <div className="stat-icon" style={{ background: `${r.gradient}` }}>
              {r.icon}
            </div>
            <div className="stat-info">
              <h3>{loading ? '...' : (counts[r.key] ?? 0)}</h3>
              <p>{r.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Quick access grid */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span>📋</span>
            Accès rapide aux ressources
          </div>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '12px',
        }}>
          {allResources.map((r, i) => (
            <Link
              key={r.path}
              to={r.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid var(--border-color)',
                transition: 'all 0.25s ease',
                textDecoration: 'none',
                color: 'inherit',
                animationDelay: `${i * 0.04}s`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = r.color + '40';
                e.currentTarget.style.background = r.color + '08';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: r.color + '18',
                color: r.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                flexShrink: 0,
              }}>
                {r.icon}
              </div>
              <span style={{ fontSize: '0.85rem', fontWeight: 500, flex: 1 }}>{r.label}</span>
              <FiArrowRight style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
