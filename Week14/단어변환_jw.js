

let answer = Infinity;
//소문자 a~z(97~122)
function solution(begin, target, words) {

    //백트래킹
    //한글자만 뽑아서 바꾸고 check 배열에 있는지 확인 그러고 깊이 탐색

    const visited = Array(words.length).fill(false);
    dfs(visited,target,words,begin,0)
    return answer===Infinity?0:answer;
}

function dfs(visited,target,words,word,depth){

    if(word===target){
        answer = Math.min(depth,answer);
        return;
    }

    for(let i=0;i<words.length;i++){
        if(!visited[i]&&check(word,words[i])){
            visited[i] = true;
            dfs(visited,target,words,words[i],depth+1);
            visited[i] = false;
        }
    }
}

function check(word,targetWord){
    let worngCnt = 0;

    for(let i=0;i<word.length;i++){
        if(word[i]!==targetWord[i]) worngCnt++;
    }

    return worngCnt===1;
}

console.log(solution("hit"	,"cog",	["hot", "dot", "dog", "lot", "log", "cog"]));