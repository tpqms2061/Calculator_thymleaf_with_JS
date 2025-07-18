const display = document.getElementById('display'); //getElementById id 를 찾겠다

//'' "" 전부 String  / 동적언어라서 타입을 기록안함 그래서 그냥 let으로 변수선언 통일
let first = '';
let second = '';
let operator = null; //자바의 null과같음 빈값
let resultDisplayed = false; // 결과물을 보여주는 상태값
  //forEach :반복문
document.querySelectorAll('.digit').forEach(   //html 을 접근할수있는 문법이 많은데 querySelectAll 해당 문자열을 불러들어오겠디.

    btn => {
           btn.addEventListener('click', () => {
               if (resultDisplayed) {
                   first = '';
                   resultDisplayed = false;
               }

               const digit = btn.dataset.digit;

               if (!operator) {
                   if (!(digit === '.' && first.includes('.'))) first += digit;
                   display.textContent = first || '0';
               } else {
                   if (!(digit === '.' && second.includes('.'))) second += digit;
                   display.textContent = second || '0';
               }
           });                     //버튼을 클릭했을떄의 행위를 정의
    }
)
//html 을 접근할수있는 문법이 많은데 querySelectAll 해당 문자열을 불러들어오겠디.
//forEach :반복문



document.querySelectorAll('.function').forEach(
    btn => {
        btn.addEventListener('click' , () => {
            const action = btn.dataset.action;

            if(action === 'clear') {
                first ='';
                second= '';
                operator = null;
                display.textContent = '0';
                return;
            }

            if(action === 'equals') return;

            operator= action;
            resultDisplayed = false;
        })
    }
)
//[] 는 ""를 사용하기때문에 구별하기위한 []
document.querySelector('[data-action="equals"]').addEventListener(
    'click',
    () => {
        const params = new URLSearchParams({
            num1:first,                         //num1, num2 는 자바의 매개변수로 js 의 변수와 연결
            num2:second,
            operator                            //자바의 변수와 js 의 변수가 같을떈 : operaotr 생략
        });

// 1. callback
// 2. promise then
// 3. async/await
 //서버에서 데이터가 가져오는 로직
       fetch('/calculate', {                     //postmapping 의 calculate
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: params
       }).then(res => res.json())                //동기적으로 처리시에는 웨이팅이 많을수도 있으니까 json 형태로 받는것

                 .then(data => {
                    display.textContent =data.result;
                    first =data.result.toString();
                    second = '';
                    operator = null;
                    resultDisplayed =true;
       })
       .catch(error => {
            console.error(error);
            display.textContent = 'Error';
       })
    }
)

