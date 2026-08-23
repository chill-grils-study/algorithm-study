//정확성은 통과... 효율성은 --
//map으로 만들어서 key를 미리 만들어두기!
//- 들어갈수있는 조합 key로 만들고, 점수는 배열로
//map+이분탐색
//("- - - -", [100,120,130])
function solution(info, query) {
    var answer = [];
    const arr = [];
    
    const map = new Map();

    for(let i=0;i<info.length;i++){
        const infoArr = info[i].split(" ");
        const value = infoArr[4];
        const keys = [
        `${infoArr[0]} ${infoArr[1]} ${infoArr[2]} ${infoArr[3]}`,
        `- ${infoArr[1]} ${infoArr[2]} ${infoArr[3]}`,
        `${infoArr[0]} - ${infoArr[2]} ${infoArr[3]}`,
        `${infoArr[0]} ${infoArr[1]} - ${infoArr[3]}`,
        `${infoArr[0]} ${infoArr[1]} ${infoArr[2]} -`,
        `- - ${infoArr[2]} ${infoArr[3]}`,
        `- ${infoArr[1]} - ${infoArr[3]}`,
        `- ${infoArr[1]} ${infoArr[2]} -`,
        `${infoArr[0]} - - ${infoArr[3]}`,
        `${infoArr[0]} - ${infoArr[2]} -`,
        `${infoArr[0]} ${infoArr[1]} - -`,
        `- - - ${infoArr[3]}`,
        `- - ${infoArr[2]} -`,
        `- ${infoArr[1]} - -`,
        `${infoArr[0]} - - -`,
        `- - - -`,
        ];
        for(let i=0;i<keys.length;i++){
            if(map.has(keys[i])){
                const vArr = map.get(keys[i]);
                vArr.push(Number(value));
                // map.set(keys[i],vArr); 이미 배열 참조하고있어서 안넣어도됨
            }else{
                map.set(keys[i],[Number(value)])
            }
        }
    };
    for (const value of map.values()) {
        value.sort((a,b)=>a-b);
    }
    for(let q=0;q<query.length;q++){
        const queryArr = query[q].replaceAll("and ","").split(" ");
        const key =  `${queryArr[0]} ${queryArr[1]} ${queryArr[2]} ${queryArr[3]}`;
        const numValue = queryArr[4];
        if(map.has(key)){
            const arr = map.get(key);
            answer.push(check(arr,numValue))
        }else answer.push(0)

    }

    return answer;
}

function check(arr,num){
    let left = 0;
    let right = arr.length;
    //arr보다 큰 지점 찾기.
    while(left<right){
        const mid = Math.floor((left+right)/2);
        //[10, 20, 30, 40] 35 -> 3
        if(arr[mid]<num){
            left = mid+1;
        }else{
            right = mid;
        }
    }
    return arr.length-left;
}

// function check(arr, infoArr) {
//     let cnt = 0;
//     for (let i = 0; i < arr.length; i++) {
//         let flag = true;
//         for (let j = 0; j < arr[i].length; j++) {
//             if (j === 4) { // 점수는 마지막(인덱스 4) 원소
//                 if (Number(arr[i][j]) < Number(infoArr[infoArr.length - 1])) {
//                     flag = false;
//                 }
//                 continue; // 점수는 완전일치 검사로 안 넘어가도록
//             }
//             if (infoArr[j] === '-') continue;
//             if (arr[i][j] !== infoArr[j]) {
//                 flag = false;
//                 break;
//             }
//         }
//         if (flag) cnt++;
//     }
//     return cnt;
// }


// 지원자가 지원서에 입력한 4가지의 정보와 획득한 코딩테스트 점수를 하나의 문자열로 구성한 값의 배열 info, 개발팀이 궁금해하는 문의조건이 문자열 형태로 담긴 배열 query가 매개변수로 주어질 때,
// 각 문의조건에 해당하는 사람들의 숫자를 순서대로 배열에 담아 return 하도록 solution 함수를 완성해 주세요.
// 배열 크기: 50000 이하
// 개발언어는 cpp, java, python 중 하나입니다.
// 직군은 backend, frontend 중 하나입니다.
// 경력은 junior, senior 중 하나입니다.
// 소울푸드는 chicken, pizza 중 하나입니다.
// 점수는 100000이하
// "cpp and - and senior and pizza 500"은 "cpp로 코딩테스트를 봤으며, 경력은 senior 이면서 소울푸드로 pizza를 선택한 지원자 중 코딩테스트 점수를 500점 이상 받은 사람은 모두 몇 명인가?"
// console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200"]))
console.log(solution(["java backend junior pizza 150","python frontend senior chicken 210","python frontend senior chicken 150","cpp backend senior pizza 260","java backend junior chicken 80","python backend senior chicken 50"],["java and backend and junior and pizza 100","python and frontend and senior and chicken 200","cpp and - and senior and pizza 250","- and backend and senior and - 150","- and - and - and chicken 100","- and - and - and - 150"]))
//[1,1,1,1,2,4]


//info: [
// "java backend junior pizza 150","python frontend senior chicken 210",
// "python frontend senior chicken 150","cpp backend senior pizza 260",
// "java backend junior chicken 80","python backend senior chicken 50"
//]
//query:[
// "java and backend and junior and pizza 100",
// "python and frontend and senior and chicken 200",
// "cpp and - and senior and pizza 250",
// "- and backend and senior and - 150",
// "- and - and - and chicken 100",
// "- and - and - and - 150"
//]