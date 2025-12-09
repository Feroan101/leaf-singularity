// assets/js/auth.js - Universal Firebase Auth
const auth = firebase.auth();

// Sign In Functions
function signInGoogle() {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => window.location.href = '/html/dashboard.html')
    .catch(err => alert('Google login failed: ' + err.message));
}

function signInGithub() {
  auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(() => window.location.href = '/html/dashboard.html')
    .catch(err => alert('GitHub login failed: ' + err.message));
}

function signInEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .then(() => window.location.href = '/html/dashboard.html')
    .catch(err => alert('Email login failed: ' + err.message));
}

// Sign Out
function signOut() {
  auth.signOut().then(() => window.location.href = '/');
}

// Universal Auth State Listener
auth.onAuthStateChanged((user) => {
  // Update UI for ALL pages
  const userWelcome = document.getElementById('user-welcome');
  const publicContent = document.getElementById('public-content');
  const dashboardContent = document.getElementById('dashboard-content');
  const loginPrompt = document.getElementById('login-prompt');
  
  if (user) {
    // User is signed in
    if (userWelcome) userWelcome.style.display = 'block';
    if (publicContent) publicContent.style.display = 'none';
    if (loginPrompt) loginPrompt.style.display = 'none';
  } else {
    // User is signed out  
    if (userWelcome) userWelcome.style.display = 'none';
    if (publicContent) publicContent.style.display = 'block';
    if (dashboardContent) dashboardContent.style.display = 'none';
    if (loginPrompt) loginPrompt.style.display = 'block';
  }
});

// Sign-Up Functions (add these)
function signUpGoogle() {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(() => window.location.href = '/html/index.html')
    .catch(err => alert('Google sign-up failed: ' + err.message));
}

function signUpGithub() {
  auth.signInWithPopup(new firebase.auth.GithubAuthProvider())
    .then(() => window.location.href = '/html/index.html')
    .catch(err => alert('GitHub sign-up failed: ' + err.message));
}

function signUpEmail(name, email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Update display name
      return userCredential.user.updateProfile({ displayName: name });
    })
    .then(() => window.location.href = '/html/index.html')
    .catch(err => alert('Sign up failed: ' + err.message));
}

