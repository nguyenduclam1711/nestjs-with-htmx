document.body.addEventListener('htmx:afterRequest', function (evt) {
  const parameters = evt?.detail?.requestConfig?.parameters;
  const failed = evt?.detail?.failed;
  if (parameters && !failed) {
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
        const dialogId = parameters.get('dialogId');
        const dialog = document.getElementById(dialogId);
        if (dialog) {
          dialog.close();
        }
        break;
      }
    }
  }
});

document.body.addEventListener('htmx:responseError', function (evt) {
  const parameters = evt?.detail?.requestConfig?.parameters;
  if (parameters) {
    const requestType = parameters.get('requestType');
    switch (requestType) {
      case 'CREATE_TODO': {
        try {
          const targetErrorNode = parameters.get('targetErrorNode');
          const existNode = document.getElementById(targetErrorNode);
          if (existNode) {
            existNode.innerHTML = JSON.parse(
              evt?.detail?.xhr?.response ?? '{}',
            ).content;
          }
        } catch (error) {}
        break;
      }
    }
  }
});
