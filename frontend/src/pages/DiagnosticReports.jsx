import ResourcePage from '../components/ResourcePage';
import { diagnosticReportsAPI } from '../api/client';
import { FiFile } from 'react-icons/fi';

export default function DiagnosticReports() {
  const columns = [
    { label: 'Patient ID', key: 'patient', render: (d) => <span className="badge badge-blue">#{d.patient}</span> },
    { label: 'Type de rapport', key: 'report_type', render: (d) => <span style={{ fontWeight: 600 }}>{d.report_type}</span> },
    { label: 'Résultat', key: 'result' },
    { label: 'Date', key: 'date', render: (d) => new Date(d.date).toLocaleString() },
  ];

  const formFields = [
    { name: 'patient', label: 'ID Patient', type: 'number', required: true },
    { name: 'report_type', label: 'Type de Rapport', required: true, placeholder: 'Ex: Analyse Sanguine, X-Ray' },
    { name: 'result', label: 'Résultat / Conclusion', type: 'textarea' },
  ];

  return (
    <ResourcePage
      title="Rapports"
      icon={<FiFile />}
      api={diagnosticReportsAPI}
      columns={columns}
      formFields={formFields}
      badgeColor="purple"
    />
  );
}
