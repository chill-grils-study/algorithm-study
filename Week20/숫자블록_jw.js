// 알고리즘은 그리디 혹은 dp? 약수 관련해서 풀면 될듯?
// 그리디 vs dp -> 이전값이 필요한가? 독립적으로 계산 가능한가? -> o
// 값은 begin과 전혀 관계없이 x와 end만으로 결정
//x의 약수 중에서 자기 자신(x)을 제외한 가장 큰 약수
const N = 10000000; //블록 최대값
function solution(begin, end) {
    var answer = [];

    for(let i=begin;i<=end;i++){
        answer.push(factor(i));
    }

    return answer;
}

function factor(x){
    if(x===1) return 0;

    const sqrt = Math.sqrt(x); //효율성 0점 주범

    let result = 1; //초기값은 1 (약수)
    for (let i = 2; i <= sqrt; i++) {
       if(x%i===0){
            if(x/i<=N) return x/i;
            else result = i; //x/i가 N보다 크면 i값만 저장해놓고 i루프 돌기
       }
    }
    
    return result;
}


