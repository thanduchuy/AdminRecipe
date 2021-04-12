function loginUser() {
  let email = form.email.value;
  let pass = form.pass.value;
  console.log(email, pass);
  if (email == '' || pass == '') {
    document.getElementById('error').innerHTML = 'Field is empty';
  } else {
    loginUserFireBase(email, pass);
  }
}

function loginUserFireBase(email, pass) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pass)
    .then((user) => {
      let session = sessionStorage.getItem('user');
      let url = window.location.href;
      let indexSplash = url.lastIndexOf('/');
      let newUrl = '';
      newUrl = url.slice(0, indexSplash) + '/index.html';
      sessionStorage.setItem('user', user.user.uid);
      window.location.href = newUrl;
    })
    .catch((error) => {
      document.getElementById('error').innerHTML = error;
    });
}
