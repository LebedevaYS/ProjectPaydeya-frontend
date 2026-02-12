// src/components/HealthCheck.jsx
import React, { useState, useEffect } from 'react';
import './HealthCheck.css'; // опционально для стилей

const HealthCheck = () => {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://paydeya-backend.onrender.com';

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_URL}/health`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setHealthData(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching health data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  const handleRefresh = () => {
    fetchHealth();
  };

  if (loading) {
    return (
      <div className="health-check">
        <h2>🔍 Проверка состояния сервера</h2>
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-check">
        <h2>🔍 Проверка состояния сервера</h2>
        <div className="error">
          ❌ Ошибка: {error}
        </div>
        <button onClick={handleRefresh} className="refresh-btn">
          🔄 Повторить
        </button>
      </div>
    );
  }

  return (
    <div className="health-check">
      <h2>🔍 Состояние сервера</h2>
      
      <div className="health-card">
        <div className="status-line">
          <strong>Статус:</strong>
          <span className={`status ${healthData?.status === 'ok' ? 'status-ok' : 'status-error'}`}>
            {healthData?.status === 'ok' ? '✅ Работает' : '❌ Ошибка'}
          </span>
        </div>
        
        <div className="info-line">
          <strong>Сервис:</strong>
          <span>{healthData?.service || 'N/A'}</span>
        </div>
        
        <div className="info-line">
          <strong>Время:</strong>
          <span>{healthData?.timestamp ? new Date(healthData.timestamp).toLocaleString() : 'N/A'}</span>
        </div>
        
        <div className="info-line">
          <strong>API URL:</strong>
          <span className="url">{API_URL}</span>
        </div>
      </div>
      
      <button onClick={handleRefresh} className="refresh-btn">
        🔄 Обновить
      </button>
    </div>
  );
};

export default HealthCheck;