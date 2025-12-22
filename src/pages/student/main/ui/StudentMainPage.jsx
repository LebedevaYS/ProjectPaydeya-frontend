import { useEffect } from "react";
import "../../../../shared/styles/main_student.css";

export function StudentMainPage() {
  // Слайдер подсветки в боковом меню
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
      const currentActiveIndex = parseInt(activeLink.getAttribute("data-index") || "0", 10);
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

  // Скролл “Продолжить обучение”
  useEffect(() => {
    const container = document.querySelector(".editable-section__cards-container");
    const prevButton = document.querySelector(".editable-section__nav-button--prev");
    const nextButton = document.querySelector(".editable-section__nav-button--next");

    if (!container || !prevButton || !nextButton) return;

    const prevIcon = prevButton.querySelector("img");
    const nextIcon = nextButton.querySelector("img");
    if (!prevIcon || !nextIcon) return;

    const CARD_WIDTH = 233;
    const GAP = 12;

    const updateControls = () => {
      const scrollLeft = container.scrollLeft;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;

      const canScrollPrev = scrollLeft > 0;
      const canScrollNext = scrollLeft + clientWidth < scrollWidth - 10;

      prevIcon.src = canScrollPrev
        ? "./img/svg/chevron-left-2.svg"
        : "./img/svg/chevron-left-1.svg";
      nextIcon.src = canScrollNext
        ? "./img/svg/chevron-right-2.svg"
        : "./img/svg/chevron-right-1.svg";

      prevButton.disabled = !canScrollPrev;
      nextButton.disabled = !canScrollNext;
    };

    const onPrev = () => container.scrollBy({ left: -(CARD_WIDTH + GAP), behavior: "smooth" });
    const onNext = () => container.scrollBy({ left: CARD_WIDTH + GAP, behavior: "smooth" });

    prevButton.addEventListener("click", onPrev);
    nextButton.addEventListener("click", onNext);
    container.addEventListener("scroll", updateControls);
    window.addEventListener("resize", updateControls);

    updateControls();

    return () => {
      prevButton.removeEventListener("click", onPrev);
      nextButton.removeEventListener("click", onNext);
      container.removeEventListener("scroll", updateControls);
      window.removeEventListener("resize", updateControls);
    };
  }, []);

  return (
    <div className="student-page">
        <div className="container">
        {/* Sidebar */}
        <aside className="sidebar sidebar--left">
            <nav className="sidebar-nav">
            <div className="sidebar-nav__header">
                <img className="sidebar-nav__logo" src="./img/svg/logo.svg" alt="Тойлейя" />
            </div>

            <div className="sidebar-nav__menu-container">
                <ul className="sidebar-nav__menu">
                <li className="sidebar-nav__item">
                    <a className="sidebar-nav__link sidebar-nav__link--active" data-index="0" href="#!">
                    <div className="sidebar-nav__icon-wrapper">
                        <img className="sidebar-nav__icon sidebar-nav__icon--default" src="./img/svg/home-1.svg" alt="" />
                        <img className="sidebar-nav__icon sidebar-nav__icon--hover" src="./img/svg/home-2.svg" alt="" />
                    </div>
                    Главная
                    </a>
                </li>

                <li className="sidebar-nav__item">
                    <a className="sidebar-nav__link" data-index="1" href="#!">
                    <div className="sidebar-nav__icon-wrapper">
                        <img className="sidebar-nav__icon sidebar-nav__icon--default" src="./img/svg/lessons-1.svg" alt="" />
                        <img className="sidebar-nav__icon sidebar-nav__icon--hover" src="./img/svg/lessons-2.svg" alt="" />
                    </div>
                    Материалы
                    </a>
                </li>

                <li className="sidebar-nav__item">
                    <a className="sidebar-nav__link" data-index="2" href="#!">
                    <div className="sidebar-nav__icon-wrapper">
                        <img className="sidebar-nav__icon sidebar-nav__icon--default" src="./img/svg/teachers-1.svg" alt="" />
                        <img className="sidebar-nav__icon sidebar-nav__icon--hover" src="./img/svg/teachers-2.svg" alt="" />
                    </div>
                    Преподаватели
                    </a>
                </li>

                <li className="sidebar-nav__item">
                    <a className="sidebar-nav__link" data-index="3" href="#!">
                    <div className="sidebar-nav__icon-wrapper">
                        <img className="sidebar-nav__icon sidebar-nav__icon--default" src="./img/svg/profile-1.svg" alt="" />
                        <img className="sidebar-nav__icon sidebar-nav__icon--hover" src="./img/svg/profile-2.svg" alt="" />
                    </div>
                    Профиль
                    </a>
                </li>
                </ul>

                <div className="sidebar-nav__slider" />
            </div>

            <div className="sidebar-nav__promo">
                <p className="sidebar-nav__promo-text">Вам еще не создавали материал</p>
                <p className="sidebar-nav__promo-subtext">Начните прямо сейчас</p>
                <a className="sidebar-nav__promo-button" href="/create-material">
                Перейти
                </a>
            </div>

            <a className="sidebar-nav__link sidebar-nav__link--help" href="#!">
                <span className="sidebar-nav__help-icon">?</span>
                Помощь
            </a>
            </nav>
        </aside>

        {/* Content */}
        <main className="content">
            <header className="header">
                <div className="search">
                <input className="search__field" type="text" placeholder="Поиск..." />
                </div>

                <div className="header__right">
                <button className="notification">
                    <img
                    className="notification__bell"
                    src="/img/svg/bell.svg"
                    alt="Уведомления"
                    />
                    <svg className="notification-badge" width="12" height="12" viewBox="0 0 12 12">
                    <circle cx="6" cy="6" r="4" fill="#EE215B" stroke="white" strokeWidth="2" />
                    </svg>
                </button>

                <div className="user">
                    <div className="user__avatar" data-user-id="123">
                    И
                    </div>
                    <span className="user__name">Ученик</span>
                    <img src="/img/svg/vec.svg" alt="▼" />
                </div>
                </div>
            </header>

            <div className="main">
            <div className="main__left">
                {/* Choice */}
                <section className="choice">
                <div className="choice__line">
                    <h1 className="choice__title">Выбор редакции</h1>
                    <a className="choice__all" href="">
                    <span className="choice__all-text">Смотреть все</span>
                    <img className="choice__all-icon" src="./img/svg/arrow-right.svg" alt="Стрелка" />
                    </a>
                </div>

                <div className="choice__cards">
                    <a className="choice__card choice__card--informatics" href="/informatics"><span className="choice__card-text">Информатика</span></a>
                    <a className="choice__card choice__card--math" href="/math"><span className="choice__card-text">Математика</span></a>
                    <a className="choice__card choice__card--biology" href="/biology"><span className="choice__card-text">Биология</span></a>
                    <a className="choice__card choice__card--history" href="/history"><span className="choice__card-text">История</span></a>

                    <a className="choice__card choice__card--social" href="/social"><span className="choice__card-text">Общество­знание</span></a>
                    <a className="choice__card choice__card--chemistry" href="/chemistry"><span className="choice__card-text">Химия</span></a>
                    <a className="choice__card choice__card--astronomy" href="/astronomy"><span className="choice__card-text">Астрономия</span></a>
                    <a className="choice__card choice__card--literature" href="/literature"><span className="choice__card-text">Литература</span></a>

                    <a className="choice__card choice__card--english" href="/english"><span className="choice__card-text">Английский язык</span></a>
                    <a className="choice__card choice__card--russian" href="/russian"><span className="choice__card-text">Русский язык</span></a>
                    <a className="choice__card choice__card--geography" href="/geography"><span className="choice__card-text">География</span></a>
                    <a className="choice__card choice__card--physics" href="/physics"><span className="choice__card-text">Физика</span></a>
                </div>
                </section>

                {/* Продолжить обучение */}
                <section className="editable-section">
                    <div className="editable-section__inner">
                    <div className="editable-section__header">
                        <h1 className="editable-section__title">Продолжить обучение</h1>
                        <div className="editable-section__nav">
                        <button className="editable-section__nav-button editable-section__nav-button--prev">
                            <img
                            src="/img/svg/chevron-left-2.svg"
                            alt="Предыдущие"
                            className="editable-section__nav-icon editable-section__nav-icon--prev"
                            />
                        </button>
                        <button className="editable-section__nav-button editable-section__nav-button--next">
                            <img
                            src="/img/svg/chevron-right-2.svg"
                            alt="Следующие"
                            className="editable-section__nav-icon editable-section__nav-icon--next"
                            />
                        </button>
                        </div>
                    </div>

                    <div className="editable-section__cards-container">
                        <div className="editable-section__cards">
                        <a href="#" className="material-card material-card--informatics">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/informatics-cards.svg"
                                alt="Информатика"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--informatics">
                                Информатика
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">Разбор ЕГЭ с циклами на питоне</h3>
                            <div className="material-card__path">
                                Ануриев Ц.В. {">"} . {">"} Питон {">"} Циклы {">"} ЕГЭ
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "75%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">8</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--math">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/math-2.svg"
                                alt="Математика"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--math">
                                Математика
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">Тригонометрия: формулы и графики</h3>
                            <div className="material-card__path">
                                Алгебра {">"} Тригонометрия {">"} Формулы
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "20%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">2</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">4</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--physics">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/physics-2.svg"
                                alt="Физика"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--physics">
                                Физика
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">Законы Ньютона и их применение</h3>
                            <div className="material-card__path">
                                Механика {">"} Динамика {">"} Законы Ньютона
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "40%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">4</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--chemistry">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/chemistry-2.svg"
                                alt="Химия"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--chemistry">
                                Химия
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">Органическая химия: углеводороды</h3>
                            <div className="material-card__path">
                                Органическая химия {">"} Углеводороды {">"} Алканы
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "60%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">6</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--history">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/history-2.svg"
                                alt="История"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--history">
                                История
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">
                                Эпоха Петра I: реформы и преобразования
                            </h3>
                            <div className="material-card__path">
                                Российская история {">"} XVIII век {">"} Петр I
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "90%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">9</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--biology">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/biology-2.png"
                                alt="Биология"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--biology">
                                Биология
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">
                                Строение клетки: органоиды и их функции
                            </h3>
                            <div className="material-card__path">
                                Цитология {">"} Клеточное строение {">"} Органоиды
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "30%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">3</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>

                        <a href="#" className="material-card material-card--social">
                            <div className="material-card__icon">
                            <img
                                src="/img/svg/social-2.svg"
                                alt="Обществознание"
                                className="material-card__icon-img"
                            />
                            </div>

                            <div className="material-card__header">
                            <div className="material-card__subject-wrapper">
                                <span className="material-card__subject material-card__subject--social">
                                Обществознание
                                </span>
                            </div>
                            </div>

                            <div className="material-card__body">
                            <h3 className="material-card__title">
                                Политическая система: государство и право
                            </h3>
                            <div className="material-card__path">
                                Обществознание {">"} Политика {">"} Государство
                            </div>
                            </div>

                            <div className="material-card__progress-wrapper">
                            <div className="material-card__progress-info">
                                <div className="progress-bar">
                                <div className="progress-fill" style={{ width: "70%" }} />
                                </div>
                                <span className="progress-text">
                                <span className="progress-text--current">7</span>
                                <span className="progress-text--separator">/</span>
                                <span className="progress-text--total">10</span>
                                </span>
                            </div>
                            <p className="material-card__progress-label">Пройдено уроков из раздела</p>
                            </div>
                        </a>
                        </div>
                    </div>
                    </div>
                </section>

                {/* Подобрали для вас уроки */}
                <section className="recommended-lessons">
                    <header className="recommended-lessons__header">
                        <h1 className="recommended-lessons__title">Подобрали для вас уроки</h1>
                        <button className="subjects-button">
                        Предметы
                        <img className="subjects-button__icon" src="./img/svg/vec.svg" alt="▼" />
                        </button>
                    </header>

                    <div className="recommended-lessons__list">
                        {/* Обществознание */}
                        <article className="lesson-card lesson-card--social">
                            <div className="lesson-card__icon"></div>

                            <div className="lesson-card__content">
                            <div className="lesson-card__subject-header">
                                <span className="material-card__subject material-card__subject--social">
                                Обществознание
                                </span>

                                <div className="lesson-card__badges">
                                <span className="lesson-card__badge">8 класс</span>
                                <span className="lesson-card__badge">№11 ЕГЭ</span>

                                <span className="lesson-card__badge lesson-card__badge--editor">
                                    <img
                                    src="./img/svg/award.svg"
                                    alt="Награда"
                                    className="lesson-card__badge-icon"
                                    />
                                    Выбор редакции
                                </span>
                                </div>
                            </div>

                            <div className="lesson-card__title-row">
                                <h3 className="lesson-card__title">
                                Государство как основной институт политической системы
                                </h3>

                                <div className="lesson-card__stats">
                                <img className="lesson-card__eye-icon" src="./img/svg/eye.svg" alt="Просмотры" />
                                <span className="lesson-card__stats-number">1208</span>
                                <span className="lesson-card__stars">☆ 5.0</span>
                                </div>
                            </div>

                            <div className="lesson-card__path-row">
                                <div className="lesson-card__path">
                                Иванова А.А. {">"} Обществознание {">"} Политическое устройство {">"} Государство
                                </div>
                                <a className="lesson-card__link" href="#">
                                <img className="lesson-card__link-arrow" src="./img/svg/arrow-right.svg" alt="→" />
                                </a>
                            </div>
                            </div>
                        </article>

                        {/* Химия */}
                        <article className="lesson-card lesson-card--chemistry">
                            <div className="lesson-card__icon"></div>

                            <div className="lesson-card__content">
                            <div className="lesson-card__subject-header">
                                <span className="material-card__subject material-card__subject--chemistry">
                                Химия
                                </span>

                                <div className="lesson-card__badges">
                                <span className="lesson-card__badge">8 класс</span>
                                <span className="lesson-card__badge">№9 ЕГЭ</span>
                                </div>
                            </div>

                            <div className="lesson-card__title-row">
                                <h3 className="lesson-card__title">
                                Периодическая таблица и закономерности изменения свойств химии...
                                </h3>

                                <div className="lesson-card__stats">
                                <img className="lesson-card__eye-icon" src="./img/svg/eye.svg" alt="Просмотры" />
                                <span className="lesson-card__stats-number">1208</span>
                                <span className="lesson-card__stars">☆ 5.0</span>
                                </div>
                            </div>

                            <div className="lesson-card__path-row">
                                <div className="lesson-card__path">
                                Иванова А.А. {">"} Химия {">"} 8 класс {">"} Периодический закон и Периодическая система химических систем
                                </div>
                                <a className="lesson-card__link" href="#">
                                <img className="lesson-card__link-arrow" src="./img/svg/arrow-right.svg" alt="→" />
                                </a>
                            </div>
                            </div>
                        </article>

                        {/* Астрономия */}
                        <article className="lesson-card lesson-card--astronomy">
                            <div className="lesson-card__icon"></div>

                            <div className="lesson-card__content">
                            <div className="lesson-card__subject-header">
                                <span className="material-card__subject material-card__subject--astronomy">
                                Астрономия
                                </span>

                                <div className="lesson-card__badges">
                                <span className="lesson-card__badge">11 класс</span>

                                <span className="lesson-card__badge lesson-card__badge--editor">
                                    <img
                                    src="./img/svg/award.svg"
                                    alt="Награда"
                                    className="lesson-card__badge-icon"
                                    />
                                    Выбор редакции
                                </span>
                                </div>
                            </div>

                            <div className="lesson-card__title-row">
                                <h3 className="lesson-card__title">
                                Солнечная система: планеты земной группы и планеты гиганты, мал...
                                </h3>

                                <div className="lesson-card__stats">
                                <img className="lesson-card__eye-icon" src="./img/svg/eye.svg" alt="Просмотры" />
                                <span className="lesson-card__stats-number">1208</span>
                                <span className="lesson-card__stars">☆ 5.0</span>
                                </div>
                            </div>

                            <div className="lesson-card__path-row">
                                <div className="lesson-card__path">
                                Иванова А.А. {">"} Астрономия {">"} 11 класс {">"} Солнечная система
                                </div>
                                <a className="lesson-card__link" href="#">
                                <img className="lesson-card__link-arrow" src="./img/svg/arrow-right.svg" alt="→" />
                                </a>
                            </div>
                            </div>
                        </article>
                        </div>
                    </section>
                </div>

                {/* Правая колонка (как в HTML) */}
                <div className="main__right">
                    <section className="stats-card">
                    <div className="stats-card__header">
                        <h2 className="stats-card__title">Занятия 6 дней подряд</h2>
                    </div>
                    <div className="streak-content">
                        <div className="streak-number">6</div>
                        <p className="streak-text">Дней активного обучения</p>
                        <button className="streak-button">Все дни</button>
                    </div>
                    </section>

                    <section className="promo-card">
                    <div className="promo-card__content">
                        <h2 className="promo-card__title">Вам еще не создавали материал</h2>
                        <p className="promo-card__subtitle">Начните прямо сейчас</p>
                        <button className="promo-card__button">Перейти</button>
                    </div>
                    </section>

                <section className="teachers-card">
                    <div className="teachers-card__header">
                    <h2 className="teachers-card__title">Популярные преподаватели</h2>
                    <button className="teachers-card__all">
                        Все
                        <img src="/img/svg/arrow-right.svg" alt="" className="teachers-card__all-icon" />
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