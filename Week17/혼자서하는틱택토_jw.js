
function solution(board) {
    var answer = -1;

    const len = 3;
    const arr = []
    for(let i=0;i<len;i++){
        arr.push(board[i].split(""));
    }

    let cntO = 0;
    let cntX = 0;

    for(let i=0;i<len;i++){
        for(let j=0;j<len;j++){
            if(arr[i][j]==='O') cntO++;
            if(arr[i][j]==='X') cntX++;
        }
    }

    //가능한 경우만 case 판단
    //승리했음에도 진행되는지 확인 (가로/세로/대각선 3개 일치하는지 판단 필요)

//숫자가 같을때는 O가 승리하상태면 안됨
//숫자가 다를때는 O가 한개 더 많아야함
    if(cntO===cntX&&!checkbingo(arr,'O')){
        answer = 1;
    }else if(cntX<cntO && cntO === cntX+1&&!checkbingo(arr,'X')){
        answer = 1;
    }else{
        answer = 0;
    }

    return answer;
}

function checkbingo(arr,target){
    if(arr[0][0]===arr[1][1]&&arr[1][1]===arr[2][2]&&arr[2][2]===target) return true;
    if(arr[2][0]===arr[1][1]&&arr[1][1]===arr[0][2]&&arr[0][2]===target) return true;

    for(let i=0;i<arr.length;i++){
        if(arr[i][0]===arr[i][1]&& arr[i][1]===arr[i][2]&&arr[i][2]===target){
            return true;
        }
        if(arr[0][i]===arr[1][i]&& arr[1][i]===arr[2][i]&&arr[2][i]===target){
            return true;
        }
    }
    return false;
}
