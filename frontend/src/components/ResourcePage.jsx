import { useState, useEffect, useCallback } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function ResourcePage({ title, icon, api, columns, formFields, renderForm, badgeColor = 'blue' }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [toast, setToast] = useState(null);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const pageSize = 20;

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params = { page };
      if (search) params.search = search;
      const res = await api.getAll(params);
      const data = res.data;
      if (data.results) {
        setItems(data.results);
        setTotalCount(data.count);
      } else if (Array.isArray(data)) {
        setItems(data);
        setTotalCount(data.length);
      }
    } catch (err) {
      console.error(err);
      showToast('Erreur de chargement', 'error');
    } finally {
      setLoading(false);
    }
  }, [api, page, search]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const openCreate = () => {
    const defaults = {};
    formFields.forEach(f => defaults[f.name] = f.defaultValue || '');
    setFormData(defaults);
    setEditItem(null);
    setShowModal(true);
  };

  const openEdit = (item) => {
    setFormData({ ...item });
    setEditItem(item);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editItem) {
        await api.update(editItem.id, formData);
        showToast('Modifié avec succès');
      } else {
        await api.create(formData);
        showToast('Créé avec succès');
      }
      setShowModal(false);
      fetchItems();
    } catch (err) {
      console.error(err);
      const detail = err.response?.data;
      let msg = 'Erreur lors de la sauvegarde';
      if (detail && typeof detail === 'object') {
        msg = Object.entries(detail).map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : v}`).join(' | ');
      }
      showToast(msg, 'error');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet élément ?')) return;
    try {
      await api.delete(id);
      showToast('Supprimé avec succès');
      fetchItems();
    } catch {
      showToast('Erreur lors de la suppression', 'error');
    }
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className={`badge badge-${badgeColor}`} style={{ fontSize: '0.85rem', padding: '6px 14px' }}>
            {icon} {totalCount} {title.toLowerCase()}
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="search-bar">
            <FiSearch className="search-bar-icon" />
            <input
              placeholder={`Rechercher ${title.toLowerCase()}...`}
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
          </div>
          <button className="btn btn-primary" onClick={openCreate}>
            <FiPlus /> Ajouter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner" />
            <span className="loading-text">Chargement...</span>
          </div>
        ) : items.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">{icon}</div>
            <h3>Aucun(e) {title.toLowerCase()}</h3>
            <p>Commencez par en ajouter un(e)</p>
            <button className="btn btn-primary" style={{ marginTop: '16px' }} onClick={openCreate}>
              <FiPlus /> Ajouter
            </button>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    {columns.map(col => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={item.id} className="animate-in" style={{ animationDelay: `${idx * 0.03}s` }}>
                      <td>
                        <span className={`badge badge-${badgeColor}`}>#{item.id}</span>
                      </td>
                      {columns.map(col => (
                        <td key={col.key}>
                          {col.render ? col.render(item) : item[col.key]}
                        </td>
                      ))}
                      <td>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                          <button className="btn-icon" onClick={() => openEdit(item)} title="Modifier">
                            <FiEdit2 size={14} />
                          </button>
                          <button className="btn-icon danger" onClick={() => handleDelete(item.id)} title="Supprimer">
                            <FiTrash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="pagination-btn"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  <FiChevronLeft size={14} />
                </button>
                <span className="pagination-info">
                  Page {page} / {totalPages}
                </span>
                <button
                  className="pagination-btn"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  <FiChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">
                {editItem ? 'Modifier' : 'Ajouter'} {title.slice(0, -1) || title}
              </h3>
              <button className="btn-icon" onClick={() => setShowModal(false)}>
                <FiX size={16} />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {renderForm ? renderForm(formData, handleChange) : formFields.map(field => (
                <div className="form-group" key={field.name}>
                  <label className="form-label">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="form-input"
                      rows={3}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || ''}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="form-input"
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    >
                      <option value="">-- Sélectionner --</option>
                      {field.options?.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="form-input"
                      type={field.type || 'text'}
                      value={formData[field.name] || ''}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder || ''}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <div className="modal-actions">
                <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Enregistrement...' : (editItem ? 'Modifier' : 'Créer')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.message}
        </div>
      )}
    </div>
  );
}
