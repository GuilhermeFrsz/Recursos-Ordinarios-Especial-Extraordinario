// View: atualiza a interface e comunica ações do usuário ao Controller.
window.ResumoView = (() => {
  const answerButtons = [...document.querySelectorAll('[data-answer]')];
  const feedback = document.querySelector('#quiz-feedback');
  const resetButton = document.querySelector('#quiz-reset');

  function bindRouteToggles() {
    document.querySelectorAll('.route-item').forEach((button) => {
      button.addEventListener('click', () => {
        const expanded = button.getAttribute('aria-expanded') === 'true';
        button.setAttribute('aria-expanded', String(!expanded));
      });
    });
  }

  function bindQuiz(onAnswer, onReset) {
    answerButtons.forEach((button) => {
      button.addEventListener('click', () => onAnswer(button.dataset.answer));
    });
    resetButton.addEventListener('click', onReset);
  }

  function showAnswer(result, selectedAnswer) {
    answerButtons.forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === 'stj') button.classList.add('correct');
      else if (button.dataset.answer === selectedAnswer) button.classList.add('incorrect');
    });
    feedback.textContent = result.message;
    feedback.style.color = result.correct ? '#597359' : '#9a4b32';
    resetButton.hidden = false;
  }

  function resetQuiz() {
    answerButtons.forEach((button) => {
      button.disabled = false;
      button.classList.remove('correct', 'incorrect');
    });
    feedback.textContent = '';
    resetButton.hidden = true;
  }

  function bindNotes(initialNotes, onChange, onClear) {
    const fields = [...document.querySelectorAll('[data-note]')];
    fields.forEach((field) => {
      field.value = initialNotes[field.dataset.note] || '';
      field.addEventListener('input', () => onChange(field.dataset.note, field.value));
    });
    document.querySelector('#clear-notes').addEventListener('click', onClear);
  }

  function showNotesStatus(saved) {
    document.querySelector('#notes-status').textContent = saved
      ? 'Salvo automaticamente neste navegador'
      : 'Não foi possível salvar neste navegador';
  }

  function clearNotes(saved) {
    document.querySelectorAll('[data-note]').forEach((field) => { field.value = ''; });
    document.querySelector('#notes-status').textContent = saved
      ? 'Anotações limpas'
      : 'Não foi possível limpar as anotações';
  }

  function bindFontSize(initialScale, onChange) {
    const decreaseButton = document.querySelector('#font-decrease');
    const increaseButton = document.querySelector('#font-increase');
    decreaseButton.addEventListener('click', () => onChange(-0.1));
    increaseButton.addEventListener('click', () => onChange(0.1));
    updateFontSize(initialScale);
  }

  function updateFontSize(scale) {
    document.documentElement.style.setProperty('--reading-scale', scale);
    document.querySelector('#font-size-value').textContent = `${Math.round(scale * 100)}%`;
    document.querySelector('#font-decrease').disabled = scale <= 0.9;
    document.querySelector('#font-increase').disabled = scale >= 1.3;
  }

  function bindPrint() {
    document.querySelector('#print-page').addEventListener('click', () => window.print());
  }

  return { bindRouteToggles, bindQuiz, showAnswer, resetQuiz, bindNotes, showNotesStatus, clearNotes, bindFontSize, updateFontSize, bindPrint };
})();
