const firebaseConfig = {

};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const loginButton = document.getElementById("login-btn");
const signUpButton = document.getElementById("sign-up-btn");


// Initialize the FirebaseUI Widget using Firebase.
const ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            chrome.runtime.sendMessage({ message: 'sign-in' }, function (response) {
                window.user = authResult.user;
                if (response.message === 'success') {
                    window.location.replace('./main.html');
                }
            });
            return false;
        },
    },
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        },
    ],
    tosUrl: "",
    privacyPolicyUrl: ""
};

// If user, show main content
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        window.user = user;
        window.location.replace('./main.html');
    } else {
        // Show login
        ui.start('#sign-in-options', uiConfig);
    }
});


document.addEventListener('DOMContentLoaded', (event) => {
    
});