// Controller: coordena as interações entre Model e View.
window.ResumoController = ((model, view) => {
  function init() {
    view.bindRouteToggles();
    view.bindPrint();
    view.bindQuiz((answer) => {
      view.showAnswer(model.checkAnswer(answer), answer);
    }, () => view.resetQuiz());
    view.bindNotes(model.getNotes(), (field, value) => {
      view.showNotesStatus(model.saveNote(field, value));
    }, () => {
      view.clearNotes(model.clearNotes());
    });
    let fontScale = model.getFontScale();
    view.bindFontSize(fontScale, (change) => {
      fontScale = model.saveFontScale(fontScale + change);
      view.updateFontSize(fontScale);
    });
  }

  return { init };
})(window.ResumoModel, window.ResumoView);
