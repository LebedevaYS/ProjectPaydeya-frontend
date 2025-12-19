// src/pages/teacher/main/ui/TeacherMainPage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicHeader } from '../../../../widgets/public-header';

export function TeacherMainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Проверяем авторизацию
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);
      
      // Проверяем роль
      if (parsedUser.role !== 'teacher') {
        navigate('/'); // или на страницу соответствующей роли
      }
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  if (isLoading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <>
      <PublicHeader />
      
      <div className="teacher-dashboard">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h1 className="welcome-title">
              Добро пожаловать, {user?.fullName || 'Учитель'}! 👨‍🏫
            </h1>
            <p className="welcome-subtitle">
              Панель управления преподавателя
            </p>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Мои материалы</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Ученики</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Рейтинг</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-value">0</div>
              <div className="stat-label">Просмотры</div>
            </div>
          </div>

          <div className="dashboard-actions">
            <div className="action-grid">
              {/* Создать материал */}
              <button 
                className="action-card action-card-primary"
                onClick={() => navigate('/materials/new')}
              >
                <div className="action-icon">📝</div>
                <div className="action-title">Создать материал</div>
                <div className="action-description">
                  Создайте новый учебный материал с интерактивными элементами
                </div>
              </button>

              {/* Мои материалы */}
              <button 
                className="action-card"
                onClick={() => navigate('/materials')}
              >
                <div className="action-icon">📁</div>
                <div className="action-title">Мои материалы</div>
                <div className="action-description">
                  Просмотр и редактирование созданных материалов
                </div>
              </button>

              {/* Статистика */}
              <button 
                className="action-card"
                onClick={() => navigate('/teacher/statistics')}
              >
                <div className="action-icon">📊</div>
                <div className="action-title">Статистика</div>
                <div className="action-description">
                  Аналитика по вашим материалам и ученикам
                </div>
              </button>

              {/* Профиль */}
              <button 
                className="action-card"
                onClick={() => navigate('/teacher/profile')}
              >
                <div className="action-icon">👤</div>
                <div className="action-title">Профиль</div>
                <div className="action-description">
                  Настройки профиля и аккаунта
                </div>
              </button>
            </div>
          </div>

          {/* Быстрый старт */}
          <div className="quick-start">
            <h2 className="section-title">Быстрый старт</h2>
            <div className="quick-steps">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Создайте первый материал</h3>
                  <p>Используйте визуальный редактор для создания интерактивного урока</p>
                  <button 
                    className="step-action"
                    onClick={() => navigate('/materials/new')}
                  >
                    Начать создание →
                  </button>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Заполните профиль</h3>
                  <p>Добавьте информацию о себе, специализации и опыт</p>
                  <button 
                    className="step-action"
                    onClick={() => navigate('/teacher/profile')}
                  >
                    Заполнить профиль →
                  </button>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Поделитесь материалом</h3>
                  <p>Опубликуйте материал и поделитесь ссылкой с учениками</p>
                  <button 
                    className="step-action"
                    onClick={() => navigate('/materials')}
                  >
                    Опубликовать →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}