/******************************* 글로벌 설정 ********************************/
var auth = firebase.auth();	//firebase의 auth(인증)모듈을 불러온다.
var googleAuth = new firebase.auth.GoogleAuthProvider(); //구글로그인 모듈을 불러온다.
var user = null;

/******************************* 사용자 함수 *******************************/

/******************************* 이벤트 등록 ******************************/
auth.onAuthStateChanged(onChangeAuth);
$('.bt-login').click(onLoginGoogle);
$('.bt-logout').click(onLogOut);

/******************************* 이벤트 콜백 *****************************/
function onChangeAuth(r){
   user = r;
   if(user){
    $('.bt-login').hide();
    $('.bt-logout').show();
   }
   else{
    $('.bt-login').show();
    $('.bt-logout').hide();
   }
}

function onLogOut(){
    console.log("hi");
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
      }).catch((error) => {
        // An error happened.
      });
      
}

function onLoginGoogle(){
    auth.signInWithPopup(googleAuth);
}