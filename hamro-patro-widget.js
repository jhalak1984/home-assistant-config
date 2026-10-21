(() => {
  'use strict';

  const bsOutput = document.getElementById('patroTodayBs');
  const adOutput = document.getElementById('patroTodayAd');
  if (!bsOutput || !adOutput) return;

  const NepaliDate = window.NepaliDate?.default || window.NepaliDate;
  if (typeof NepaliDate !== 'function') {
    bsOutput.textContent = 'Nepali date unavailable';
    return;
  }

  try {
    const today = new Date();
    const nepaliToday = new NepaliDate(today);
    bsOutput.textContent = nepaliToday.format('ddd, DD MMMM YYYY', 'en');
    adOutput.textContent = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    bsOutput.textContent = 'Nepali date unavailable';
  }
})();
