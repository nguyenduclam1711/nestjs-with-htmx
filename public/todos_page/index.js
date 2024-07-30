document.body.addEventListener('htmx:afterRequest', function (evt) {
  const parameters = evt?.detail?.requestConfig?.parameters;
  if (parameters) {
    const requestType = parameters.get('requestType');
    switch (requestType) {
      case 'DELETE_TODO': {
        const deleteId = parameters.get('deleteId');
        const ele = document.getElementById(deleteId);
        if (ele) {
          ele.remove();
        }
        break;
      }
      case 'EDIT_TODO':
      case 'CREATE_TODO': {
        const formId = parameters.get('formId');
        const form = document.getElementById(formId);
        if (form) {
          form.reset();
        }
        break;
      }
    }
  }
});
