// Applying to DOM
const showData = (res) => {
  const newsBlock = document.querySelector(`body`);
  newsBlock.insertAdjacentHTML(`afterBegin`, res);
}

// Showing error
const showError = (error) => {
  return showData(`<div class="error">
        <p class="error">Произошла ошибка ${error} =(</p>
        <p class="error">Пожалуйста, попробуйте перезагрузить страницу.</p>
      </div>`);
}

const checkStatus = (response) => {
  return new Promise((onSuccess) => {
    if (response.ok) {
      onSuccess(response);
    }
  });
};

// Result POST
const uploadData = (data) => {
  const requestSettings = {
    body: data,
    headers: {
      'Content-Type': `multipart/form-data`
    },
    method: `POST`
  };

  fetch(`http://date.jsontest.com/`, requestSettings)
    .then(checkStatus)
    .catch(showError);
 }

export default uploadData;
