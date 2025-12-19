import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicHeader } from '../../../../widgets/public-header';

export function StudentMainPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Замените на ваш URL бэкенда
  const API_BASE_URL = 'https://paydeya-backend.onrender.com/api/v1';
  // Для разработки: 'http://localhost:8080/api/v1'

  useEffect(() => {
    // Проверка авторизации
    const token = localStorage.getItem('accessToken');
    const userData = localStorage.getItem('user');

    if (!token || !userData) {
      navigate('/login');
      return;
    }

    try {
      const parsedUser = JSON.parse(userData);
      setUser(parsedUser);

      // Проверка роли студента
      if (parsedUser.role !== 'student') {
        navigate('/');
        return;
      }

      // Загружаем материалы
      loadMaterials(token);
    } catch (error) {
      console.error('Error parsing user data:', error);
      navigate('/login');
    }
  }, [navigate]);

  const loadMaterials = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/catalog/materials`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Извлекаем материалы из ответа
      if (data && data.materials && Array.isArray(data.materials)) {
        setMaterials(data.materials);
      } else {
        console.warn('Unexpected API response format:', data);
        setMaterials([]);
      }

    } catch (error) {
      console.error('Error loading materials:', error);
      setError('Не удалось загрузить материалы');
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <PublicHeader />
        <div style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{ fontSize: '1.2rem', color: '#666' }}>Загрузка материалов...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <PublicHeader />

      <div style={{
        flex: 1,
        padding: '40px 20px',
        backgroundColor: '#f8f9fa'
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {/* Приветствие */}
          <div style={{
            marginBottom: '50px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              marginBottom: '10px',
              color: '#333'
            }}>
              Добро пожаловать, {user?.fullName || 'Студент'}! 👨‍🎓
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: '#666',
              marginBottom: '30px'
            }}>
              Ваша учебная панель
            </p>

            {/* Быстрые действия */}
            <div style={{
              display: 'flex',
              gap: '15px',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => navigate('/catalog')}
                style={{
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🔍</span> Поиск материалов
              </button>

              <button
                onClick={() => loadMaterials(localStorage.getItem('accessToken'))}
                style={{
                  padding: '12px 24px',
                  background: '#4CAF50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>🔄</span> Обновить список
              </button>
            </div>
          </div>

          {/* Список материалов */}
          <div>
            <h2 style={{
              fontSize: '1.8rem',
              marginBottom: '30px',
              color: '#333',
              borderBottom: '2px solid #e0e0e0',
              paddingBottom: '10px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span>Доступные материалы</span>
              <span style={{
                fontSize: '1rem',
                color: '#666',
                background: '#f0f0f0',
                padding: '5px 15px',
                borderRadius: '20px'
              }}>
                {materials.length} материалов
              </span>
            </h2>

            {error && (
              <div style={{
                background: '#ffebee',
                color: '#c62828',
                padding: '15px',
                borderRadius: '8px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {materials.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 40px',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <div style={{
                  fontSize: '4rem',
                  marginBottom: '20px',
                  opacity: 0.3
                }}>
                  📚
                </div>
                <div style={{
                  fontSize: '1.8rem',
                  marginBottom: '15px',
                  color: '#333'
                }}>
                  Материалов пока нет
                </div>
                <p style={{
                  color: '#666',
                  marginBottom: '30px',
                  fontSize: '1.1rem',
                  lineHeight: '1.6'
                }}>
                  Здесь появятся учебные материалы,<br />добавленные преподавателями
                </p>
              </div>
            ) : (
              <>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                  gap: '25px',
                  marginBottom: '50px'
                }}>
                  {materials.map(material => {
                    // Определяем цвет по предмету
                    const getSubjectColor = (subject) => {
                      const mathSubjects = ['mathematics', 'algebra', 'calculus', 'geometry',
                                          'probability', 'statistics', 'trigonometry'];
                      const programmingSubjects = ['programming', 'python', 'javascript', 'java',
                                                 'algorithms', 'datascience', 'frontend'];
                      const physicsSubjects = ['physics', 'mechanics', 'kinematics', 'electrodynamics',
                                             'optics', 'thermodynamics', 'quantum'];

                      if (mathSubjects.includes(subject)) return '#4CAF50';
                      if (programmingSubjects.includes(subject)) return '#2196F3';
                      if (physicsSubjects.includes(subject)) return '#FF9800';
                      return '#9C27B0';
                    };

                    return (
                      <div
                        key={material.id}
                        style={{
                          background: 'white',
                          borderRadius: '12px',
                          padding: '25px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
                          transition: 'all 0.3s ease',
                          cursor: 'pointer',
                          borderLeft: `6px solid ${getSubjectColor(material.subject)}`,
                          position: 'relative',
                          overflow: 'hidden'
                        }}
                        onClick={() => navigate(`/materials/${material.id}`)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-8px)';
                          e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.12)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.08)';
                        }}
                      >
                        {/* Бейдж рейтинга */}
                        {material.rating > 0 && (
                          <div style={{
                            position: 'absolute',
                            top: '15px',
                            right: '15px',
                            background: '#FF9800',
                            color: 'white',
                            padding: '5px 10px',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            ⭐ {material.rating.toFixed(1)}
                          </div>
                        )}

                        {/* Заголовок */}
                        <div style={{
                          fontSize: '1.3rem',
                          fontWeight: 'bold',
                          marginBottom: '15px',
                          color: '#333',
                          paddingRight: material.rating > 0 ? '60px' : '0'
                        }}>
                          {material.title}
                        </div>

                        {/* Предмет */}
                        <div style={{
                          display: 'inline-block',
                          background: getSubjectColor(material.subject) + '20', // 20% opacity
                          color: getSubjectColor(material.subject),
                          padding: '6px 14px',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          marginBottom: '15px',
                          border: `1px solid ${getSubjectColor(material.subject)}30`
                        }}>
                          {material.subject}
                        </div>

                        {/* Автор */}
                        <div style={{
                          color: '#666',
                          marginBottom: '15px',
                          fontSize: '0.95rem',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px',
                          background: '#f9f9f9',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '1.2rem'
                          }}>
                            👤
                          </div>
                          <div>
                            <div style={{ fontWeight: '500' }}>{material.author?.name || 'Неизвестный автор'}</div>
                            <div style={{ fontSize: '0.8rem', color: '#888' }}>Преподаватель</div>
                          </div>
                        </div>

                        {/* Статистика */}
                        <div style={{
                          display: 'flex',
                          gap: '15px',
                          marginTop: '20px',
                          paddingTop: '15px',
                          borderTop: '1px solid #eee'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            color: '#666',
                            fontSize: '0.9rem'
                          }}>
                            <span style={{ fontSize: '1.1rem' }}>👥</span>
                            <span>{material.studentsCount || 0} студентов</span>
                          </div>

                          <div style={{
                            marginLeft: 'auto',
                            color: '#2196F3',
                            fontSize: '0.9rem',
                            fontWeight: '500',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px'
                          }}>
                            Открыть
                            <span style={{ fontSize: '1.2rem' }}>→</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Статистика */}
                <div style={{
                  marginTop: '50px',
                  padding: '30px',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  borderRadius: '15px',
                  boxShadow: '0 5px 20px rgba(102, 126, 234, 0.3)',
                  color: 'white'
                }}>
                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span>📊</span>
                    <span>Статистика материалов</span>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '20px'
                  }}>
                    <div style={{
                      padding: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {materials.length}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Всего материалов</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {[...new Set(materials.map(m => m.subject))].length}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Разных предметов</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {materials.reduce((sum, m) => sum + (m.studentsCount || 0), 0)}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Всего студентов</div>
                    </div>

                    <div style={{
                      padding: '15px',
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: '10px',
                      backdropFilter: 'blur(10px)'
                    }}>
                      <div style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '5px' }}>
                        {materials.filter(m => m.rating > 0).length}
                      </div>
                      <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>Материалов с рейтингом</div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}