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
        <div>Загрузка...</div>
      </div>
    );
  }

  return (
    <>
      <PublicHeader />

      <div className="teacher-dashboard">
        <div className="dashboard-container" style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '40px 20px',
          textAlign: 'center'
        }}>
          {/* Заголовок */}
          <div className="dashboard-header" style={{ marginBottom: '50px' }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '10px',
              color: '#333'
            }}>
              Добро пожаловать, {user?.fullName || 'Учитель'}! 👨‍🏫
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '40px'
            }}>
              Панель управления преподавателя
            </p>
          </div>

          {/* Основная кнопка создания материала */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '200px'
          }}>
            <button
              onClick={() => navigate('/materials/new')}
              style={{
                padding: '20px 40px',
                fontSize: '1.3rem',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                boxShadow: '0 4px 15px rgba(76, 175, 80, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#45a049';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#4CAF50';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>📝</span>
              <span>Создать материал</span>
            </button>
          </div>

          {/* Инструкция для отладки */}
          <div style={{
            marginTop: '50px',
            padding: '20px',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            borderLeft: '4px solid #007bff'
          }}>
            <h3 style={{ color: '#007bff', marginBottom: '10px' }}>
              Режим отладки
            </h3>
            <p style={{ color: '#666', lineHeight: '1.5' }}>
              На этой странице оставлены только основные элементы для тестирования.
              Полная версия будет восстановлена после отладки.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}