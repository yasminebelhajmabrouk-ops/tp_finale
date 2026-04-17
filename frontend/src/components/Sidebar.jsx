import { NavLink } from 'react-router-dom';
import {
  FiHome, FiUsers, FiActivity, FiUserCheck, FiCalendar,
  FiAlertCircle, FiScissors, FiPackage, FiFileText,
  FiShield, FiHeart, FiClipboard, FiFile
} from 'react-icons/fi';

const navItems = [
  { section: 'Principal', items: [
    { path: '/', icon: <FiHome />, label: 'Dashboard' },
  ]},
  { section: 'Ressources Cliniques', items: [
    { path: '/patients', icon: <FiUsers />, label: 'Patients' },
    { path: '/practitioners', icon: <FiUserCheck />, label: 'Praticiens' },
    { path: '/encounters', icon: <FiCalendar />, label: 'Consultations' },
    { path: '/observations', icon: <FiActivity />, label: 'Observations' },
    { path: '/conditions', icon: <FiAlertCircle />, label: 'Conditions' },
    { path: '/procedures', icon: <FiScissors />, label: 'Procédures' },
  ]},
  { section: 'Pharmacie & Soins', items: [
    { path: '/medications', icon: <FiPackage />, label: 'Médicaments' },
    { path: '/medication-requests', icon: <FiFileText />, label: 'Prescriptions' },
    { path: '/allergies', icon: <FiShield />, label: 'Allergies' },
    { path: '/immunizations', icon: <FiHeart />, label: 'Vaccinations' },
    { path: '/care-plans', icon: <FiClipboard />, label: 'Plans de soins' },
    { path: '/diagnostic-reports', icon: <FiFile />, label: 'Rapports' },
  ]},
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="sidebar-brand-icon">🏥</div>
        <div>
          <h1>FHIR Medical</h1>
          <span>Healthcare API</span>
        </div>
      </div>
      <nav className="sidebar-nav">
        {navItems.map((section) => (
          <div key={section.section}>
            <div className="sidebar-section-title">{section.section}</div>
            {section.items.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}
