(() => {
  'use strict';

  const NepaliDate = window.NepaliDate?.default || window.NepaliDate;
  const storageKey = 'hamro-patro-events-v1';
  const weekdaysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const copy = {
    en: {today: 'Today', add: 'Add event', selected: 'SELECTED DAY', plans: 'Your plans', empty: 'Nothing planned yet. Leave a little room for the unexpected.', event: 'Personal event', privacy: 'Your events stay on this device.', makeNote: 'MAKE A NOTE', addTitle: 'Add an event', save: 'Save event', cancel: 'Cancel', note: 'Note', optional: 'Optional', remove: 'Remove', loadError: 'Nepali calendar dates could not load. Check your internet connection and reload this page.'},
    np: {today: 'आज', add: 'कार्यक्रम थप्नुहोस्', selected: 'छानिएको दिन', plans: 'तपाईंका योजना', empty: 'अहिलेसम्म केही योजना छैन।', event: 'व्यक्तिगत कार्यक्रम', privacy: 'तपाईंका कार्यक्रम यही उपकरणमा सुरक्षित हुन्छन्।', makeNote: 'नोट लेख्नुहोस्', addTitle: 'कार्यक्रम थप्नुहोस्', save: 'सुरक्षित गर्नुहोस्', cancel: 'रद्द गर्नुहोस्', note: 'टिप्पणी', optional: 'ऐच्छिक', remove: 'हटाउनुहोस्', loadError: 'नेपाली पात्रो लोड हुन सकेन। इन्टरनेट जाँच गरेर यो पृष्ठ फेरि खोल्नुहोस्।'}
  };
  const $ = (id) => document.getElementById(id);
  const grid = $('calendarGrid');
  const today = new Date();
  let language = 'en';
  let viewDate;
  let selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
  let events = loadEvents();

  function loadEvents() {
    try {
      const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      return Array.isArray(data) ? data.filter((item) => item && typeof item.id === 'string' && typeof item.date === 'string' && typeof item.title === 'string') : [];
    } catch {
      return [];
    }
  }

  function dateKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function dateFromKey(key) {
    const [year, month, day] = key.split('-').map(Number);
    return new Date(year, month - 1, day, 12);
  }

  function asNepaliDate(date) {
    return new NepaliDate(new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12));
  }

  function formatAd(date, locale = language === 'np' ? 'ne-NP' : 'en-GB') {
    return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function saveEvents() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(events));
      $('dateNote').textContent = '';
    } catch {
      $('dateNote').textContent = 'Could not save events in this browser. Check its storage settings.';
    }
  }

  function setLanguage(nextLanguage) {
    language = nextLanguage;
    $('languageToggle').textContent = language === 'en' ? 'नेपाली' : 'English';
    $('languageToggle').setAttribute('aria-label', language === 'en' ? 'Switch to Nepali' : 'Switch to English');
    $('todayButton').firstChild.textContent = `${copy[language].today} `;
    $('addEventButton').querySelector('.add-label').textContent = copy[language].add;
    $('selectedWeekday').textContent = copy[language].selected;
    $('dayPanelTitle').textContent = copy[language].plans;
    $('legendToday').textContent = copy[language].today;
    $('legendEvent').textContent = copy[language].event;
    $('privacyText').textContent = copy[language].privacy;
    $('addSelectedEvent').textContent = `＋ ${copy[language].add}`;
    $('dialogTitle').textContent = copy[language].addTitle;
    $('saveEventLabel').textContent = copy[language].save;
    $('cancelDialog').textContent = copy[language].cancel;
    $('eventNoteLabel').textContent = copy[language].note;
    $('eventOptionalLabel').textContent = copy[language].optional;
    render();
  }

  function monthName(date, lang) {
    return date.format('MMMM YYYY', lang);
  }

  function renderWeekdays() {
    const names = Array.from({ length: 7 }, (_, index) => {
      if (language === 'en') return weekdaysEn[index];
      const sample = new Date(2024, 0, 7 + index, 12);
      return asNepaliDate(sample).format('ddd', 'np');
    });
    $('weekdays').replaceChildren(...names.map((name, index) => {
      const item = document.createElement('span');
      item.textContent = name;
      if (index === 0) item.className = 'sunday-label';
      return item;
    }));
  }

  function renderToday() {
    const bs = asNepaliDate(today);
    $('todayBs').textContent = bs.format('ddd, DD MMMM YYYY', language);
    $('todayAd').textContent = formatAd(today, language === 'np' ? 'en-GB' : 'ne-NP');
    $('todayWeekday').textContent = language === 'en' ? 'YOUR DAY, IN NEPAL' : 'नेपालमा आज';
  }

  function renderSelectedDay() {
    const bs = asNepaliDate(selectedDate);
    $('selectedDate').textContent = bs.format('DD MMMM YYYY', language);
    $('selectedAd').textContent = formatAd(selectedDate, language === 'np' ? 'en-GB' : 'ne-NP');
    const dayEvents = events.filter((event) => event.date === dateKey(selectedDate));
    $('eventCount').textContent = dayEvents.length ? String(dayEvents.length) : '';
    const list = $('eventList');
    list.replaceChildren();
    if (!dayEvents.length) {
      const empty = document.createElement('p');
      empty.className = 'empty-message';
      empty.textContent = copy[language].empty;
      list.append(empty);
      return;
    }
    dayEvents.forEach((event) => {
      const item = document.createElement('article');
      item.className = 'event-item';
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.textContent = copy[language].remove;
      remove.setAttribute('aria-label', `${copy[language].remove}: ${event.title}`);
      remove.addEventListener('click', () => {
        events = events.filter((saved) => saved.id !== event.id);
        saveEvents();
        render();
      });
      const title = document.createElement('h4');
      title.textContent = event.title;
      item.append(remove, title);
      if (event.note) {
        const note = document.createElement('p');
        note.textContent = event.note;
        item.append(note);
      }
      list.append(item);
    });
  }

  function renderCalendar() {
    const year = viewDate.getYear();
    const month = viewDate.getMonth();
    const firstDay = new NepaliDate(year, month, 1);
    const nextMonth = new NepaliDate(year, month + 1, 1);
    const firstAd = firstDay.toJsDate();
    const nextAd = nextMonth.toJsDate();
    const firstUtc = Date.UTC(firstAd.getFullYear(), firstAd.getMonth(), firstAd.getDate());
    const nextUtc = Date.UTC(nextAd.getFullYear(), nextAd.getMonth(), nextAd.getDate());
    const daysInMonth = Math.round((nextUtc - firstUtc) / 86400000);
    const offset = firstDay.getDay();
    const primaryTitle = monthName(firstDay, language);
    const secondaryTitle = monthName(firstDay, language === 'en' ? 'np' : 'en');
    $('monthTitle').textContent = primaryTitle;
    $('monthSubtitle').textContent = secondaryTitle;

    const cells = [];
    for (let empty = 0; empty < offset; empty += 1) {
      const blank = document.createElement('span');
      blank.className = 'empty-cell';
      blank.setAttribute('aria-hidden', 'true');
      cells.push(blank);
    }
    for (let day = 1; day <= daysInMonth; day += 1) {
      const bs = new NepaliDate(year, month, day);
      const ad = bs.toJsDate();
      const key = dateKey(ad);
      const hasEvents = events.some((event) => event.date === key);
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'day-cell';
      button.setAttribute('role', 'gridcell');
      button.setAttribute('aria-label', `${bs.format('ddd, DD MMMM YYYY', 'en')}, ${formatAd(ad, 'en-GB')}${hasEvents ? `, ${copy.en.event}` : ''}`);
      if (dateKey(ad) === dateKey(today)) button.classList.add('today');
      if (dateKey(ad) === dateKey(selectedDate)) button.classList.add('selected');
      if (ad.getDay() === 0) button.classList.add('sunday');
      if (hasEvents) button.classList.add('has-events');
      const bsNumber = document.createElement('span');
      bsNumber.className = 'bs-number';
      bsNumber.textContent = bs.format('D', language);
      const adNumber = document.createElement('span');
      adNumber.className = 'ad-number';
      adNumber.textContent = String(ad.getDate());
      button.append(bsNumber, adNumber);
      if (hasEvents) {
        const mark = document.createElement('i');
        mark.className = 'event-mark';
        mark.setAttribute('aria-hidden', 'true');
        button.append(mark);
      }
      button.addEventListener('click', () => {
        selectedDate = dateFromKey(key);
        render();
      });
      cells.push(button);
    }
    grid.replaceChildren(...cells);
  }

  function render() {
    renderToday();
    renderWeekdays();
    renderCalendar();
    renderSelectedDay();
  }

  function openEventDialog() {
    $('eventDate').value = dateKey(selectedDate);
    $('eventTitle').value = '';
    $('eventNote').value = '';
    $('eventDialog').showModal();
    $('eventTitle').focus();
  }

  function showLoadError() {
    $('monthTitle').textContent = 'Calendar unavailable';
    $('monthSubtitle').textContent = '';
    $('todayBs').textContent = 'Hamro Patro';
    $('dateNote').textContent = copy.en.loadError;
    $('previousMonth').disabled = true;
    $('nextMonth').disabled = true;
    $('addEventButton').disabled = true;
    $('addSelectedEvent').disabled = true;
  }

  if (typeof NepaliDate !== 'function') {
    showLoadError();
    return;
  }

  try {
    viewDate = asNepaliDate(today);
    $('todayButton').addEventListener('click', () => {
      viewDate = asNepaliDate(today);
      selectedDate = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 12);
      render();
    });
    $('previousMonth').addEventListener('click', () => {
      viewDate = new NepaliDate(viewDate.getYear(), viewDate.getMonth() - 1, 1);
      render();
    });
    $('nextMonth').addEventListener('click', () => {
      viewDate = new NepaliDate(viewDate.getYear(), viewDate.getMonth() + 1, 1);
      render();
    });
    $('languageToggle').addEventListener('click', () => setLanguage(language === 'en' ? 'np' : 'en'));
    $('addEventButton').addEventListener('click', openEventDialog);
    $('addSelectedEvent').addEventListener('click', openEventDialog);
    $('closeDialog').addEventListener('click', () => $('eventDialog').close());
    $('cancelDialog').addEventListener('click', () => $('eventDialog').close());
    $('eventForm').addEventListener('submit', (event) => {
      event.preventDefault();
      const form = new FormData(event.currentTarget);
      const title = String(form.get('title') || '').trim();
      const date = String(form.get('date') || '');
      const note = String(form.get('note') || '').trim();
      if (!title || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return;
      events.push({ id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`, title, date, note });
      selectedDate = dateFromKey(date);
      saveEvents();
      $('eventDialog').close();
      render();
    });
    render();
  } catch {
    showLoadError();
  }
})();
