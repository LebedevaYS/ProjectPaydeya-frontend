// src/pages/material-editor/CreateMaterialPage/CreateMaterialPage.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PublicHeader } from '../../../widgets/public-header';
import './CreateMaterialPage.css';

export function CreateMaterialPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [error, setError] = useState('');

  // Загружаем список предметов с бэкенда
  useEffect(() => {
    const loadSubjects = async () => {
      try {
        setIsLoadingSubjects(true);
        const response = await fetch('/api/catalog/subjects');

        if (response.ok) {
          const data = await response.json();
          console.log('📚 Загруженные предметы:', data);

          // В зависимости от формата ответа
          if (data.subjects && Array.isArray(data.subjects)) {
            setSubjects(data.subjects);
          } else if (Array.isArray(data)) {
            setSubjects(data);
          } else {
            console.error('Неизвестный формат предметов:', data);
            // Запасной список
            setSubjects(getDefaultSubjects());
          }
        } else {
          console.error('Ошибка загрузки предметов:', response.status);
          setSubjects(getDefaultSubjects());
        }
      } catch (err) {
        console.error('Ошибка сети при загрузке предметов:', err);
        setSubjects(getDefaultSubjects());
      } finally {
        setIsLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, []);

  // Запасной список предметов если API не работает
  const getDefaultSubjects = () => [
    { id: 'math', name: 'Математика'},
    { id: 'physics', name: 'Физика'},
    { id: 'chemistry', name: 'Химия'},
    { id: 'biology', name: 'Биология'},
    { id: 'history', name: 'История'},
    { id: 'literature', name: 'Литература' },
    { id: 'english', name: 'Английский язык'},
    { id: 'informatics', name: 'Информатика'},
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Валидация
    if (!title.trim()) {
      setError('Введите название материала');
      return;
    }

    if (!subject) {
      setError('Выберите предмет');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Проверяем авторизацию
      const token = localStorage.getItem('accessToken');
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!token) {
        setError('Необходимо авторизоваться');
        navigate('/login');
        return;
      }

      if (user.role !== 'teacher') {
        setError('Только преподаватели могут создавать материалы');
        return;
      }

      const materialData = {
        title: title.trim(),
        subject: subject
      };

      console.log('📤 Создание материала:', materialData);

      const response = await fetch('/api/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(materialData)
      });

      const data = await response.json();
      console.log('📥 Ответ сервера:', data);

      if (response.ok) {
        console.log('✅ Материал создан:', data);

        // Получаем ID материала (проверяем разные возможные пути)
        const materialId = data.material?.id || data.id || data.materialId;

        if (materialId) {
          navigate(`/editor/${materialId}`);
        } else {
          console.error('Не удалось получить ID материала:', data);
          setError('Материал создан, но произошла ошибка при переходе в редактор');
        }
      } else {
        console.error('❌ Ошибка создания:', data);

        let errorMessage = data.error || 'Ошибка создания материала';

        // Обработка конкретных ошибок
        if (errorMessage.toLowerCase().includes('unauthorized') ||
            errorMessage.toLowerCase().includes('token')) {
          errorMessage = 'Необходимо авторизоваться';
          localStorage.removeItem('accessToken');
          navigate('/login');
        } else if (errorMessage.toLowerCase().includes('teacher')) {
          errorMessage = 'Только преподаватели могут создавать материалы';
        }

        setError(errorMessage);
      }
    } catch (err) {
      console.error('🔥 Ошибка сети:', err);
      setError('Ошибка соединения с сервером. Проверьте интернет.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PublicHeader />

      <div className="create-material-page">
        <div className="create-material-container">
          <h1 className="create-material-title">Создать новый материал</h1>

          {error && (
            <div className="error-message">
              ⚠ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="create-material-form">
            {/* Название материала */}
            <div className="form-group">
              <label htmlFor="title" className="form-label">
                Название материала <span className="required">*</span>
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Например: Основы алгебры, Теория вероятности, История Древнего мира..."
                className="form-input"
                disabled={isLoading}
                autoFocus
              />
              <div className="form-hint">
                Придумайте понятное название, которое отражает содержание
              </div>
            </div>

            {/* Выбор предмета */}
            <div className="form-group">
              <label className="form-label">
                Предмет <span className="required">*</span>
              </label>

              {isLoadingSubjects ? (
                <div className="subjects-loading">
                  <div className="spinner-small"></div>
                  <span>Загрузка предметов...</span>
                </div>
              ) : subjects.length === 0 ? (
                <div className="subjects-error">
                  Не удалось загрузить предметы. Попробуйте обновить страницу.
                </div>
              ) : (
                <>
                  <div className="subjects-grid">
                    {subjects.map((subj) => (
                      <button
                        key={subj.id}
                        type="button"
                        className={`subject-card ${subject === subj.id ? 'selected' : ''}`}
                        onClick={() => {
                          setSubject(subj.id);
                          if (error) setError('');
                        }}
                        disabled={isLoading}
                        title={subj.name}
                      >
                        <span className="subject-name">{subj.name}</span>
                      </button>
                    ))}
                  </div>
                  <div className="form-hint">
                    Выберите предмет, к которому относится материал
                  </div>
                </>
              )}
            </div>

            {/* Кнопки */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="btn btn-secondary"
                disabled={isLoading}
              >
                Назад
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading || !title.trim() || !subject || isLoadingSubjects}
                style={{
                  opacity: (!title.trim() || !subject || isLoadingSubjects) ? 0.6 : 1,
                  cursor: (!title.trim() || !subject || isLoadingSubjects) ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <>
                    <span className="spinner" style={{marginRight: '8px'}}></span>
                    Создание...
                  </>
                ) : 'Создать материал'}
              </button>
            </div>
          </form>

          {/* Информация о следующих шагах */}
          <div className="next-steps-info">
            <h3>Что дальше?</h3>
            <ul>
              <li>📝 Вы попадёте в визуальный редактор материала</li>
              <li>🧱 Сможете добавлять текстовые блоки, изображения, видео</li>
              <li>🎨 Настраивать оформление и анимацию</li>
              <li>🚀 Опубликовать материал для учеников</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}