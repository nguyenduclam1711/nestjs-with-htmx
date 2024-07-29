document.body.addEventListener('htmx:afterRequest', function (evt) {
  const parameters = evt?.detail?.requestConfig?.parameters;
  if (parameters) {
    const requestType = parameters.get('requestType');
    if (requestType === 'DELETE_TODO') {
      const deleteId = parameters.get('deleteId');
      const ele = document.getElementById(deleteId);
      if (ele) {
        ele.remove();
      }
    }
  }
});
