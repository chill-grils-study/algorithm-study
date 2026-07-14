
function solution(p) {
    if(p==='') return '';

    const [u,v] = is균형(p);

    if(is올바른(u)){
        return u+solution(v);
    }else{
         //앞뒤 자르기고 중간 괄호들 뒤집기
        const word = u.slice(1,u.length-1);
        const newWord = word.length>0?[...word].map(i=>change(i)).join(''):'';
        return "("+solution(v)+")"+newWord
        
        // 여기서 u를 뒤집는 로직 + solution(v) 재귀호출 조립
        // "(" + solution(v) + ")" + (u 뒤집은 것)
        // 4. 문자열 u가 "올바른 괄호 문자열"이 아니라면 아래 과정을 수행합니다. 
        //   4-1. 빈 문자열에 첫 번째 문자로 '('를 붙입니다. 
        //   4-2. 문자열 v에 대해 1단계부터 재귀적으로 수행한 결과 문자열을 이어 붙입니다. 
        //   4-3. ')'를 다시 붙입니다. 
        //   4-4. u의 첫 번째와 마지막 문자를 제거하고, 나머지 문자열의 괄호 방향을 뒤집어서 뒤에 붙입니다. 
        //   4-5. 생성된 문자열을 반환합니다.
    }
}

function change(ch){
    return ch===")"?"(":")"
}
//"("와")"의 갯수가 같을때
function is균형(s){
    let cnt = 0;
    for(let i=0;i<s.length;i++){
        if(s[i]==='('){
            cnt++;
        }else{
            cnt--;
        }
        if(cnt===0) return [s.slice(0,i+1),s.slice(i+1,s.length)]
    }
}
//stack 사용
function is올바른(s){
    if(s==='') return true;
    const stack = [];
    stack.push(s[0]);
     for(let i=1;i<s.length;i++){
        const top = stack[stack.length-1];
        const next = s[i];
        if(top==='(' && next===')') stack.pop();
        else stack.push(next);
     }
     return Boolean(!stack.length)
}