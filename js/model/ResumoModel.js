// Model: conteúdo e regras da revisão interativa.
window.ResumoModel = (() => {
  const notesStorageKey = 'cadernoCivil.notes.v1';
  const fontScaleStorageKey = 'cadernoCivil.fontScale.v1';
  const noteFields = ['roc', 'resp', 're', 'duvidas'];
  const quiz = {
    answer: 'stj',
    explanation: 'Isso mesmo. O art. 105, II, “b”, prevê ROC ao STJ contra mandado de segurança denegado em única instância por TRF ou Tribunal de Justiça.'
  };

  function checkAnswer(answer) {
    return {
      correct: answer === quiz.answer,
      message: answer === quiz.answer
        ? quiz.explanation
        : 'Quase. Como a decisão veio de Tribunal de Justiça, a hipótese está no art. 105, II, “b”: o ROC é julgado pelo STJ.'
    };
  }

  function getNotes() {
    try {
      const saved = JSON.parse(localStorage.getItem(notesStorageKey) || '{}');
      return Object.fromEntries(noteFields.map((field) => [field, saved[field] || '']));
    } catch {
      return Object.fromEntries(noteFields.map((field) => [field, '']));
    }
  }

  function saveNote(field, value) {
    if (!noteFields.includes(field)) return false;
    try {
      const notes = getNotes();
      notes[field] = value;
      localStorage.setItem(notesStorageKey, JSON.stringify(notes));
      return true;
    } catch {
      return false;
    }
  }

  function clearNotes() {
    try {
      localStorage.removeItem(notesStorageKey);
      return true;
    } catch {
      return false;
    }
  }

  function getFontScale() {
    try {
      const scale = Number(localStorage.getItem(fontScaleStorageKey));
      return Number.isFinite(scale) && scale >= 0.9 && scale <= 1.3 ? scale : 1;
    } catch {
      return 1;
    }
  }

  function saveFontScale(scale) {
    const normalized = Math.min(1.3, Math.max(0.9, Math.round(Number(scale) * 100) / 100));
    try {
      localStorage.setItem(fontScaleStorageKey, String(normalized));
    } catch {
      // A mudança visual continua funcionando mesmo se o navegador bloquear o armazenamento.
    }
    return normalized;
  }

  return { checkAnswer, getNotes, saveNote, clearNotes, getFontScale, saveFontScale };
})();
