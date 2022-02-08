/******************************* 글로벌 설정 ********************************/
var auth = firebase.auth();	//firebase의 auth(인증)모듈을 불러온다.
var googleAuth = new firebase.auth.GoogleAuthProvider(); //구글로그인 모듈을 불러온다.
var db= firebase.database();//firebase data 모듈
var user = null;

var $tbody = $('.list-wrapper tbody');


/******************************* 사용자 함수 *******************************/
$tbody.empty();
$('.create-wrapper input[name="content"]').val('');


/******************************* 이벤트 등록 ******************************/
auth.onAuthStateChanged(onChangeAuth);
db.ref('root/board').on('child_added',onAdded);//데이터베이스의 루트-보드에 자식요소가 추가되면 
// ref.on('child_removed', onRemoved);
$('.bt-login').click(onLoginGoogle);
$('.bt-logout').click(onLogOut);

/******************************* 이벤트 콜백 *****************************/
function onAdded(r){//이벤트 실행!
    var k =r.key;
    var v =r.val();
    var i = $tbody.find('tr').length+1;
    var html = '';
    html += '<tr id ="'+k+'">';
    html += '<td>'+i+'</td>';
    html += '<td class="text-left">'+v.content+'</td>';
    html += '<td>'+v.writer+'</td>';
    html += '<td>'+moment(v.createAt).format('MM-DD HH:mm:ss')+'</td>';
    html += '<td>'+v.readnum+'</td>';
    html += '</tr>';
    $tbody.prepend(html);
}

function onRemoved(r){

}

function onSubmit(f){
    if(f.writer.value.trim()===''){
        alert('작성자를 입력해주세요.');
        f.writer.focus();
        return false;
    }
    if(f.content.value.trim()===''){
        alert('내용을 입력해주세요.');
        f.content.focus();
        return false;
       
    }  

    var data = {
        writer: f.writer.value,
        content: f.content.value,
        createAt: new Date().getTime(),
        uid:user.uid,
        readnum: 0//조회수
    
    }
    if(user && user.uid){
        db.ref('root/board/').push(data);
        $('.create-wrapper input[name="content"]').val('');
       
    }
    else alert('비정상적인 접근입니다.')

    return false;
   
	
	

}
function onChangeAuth(r){
   user = r;
   console.log(user);
   if(user){
    $('.header-wrapper .email').text(user.email);
    $('.header-wrapper .photo img').attr('src', user.photoURL);
    $('.header-wrapper .info-wrap').css('display','flex');
    $('.create-wrapper').show();
    $('.create-wrapper input[name="writer"]').val(user.displayName);
    $('.bt-login').hide();
    $('.bt-logout').show();
   }
   else{
    $('.header-wrapper .email').text('');
    $('.header-wrapper .photo').attr('src', '//via.placeholder.com/1x1/333/');
    $('.create-wrapper').hide();
    $('.header-wrapper .info-wrap').css('display','none');
    $('.create-wrapper input[name="writer"]').val('');
    $('.create-wrapper input[name="content"]').val('');
    $('.bt-login').show();
    $('.bt-logout').hide();
    console.log('welcome');
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