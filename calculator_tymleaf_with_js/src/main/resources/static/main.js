//id="display"인 DOM 요소를 가져와 display 변수에 저장
//계산 결과나 입력 값이 여기에 표시됨
const display = document.getElementById('display');

//계산기 상태를 관리할 전역 변수들
let first = '';                 //첫 번째 숫자 입력 (문자열로 누적)
let second = '';                //두 번째 숫자 입력
let operator = null;            // +, -, *, / 등 연산자
let resultDisplayed = false;    //이전에 계산 결과가 표시되었는지 여부 → 새 입력 시 초기화를 위해 사용

//.forEach()를 통해 .digit 클래스를 가진 모든 버튼에 클릭 이벤트 등록
document.querySelectorAll('.digit').forEach(
    btn => {
        btn.addEventListener('click', () => {
            //이전결과가 표시된 상태에서 숫자를 누르면
            if(resultDisplayed) {
                //first 초기화
                first = '';
                //결과 표시 플래그 초기화
                resultDisplayed = false;
            }
            //버튼에 정의된 data-digit 값을 가져옴
            const digit = btn.dataset.digit;

            //아직 연산자가 입력되지 않았으면 → 첫 번째 숫자 입력 중
            if(!operator) {
                //소수점 .이 두 번 이상 입력되지 않도록 검사, first에 숫자 추가
                if (!(digit === '.' && first.includes('.'))) first += digit;
                display.textContent = first || '0';
            //연산자가 선택된 이후라면 → 두 번째 숫자 입력 중
            } else {
                //소수점 .이 두 번 이상 입력되지 않도록 검사, second에 숫자 추가
                if (!(digit === '.' && second.includes('.'))) second += digit;
                display.textContent = second || '0';
            }
        });
    }
);

//.forEach()로 .function 클래스를 가진 모든 버튼에 클릭 이벤트 등록
document.querySelectorAll('.function').forEach(
    btn => {
        btn.addEventListener('click', () => {
            //버튼의 data-action 속성 값 가져옴
            const action = btn.dataset.action;

            //초기화 버튼 (C)
            if (action === 'clear') {
                //모든 상태 초기화 → display는 0으로 리셋
                first = '';
                second = '';
                operator = null;
                display.textContent = '0';
                return;
            }
            //= 버튼일 경우 별도로 처리
            if (action === 'equals') return;

            //C나 =가 아닐 때 실행
            //즉, 연산자 버튼 (+, -, *, /)일 경우 연산자를 저장
            operator = action;
            //결과 표시 플래그 초기화
            resultDisplayed = false;
        })
    }
);

//data-action="equals"인 버튼에 이벤트 등록
//= 버튼이 눌렸을 때 실행
document.querySelector('[data-action="equals"]').addEventListener(
    'click',
    () => {
        //JavaScript 객체를 URL 인코딩된 문자열로 변환
        //num1=10&num2=20&operator=+ 형식
        const params = new URLSearchParams({
            num1: first,
            num2: second,
            operator
        });
        //calculate 경로로 POST 요청을
        fetch('/calculate', {
            method: 'POST',
            //헤더에서 Content-Type을 x-www-form-urlencoded로 지정하여 params 객체를 폼 데이터처럼 전송
            headers: { 'Content-Type': 'application/x-www-form-urlencoded'},
            body: params
        }).then(res => res.json())  //서버에서 응답이 오면 .json()으로 응답 본문을 JSON 객체로 파싱 {result:42} 형태
        .then(data => {
            display.textContent = data.result;  // 화면에 결과 표시
            first = data.result.toString();     // 결과값을 첫 번째 피연산자로 저장
            second = '';                        // 두 번째 피연산자 초기화
            operator = null;                    // 연산자 초기화
            resultDisplayed = true;             // 결과 표시 완료 상태로 설정
        })
        //네트워크 오류나 JSON 파싱 오류 발생 시 에러 처리.
        //에러 메시지를 콘솔에 출력하고, 사용자에게는 'Error'라는 메시지를 화면에 출력.
        .catch(error => {
            console.error(error);
            display.textContent = 'Error';
        })
    }
);

console.log(display.textContent);