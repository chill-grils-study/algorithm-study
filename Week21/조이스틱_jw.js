    //0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25
    //A B C D E F G H I J K  L. M. N.  O  P  Q  R  S  T  U  V. W  X. Y. Z

    //AAA-> JAZ로 반대로 생각
    //J-A = 10-1 = 9
    //왼->오가 더 가까운지 왼->거꾸로가 더 가까운지
    //Math.min(26-Z,Z-A)
    //알파뱃 변경: Math.min(index, 26 - index)
    //커서 변경:
    //012
    //JAZ
    //Math.min(length-zindex,zindex); ->아니고 현재 커서에서 거리 구해야함 index 0에서 거리말고
    //정확성 50%
    //A 연속 구간 체크
    //연속한 구간을 지나가느냐, 아니면 뒤돌아서 가느냐 비교하면되는거야?
function solution(name) {
    var answer = 0;

    const uppercase = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    const N = uppercase.length;
    const M = name.length;
    
    //JEROEN -> AAAA
    //const order = char.charCodeAt(0) - 65; 
    let cur = 0;
    for(let i=0;i<M;i++){
        if(name[i]==='A') continue;
        const index = name[i].charCodeAt(0)-65;
        console.log('index:'+index,'i:'+i)
        const alpaChange = Math.min(index,N-index); //알파뱃 변경
        const dist = Math.abs(i-cur);
        // const cursorChange = Math.min(i,M-i); //커서 변경
        const cursorChange = Math.min(dist,M-i); //커서 변경
        cur= i;
        // console.log('alpaChange:'+alpaChange,'cursorChange:'+cursorChange)
        answer+=alpaChange+cursorChange;
    }

    return answer;
}


console.log(solution("JEROEN")); //56
console.log(solution("JAN")); //23