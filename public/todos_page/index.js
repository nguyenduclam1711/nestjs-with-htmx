document.body.addEventListener('getTodoInputsSuccessfullyEvent', function (e) {
  const form = document.getElementById('create_or_edit_todo_modal_form');
  if (form && e.detail) {
    form.removeAttribute('hx-post');
    form.removeAttribute('hx-put');
    const { htmxAttr, htmxVal } = e.detail;
    form.setAttribute(htmxAttr, htmxVal);
    htmx.process(form);
  }
  const modalTitleEle = document.getElementById(
    'create_or_edit_todo_modal_title',
  );
  if (modalTitleEle) {
    const { modalTitle } = e.detail;
    modalTitleEle.innerHTML = modalTitle;
  }
  const modal = document.getElementById('create_or_edit_todo_modal');
  if (modal) {
    modal.showModal();
  }
});

document.body.addEventListener(
  'createOrUpdateTodoSuccessfullyEvent',
  function () {
    const modal = document.getElementById('create_or_edit_todo_modal');
    if (modal) {
      modal.close();
    }
  },
);
