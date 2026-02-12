import { useEffect } from "react";
import "../../../../shared/styles/dashboard.css";
import "../../../../shared/styles/main_teacher.css";

export function TeacherMainPage() {
  useEffect(() => {
    const slider = document.querySelector(".sidebar-nav__slider");
    const links = document.querySelectorAll(".sidebar-nav__link[data-index]");
    const activeLink = document.querySelector(".sidebar-nav__link--active");

    if (!slider || !activeLink || !links.length) return;

    const calculateItemHeight = () => {
      const firstItem = document.querySelector(".sidebar-nav__item");
      return firstItem ? firstItem.getBoundingClientRect().height : 0;
    };

    let itemHeight = calculateItemHeight();
    const activeIndex = parseInt(activeLink.getAttribute("data-index") || "0", 10);

    const setSliderToIndex = (index) => {
      slider.style.top = `${index * itemHeight}px`;
      slider.style.height = `${itemHeight}px`;
    };

    setSliderToIndex(activeIndex);

    const onEnter = function () {
      const index = parseInt(this.getAttribute("data-index") || "0", 10);
      setSliderToIndex(index);
      if (index !== activeIndex) {
        activeLink.classList.remove("sidebar-nav__link--active");
      }
    };

    const onLeave = function () {
      const currentActiveIndex = parseInt(
        activeLink.getAttribute("data-index") || "0",
        10
      );
      setSliderToIndex(currentActiveIndex);
      activeLink.classList.add("sidebar-nav__link--active");
    };

    links.forEach((link) => {
      link.addEventListener("mouseenter", onEnter);
      link.addEventListener("mouseleave", onLeave);
    });

    const onResize = () => {
      itemHeight = calculateItemHeight();
      const currentIndex = parseInt(activeLink.getAttribute("data-index") || "0", 10);
      setSliderToIndex(currentIndex);
    };

    window.addEventListener("resize", onResize);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("mouseenter", onEnter);
        link.removeEventListener("mouseleave", onLeave);
      });
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    const dropdownToggles = document.querySelectorAll(".dropdown__toggle");
    const dropdownMenus = document.querySelectorAll(".dropdown__menu");

    if (!dropdownToggles.length || !dropdownMenus.length) return;

    const closeAll = () => {
      dropdownMenus.forEach((menu) =>
        menu.classList.remove("dropdown__menu--active")
      );
      dropdownToggles.forEach((toggle) =>
        toggle.classList.remove("dropdown__toggle--active")
      );
    };

    const onToggleClick = (e) => {
      e.stopPropagation();
      const toggle = e.currentTarget;
      const dropdown = toggle.parentElement;
      const menu = dropdown?.querySelector(".dropdown__menu");
      if (!menu) return;

      dropdownMenus.forEach((otherMenu) => {
        if (otherMenu !== menu) otherMenu.classList.remove("dropdown__menu--active");
      });
      dropdownToggles.forEach((otherToggle) => {
        if (otherToggle !== toggle)
          otherToggle.classList.remove("dropdown__toggle--active");
      });

      menu.classList.toggle("dropdown__menu--active");
      toggle.classList.toggle("dropdown__toggle--active");
    };

    dropdownToggles.forEach((toggle) =>
      toggle.addEventListener("click", onToggleClick)
    );
    document.addEventListener("click", closeAll);

    dropdownMenus.forEach((menu) =>
      menu.addEventListener("click", (e) => e.stopPropagation())
    );

    const dropdownItems = document.querySelectorAll(".dropdown__item input");
    const onItemChange = function () {
      console.log(
        `Фильтр изменен: ${this.name} = ${this.value} (${this.checked})`
      );
    };
    dropdownItems.forEach((item) =>
      item.addEventListener("change", onItemChange)
    );

    return () => {
      dropdownToggles.forEach((toggle) =>
        toggle.removeEventListener("click", onToggleClick)
      );
      document.removeEventListener("click", closeAll);
      dropdownItems.forEach((item) =>
        item.removeEventListener("change", onItemChange)
      );
    };
  }, []);

  return (
    <div className="dashboard teacher-page">
      <div className="container">
        <aside className="sidebar sidebar--left">
          <nav className="sidebar-nav">
            <div className="sidebar-nav__header">
              <img
                className="sidebar-nav__logo"
                src="/img/svg/sidebar_logo.svg"
                alt=""
              />
            </div>

            <div className="sidebar-nav__menu-container">
              <ul className="sidebar-nav__menu">
                <li className="sidebar-nav__item">
                  <a
                    href="#!"
                    className="sidebar-nav__link sidebar-nav__link--active"
                    data-index="0"
                  >
                    <div className="sidebar-nav__icon-wrapper">
                      <img
                        src="/img/svg/home-1.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--default"
                      />
                      <img
                        src="/img/svg/home-2.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--hover"
                      />
                    </div>
                    Главная
                  </a>
                </li>

                <li className="sidebar-nav__item">
                  <a href="#!" className="sidebar-nav__link" data-index="1">
                    <div className="sidebar-nav__icon-wrapper">
                      <img
                        src="/img/svg/profile-1.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--default"
                      />
                      <img
                        src="/img/svg/profile-2.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--hover"
                      />
                    </div>
                    Профиль
                  </a>
                </li>

                <li className="sidebar-nav__item">
                  <a href="#!" className="sidebar-nav__link" data-index="2">
                    <div className="sidebar-nav__icon-wrapper">
                      <img
                        src="/img/svg/my_lessons-1.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--default"
                      />
                      <img
                        src="/img/svg/my_lessons-2.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--hover"
                      />
                    </div>
                    Мои материалы
                  </a>
                </li>

                <li className="sidebar-nav__item">
                  <a href="#!" className="sidebar-nav__link" data-index="3">
                    <div className="sidebar-nav__icon-wrapper">
                      <img
                        src="/img/svg/teachers-1.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--default"
                      />
                      <img
                        src="/img/svg/teachers-2.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--hover"
                      />
                    </div>
                    Преподаватели
                  </a>
                </li>

                <li className="sidebar-nav__item">
                  <a href="#!" className="sidebar-nav__link" data-index="4">
                    <div className="sidebar-nav__icon-wrapper">
                      <img
                        src="/img/svg/lessons-1.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--default"
                      />
                      <img
                        src="/img/svg/lessons-2.svg"
                        alt=""
                        className="sidebar-nav__icon sidebar-nav__icon--hover"
                      />
                    </div>
                    Все материалы
                  </a>
                </li>
              </ul>

              <div className="sidebar-nav__slider" />
            </div>

            <div className="sidebar-nav__promo">
              <p className="sidebar-nav__promo-text">
                Вы ещё не создавали материал
              </p>
              <p className="sidebar-nav__promo-subtext">
                Начните прямо сейчас
              </p>
              <a
                href="/create-material"
                className="sidebar-nav__promo-button"
              >
                Перейти
              </a>
            </div>

            <a
              href="#!"
              className="sidebar-nav__link sidebar-nav__link--help"
            >
              <span className="sidebar-nav__help-icon">?</span>
              Помощь
            </a>
          </nav>
        </aside>

        <main className="content">
          <header className="header">
            <div className="teacher-page__center">
              <div className="search">
                <input
                  className="search__field"
                  type="text"
                  placeholder="Поиск..."
                />
              </div>
            </div>

            <div className="header__right">
              <button className="notification">
                <img
                  className="notification__bell"
                  src="/img/svg/bell.svg"
                  alt="Уведомления"
                />
                <svg
                  className="notification-badge"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <circle
                    cx="6"
                    cy="6"
                    r="4"
                    fill="#EE215B"
                    stroke="white"
                    strokeWidth="2"
                  />
                </svg>
              </button>

              <div className="user">
                <div className="user__avatar" data-user-id="123">
                  И
                </div>
                <span className="user__name">Имя Фамилия</span>
                <img src="/img/svg/vec.svg" alt="▼" />
              </div>
            </div>
          </header>

          <div className="main">
            <div className="teacher-page__center">
              <div className="main__left">
                <section className="editable-section">
                  <div className="editable-section__header">
                    <h1 className="editable-section__title">Последние редактируемые</h1>
                    <div className="editable-section__meta">
                      <div className="dropdown">
                        <button className="dropdown__toggle" data-dropdown="status">
                          Статус
                          <img src="/img/svg/arrow-bottom.svg" alt="" className="dropdown__icon" />
                        </button>
                        <div className="dropdown__menu">
                          <label className="dropdown__item">
                            <input type="checkbox" name="status" value="draft" defaultChecked />
                            <span>Черновик</span>
                          </label>
                          <label className="dropdown__item">
                            <input
                              type="checkbox"
                              name="status"
                              value="publication"
                              defaultChecked
                            />
                            <span>Опубликован</span>
                          </label>
                          <label className="dropdown__item">
                            <input
                              type="checkbox"
                              name="status"
                              value="moderation"
                              defaultChecked
                            />
                            <span>На модерации</span>
                          </label>
                        </div>
                      </div>

                      <div className="dropdown">
                        <button className="dropdown__toggle" data-dropdown="subject">
                          Предмет
                          <img src="/img/svg/arrow-bottom.svg" alt="" className="dropdown__icon" />
                        </button>
                        <div className="dropdown__menu">
                          <label className="dropdown__item">
                            <input type="checkbox" name="subject" value="social" defaultChecked />
                            <span>Обществознание</span>
                          </label>
                          <label
                            className="dropdown__item"
                          >
                            <input type="checkbox" name="subject" value="chemistry" defaultChecked />
                            <span>Химия</span>
                          </label>
                          <label className="dropdown__item">
                            <input
                              type="checkbox"
                              name="subject"
                              value="astronomy"
                              defaultChecked
                            />
                            <span>Астрономия</span>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="editable-section__cards">
                    <a href="#" className="material-card">
                      <div className="material-card__header">
                        <h2 className="material-card__subject material-card__subject--social">
                          Обществознание
                        </h2>
                        <div className="material-card__status material-card__status--draft">
                          <img
                            src="/img/svg/draft-icon.svg"
                            alt=""
                            className="material-card__status-icon"
                          />
                          <div className="material-card__status-name">Черновик</div>
                        </div>
                      </div>
                      <div className="material-card__body">
                        <h3 className="material-card__title">
                          Государство как основной институт политической системы
                        </h3>
                        <div className="material-card__update">обновлен три дня назад</div>
                      </div>
                      <div className="material-card__footer">
                        <p className="material-card__path">
                          Обществознание &gt; Политическое устройство &gt; Государство
                        </p>
                        <img
                          className="material-card__arrow"
                          src="/img/svg/arrow-right.svg"
                          alt="Перейти"
                        />
                      </div>
                    </a>

                    <a href="#" className="material-card">
                      <div className="material-card__header">
                        <h2 className="material-card__subject material-card__subject--chemistry">
                          Химия
                        </h2>
                        <div className="material-card__status material-card__status--publication">
                          <img
                            src="/img/svg/publication-icon.svg"
                            alt=""
                            className="material-card__status-icon"
                          />
                          <div className="material-card__status-name">Опубликован</div>
                        </div>
                      </div>
                      <div className="material-card__body">
                        <h3 className="material-card__title">Получение и применение кислорода</h3>
                        <div className="material-card__update">обновлен три дня назад</div>
                      </div>
                      <div className="material-card__footer">
                        <p className="material-card__path">
                          Химия &gt; Воздух-Кислород &gt; Понятие об оксидах
                        </p>
                        <img
                          className="material-card__arrow"
                          src="/img/svg/arrow-right.svg"
                          alt="Перейти"
                        />
                      </div>
                    </a>

                    <a href="#" className="material-card">
                      <div className="material-card__header">
                        <h2 className="material-card__subject material-card__subject--astronomy">
                          Астрономия
                        </h2>
                        <div className="material-card__status material-card__status--moderation">
                          <img
                            src="/img/svg/moderation-icon.svg"
                            alt=""
                            className="material-card__status-icon"
                          />
                          <div className="material-card__status-name">На модерации</div>
                        </div>
                      </div>
                      <div className="material-card__body">
                        <h3 className="material-card__title">Получение и применение кислорода</h3>
                        <div className="material-card__update">обновлен три дня назад</div>
                      </div>
                      <div className="material-card__footer">
                        <p className="material-card__path">
                          Химия &gt; Воздух-Кислород &gt; Понятие об оксидах
                        </p>
                        <img
                          className="material-card__arrow"
                          src="/img/svg/arrow-right.svg"
                          alt="Перейти"
                        />
                      </div>
                    </a>
                  </div>
                </section>

                <section className="compilation">
                  <h2 className="compilation__title">Подобрали для вас полезные туториалы</h2>

                  <div className="compilation__three-cards">
                    <a href="#" className="compilation__card compilation__card--dark">
                      <img
                        className="compilation__card-img"
                        src="/img/svg/compilation__card-1.svg"
                        alt=""
                      />
                      <h3 className="compilation__card-title compilation__card-title--light">
                        Первый урок — база для создания
                      </h3>
                      <p className="compilation__card-text compilation__card-text--light">
                        Разберёмся с элементами системы и создадим свой первый материал
                      </p>
                    </a>

                    <a href="#" className="compilation__card compilation__card--purple">
                      <img
                        className="compilation__card-img"
                        src="/img/svg/compilation__card-2.svg"
                        alt=""
                      />
                      <h3 className="compilation__card-title compilation__card-title--dark">
                        Как создать интерактивные элементы
                      </h3>
                      <p className="compilation__card-text compilation__card-text--dark">
                        Научимся быстро и легко делать наглядные интерактивные элементы на
                        разных примерах
                      </p>
                    </a>

                    <a href="#" className="compilation__card compilation__card--gradient">
                      <img
                        className="compilation__card-img"
                        src="/img/svg/compilation__card-3.svg"
                        alt=""
                      />
                      <h3 className="compilation__card-title compilation__card-title--light">
                        Как продвигать свои материалы
                      </h3>
                      <p className="compilation__card-text compilation__card-text--light">
                        Разберем продвижение на платформе. Продвижение поможет вам найти новых
                        учеников
                      </p>
                    </a>
                  </div>
                </section>

                <section className="choice">
                  <div className="choice__line">
                    <h2 className="choice__title">Выбор редакции</h2>
                    <a href="" className="choice__all">
                      <span className="choice__all-text">Смотреть все</span>
                      <img src="/img/svg/all.svg" alt="Стрелка" className="choice__all-icon" />
                    </a>
                  </div>

                  <div className="choice__cards">
                    <a href="/math" className="choice__card choice__card--math">
                      <span className="choice__card-text">Математика</span>
                    </a>
                    <a href="/biology" className="choice__card choice__card--biology">
                      <span className="choice__card-text">Биология</span>
                    </a>
                    <a href="/history" className="choice__card choice__card--history">
                      <span className="choice__card-text">История</span>
                    </a>
                    <a href="/social" className="choice__card choice__card--social">
                      <span className="choice__card-text">Общество&shy;знание</span>
                    </a>
                    <a href="/chemistry" className="choice__card choice__card--chemistry">
                      <span className="choice__card-text">Химия</span>
                    </a>
                    <a href="/informatics" className="choice__card choice__card--informatics">
                      <span className="choice__card-text">Информатика</span>
                    </a>
                    <a href="/astronomy" className="choice__card choice__card--astronomy">
                      <span className="choice__card-text">Астрономия</span>
                    </a>
                    <a href="/literature" className="choice__card choice__card--literature">
                      <span className="choice__card-text">Литература</span>
                    </a>
                    <a href="/english" className="choice__card choice__card--english">
                      <span className="choice__card-text">Английский язык</span>
                    </a>
                    <a href="/russian" className="choice__card choice__card--russian">
                      <span className="choice__card-text">
                        Русский<br />язык
                      </span>
                    </a>
                    <a href="/geography" className="choice__card choice__card--geography">
                      <span className="choice__card-text">География</span>
                    </a>
                    <a href="/physics" className="choice__card choice__card--physics">
                      <span className="choice__card-text">Физика</span>
                    </a>
                  </div>
                </section>
              </div>
            </div>

            <div className="main__right">
              <section className="stats-card">
                <div className="stats-card__header">
                  <h2 className="stats-card__title">Статистика</h2>

                  <div className="stats-card__controls">
                    <button className="stats-card__select">
                      Просмотры
                      <img
                        src="/img/svg/arrow-bottom.svg"
                        alt=""
                        className="stats-card__select-icon"
                      />
                    </button>

                    <div className="stats-card__tabs">
                      <button className="stats-card__tab stats-card__tab--active">Неделя</button>
                      <button className="stats-card__tab">Месяц</button>
                    </div>
                  </div>
                </div>

                <div className="stats-card__chart">
                  <div className="stats-card__chart-line" />
                  <div className="stats-card__chart-point" />
                </div>

                <div className="stats-card__footer">
                  <div className="stats-card__metric">
                    <span className="stats-card__metric-label">всего</span>
                    <span className="stats-card__metric-value">1243</span>
                  </div>
                  <div className="stats-card__metric">
                    <span className="stats-card__metric-label">за период</span>
                    <span className="stats-card__metric-value stats-card__metric-value--accent">
                      +1208
                    </span>
                  </div>
                </div>
              </section>

              <section className="promo-card">
                <div className="promo-card__content">
                  <h2 className="promo-card__title">Продвижение подключено</h2>
                  <p className="promo-card__subtitle">Активно ещё 7 дней</p>
                </div>
                <div className="promo-card__illustration" />
              </section>

              <section className="teachers-card">
                <div className="teachers-card__header">
                  <h2 className="teachers-card__title">Популярные преподаватели</h2>
                  <button className="teachers-card__all">
                    Все
                    <img
                      src="/img/svg/arrow-right.svg"
                      alt=""
                      className="teachers-card__all-icon"
                    />
                  </button>
                </div>

                <ul className="teachers-card__list">
                  <li className="teacher">
                    <img
                      className="teacher__avatar"
                      src="/img/teachers/teacher-1.png"
                      alt="Горобец Наталья Александровна"
                    />
                    <div className="teacher__content">
                      <div className="teacher__top">
                        <div className="teacher__info">
                          <div className="teacher__name">Горобец Наталья Александровна</div>
                          <div className="teacher__tags">
                            <span className="teacher-tag teacher-tag--blue">Физика</span>
                            <span className="teacher-tag teacher-tag--green">Математика</span>
                          </div>
                        </div>
                        <div className="teacher__stats">
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">👁</span>
                            <span className="teacher__stat-value">1208</span>
                          </div>
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">★</span>
                            <span className="teacher__stat-value">5.0</span>
                          </div>
                        </div>
                      </div>

                      <div className="teacher__bottom">
                        <span className="teacher-label teacher-label--editor">Выбор редакции</span>
                        <div className="teacher__materials">
                          <span className="teacher__materials-icon">📚</span>
                          <span className="teacher__materials-count">123</span>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="teacher">
                    <img
                      className="teacher__avatar"
                      src="/img/teachers/teacher-2.png"
                      alt="Алексеев Владимир Бедросович"
                    />
                    <div className="teacher__content">
                      <div className="teacher__top">
                        <div className="teacher__info">
                          <div className="teacher__name">Алексеев Владимир Бедросович</div>
                          <div className="teacher__tags">
                            <span className="teacher-tag teacher-tag--orange">Обществознание</span>
                            <span className="teacher-tag teacher-tag--yellow">История</span>
                          </div>
                        </div>
                        <div className="teacher__stats">
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">👁</span>
                            <span className="teacher__stat-value">568</span>
                          </div>
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">★</span>
                            <span className="teacher__stat-value">4.8</span>
                          </div>
                        </div>
                      </div>

                      <div className="teacher__bottom">
                        <span className="teacher-label teacher-label--editor">Выбор редакции</span>
                        <div className="teacher__materials">
                          <span className="teacher__materials-icon">📚</span>
                          <span className="teacher__materials-count">45</span>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li className="teacher">
                    <img
                      className="teacher__avatar"
                      src="/img/teachers/teacher-3.png"
                      alt="Кузьмин Юрий Олегович"
                    />
                    <div className="teacher__content">
                      <div className="teacher__top">
                        <div className="teacher__info">
                          <div className="teacher__name">Кузьмин Юрий Олегович</div>
                          <div className="teacher__tags">
                            <span className="teacher-tag teacher-tag--purple">Физика</span>
                            <span className="teacher-tag teacher-tag--blue-light">Астрономия</span>
                          </div>
                        </div>
                        <div className="teacher__stats">
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">👁</span>
                            <span className="teacher__stat-value">282</span>
                          </div>
                          <div className="teacher__stat">
                            <span className="teacher__stat-icon">★</span>
                            <span className="teacher__stat-value">4.8</span>
                          </div>
                        </div>
                      </div>

                      <div className="teacher__bottom">
                        <span className="teacher-label teacher-label--editor">Выбор редакции</span>
                        <div className="teacher__materials">
                          <span className="teacher__materials-icon">📚</span>
                          <span className="teacher__materials-count">12</span>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
