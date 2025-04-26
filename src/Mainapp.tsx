import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add, set } from './reducer';
import { RootState } from './store';
import './style.css';

interface IncidentForm {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}

interface Incident {
  id: number;
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
  reported_at: string;
}

const Mainapp = () => {
  const dispatch = useDispatch();
  const incidents = useSelector((state: RootState) => state.incident.incidents);
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<string>('newest');
  const [expandedIds, setExpandedIds] = useState<number[]>([]);
  const [form, setForm] = useState<IncidentForm>({
    title: '',
    description: '',
    severity: 'Low',
  });

  const initialData: Incident[] = require('./data.json');

  useEffect(() => {
    dispatch(set(initialData));
  }, [initialData, dispatch]);

  const toggleExpand = (index: number) => {
    setExpandedIds((prev) =>
      prev.includes(index) ? prev.filter((id) => id !== index) : [...prev, index]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, description, severity } = form;
    if (!title || !description) return alert('All fields are required!');
    dispatch(
      add({
        id: incidents.length + 1,
        title,
        description,
        severity,
        reported_at: new Date().toISOString(),
      })
    );
    setForm({ title: '', description: '', severity: 'Low' });
  };

  const filtered = incidents.filter((incident) =>
    filter === 'All' ? true : incident.severity === filter
  );

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.reported_at);
    const dateB = new Date(b.reported_at);
    return sortOrder === 'newest' ? dateB.getTime() - dateA.getTime() : dateA.getTime() - dateB.getTime();
  });

  return (
    <div className="container">
      <h1>AI Safety Incident Tracker</h1>

      <div className="controls">
        <div>
          <label><b>Filter by severity:</b></label>
          <select onChange={(e) => setFilter(e.target.value)}>
            <option>All</option>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="sort">
          <label><b>Sort by:</b></label>
          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      <div className="main-content">
        <div className="incident-list-container">
          <ul className="incident-list">
            {sorted.map((incident, index) => (
              <li key={incident.id} className="incident-item">
                <span className={`badge ${incident.severity.toLowerCase()}`}>{incident.severity}</span>
                <div className="summary">
                  <strong>{incident.title}</strong>
                  <span className="date">{new Date(incident.reported_at).toLocaleDateString()}</span>
                  <button onClick={() => toggleExpand(index)} className="expand">
                    {expandedIds.includes(index) ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
                {expandedIds.includes(index) && <p className="description">{incident.description}</p>}
              </li>
            ))}
          </ul>
        </div>

        <form className="incident-form" onSubmit={handleSubmit}>
          <h2>Report New Incident</h2>
          <input
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <select
            value={form.severity}
            onChange={(e) => setForm({ ...form, severity: e.target.value as 'Low' | 'Medium' | 'High' })}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
          <button type="submit">Submit Incident</button>
        </form>
      </div>
    </div>
  );
};

export default Mainapp;
