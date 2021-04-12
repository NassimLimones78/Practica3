//SignUp
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit' , (e) => {
  e.preventDefault();

  const email = document.querySelector('#signup-email').value;
  const password = document.querySelector('#signup-password').value;


  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {

      //clear the form
      signupForm.reset();

      //close the modal
      $('#signupModal').modal('hide')

      console.log('sign up')
    })
});

//Signin
const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit' , (e) => {
  e.preventDefault();
  const email = document.querySelector('#login-email').value;
  const password = document.querySelector('#login-password').value;

  console.log('email, password')

  auth
  .signInWithEmailAndPassword(email, password)
  .then(userCredential => {

    //clear the form
    signupForm.reset();

    //close the modal
    $('#signupModal').modal('hide')

    console.log('sign in')
  })
});

//Logout
const logout = document.querySelector('#logout');

logout.addEventListener('click' , (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
  console.log('sign out')  
  })
})  

//Google Login
const googleButton = document.querySelector('#googleLogin');
googleButton.addEventListener('click' , (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    console.log('google sign in')
  })

  });

//Facebook Login
const facebookButton = document.querySelector('#facebookLogin');
facebookButton.addEventListener('click' , (e) => {
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();
  auth.signInWithPopup(provider)
  .then(result => {
    console.log('Facebook sign in')
  })
});

//Twitter Login
let twitlog = document.querySelector('#twitterLogin');
twitlog.addEventListener('click' , (e) => {
var provider = new firebase.auth.TwitterAuthProvider();
  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    /** @type {firebase.auth.OAuthCredential} */
    var credential = result.credential;

    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    var token = credential.accessToken;
    var secret = credential.secret;

    // The signed-in user info.
    var user = result.user;
  }).catch((error) => {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
  });
});
//Yahoo Login
let yahoolog = document.querySelector('#yahooLogin');
yahoolog.addEventListener('click' , (e) => {
var provider = new firebase.auth.OAuthProvider('yahoo.com');

  firebase.auth().signInWithPopup(provider)
  .then((result) => {
    // IdP data available in result.additionalUserInfo.profile
    // ...

    /** @type {firebase.auth.OAuthCredential} */
    const credential = result.credential;

    // Yahoo OAuth access token and ID token can be retrieved by calling:
    var accessToken = credential.accessToken;
    var idToken = credential.idToken;
  })
  .catch((error) => {
  })
});

const db = firebase.firestore();

const taskForm = document.getElementById('task-form');
const taskContainer = document.getElementById('tasks-container');

const saveTask = (title, description) =>
  db.collection('tasks').doc().set({
  title,
  description,
});

const getTasks = () => db.collection('tasks').get();
const onGetTasks = (callback) => db.collection('tasks').onSnapshot(callback);

window.addEventListener('DOMContentLoaded', async (e) => {
 onGetTasks((querySnapshot) => {
   taskContainer.innerHTML = '';
  querySnapshot.forEach(doc => {
    console.log(doc.data())
 
    const task = doc.data();
 
    taskContainer.innerHTML += `<div class="card card-body mt-2 border-primary">
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <div>
    <button class="btn btn-primary" btn-delete data-id="myId">Delete</button>
    <button class="btn btn-success">Edit</button>
    </div>
    </div>`;

    const btnsDelete = document.querySelectorAll('.btn-delete');
    btnsDelete.forEach(btn => {
      btn.addEventListener('click', (e) => {
        console.log(e.target)
      })
    })
  });

 });
 });


taskForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = taskForm['task-title'];
  const description = taskForm["task-description"];

  await saveTask(title.value, description.value);

  await getTasks();

  taskForm.reset();
  title.focus();
})


