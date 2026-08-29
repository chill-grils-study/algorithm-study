function solution(data, col, row_begin, row_end) {
    var answer = 0;

    //col: 정렬 기준 index
    data.sort((a,b)=>{
        if(a[col-1]===b[col-1]) return b[0]-a[0];
        return a[col-1]-b[col-1];
    });

    //row_begin, row_end로 계산

    for(let i=row_begin-1;i<=row_end-1;i++){
        let result = 0;
        for(let j=0;j<data[i].length;j++){
            result+=data[i][j]%(i+1);
        }
        answer ^=result;
    }

    return answer;
}
