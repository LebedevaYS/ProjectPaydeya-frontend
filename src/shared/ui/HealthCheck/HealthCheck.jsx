import { useEffect, useState } from "react";
import "./HealthCheck.css";

export function HealthCheck() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL || "https://paydeya-backend.onrender.com";

  const fetchHealth = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${apiUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      setHealthData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealth();
  }, []);

  if (loading) {
    return (
      <div className="health-check">
        <h2>Проверка состояния сервера</h2>
        <div className="loading">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="health-check">
        <h2>Проверка состояния сервера</h2>
        <div className="error">Ошибка: {error}</div>
        <button onClick={fetchHealth} className="refresh-btn">
          Обновить
        </button>
      </div>
    );
  }

  return (
    <div className="health-check">
      <h2>Состояние сервера</h2>
      <div className="health-card">
        <div className="status-line">
          <strong>Статус:</strong>
          <span className={`status ${healthData?.status === "ok" ? "status-ok" : "status-error"}`}>
            {healthData?.status === "ok" ? "Доступен" : "Недоступен"}
          </span>
        </div>

        <div className="info-line">
          <strong>Сервис:</strong>
          <span>{healthData?.service || "N/A"}</span>
        </div>

        <div className="info-line">
          <strong>Время:</strong>
          <span>{healthData?.timestamp ? new Date(healthData.timestamp).toLocaleString() : "N/A"}</span>
        </div>

        <div className="info-line">
          <strong>API URL:</strong>
          <span className="url">{apiUrl}</span>
        </div>
      </div>

      <button onClick={fetchHealth} className="refresh-btn">
        Обновить
      </button>
    </div>
  );
}
