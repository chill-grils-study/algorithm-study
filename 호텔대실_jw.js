function solution(book_time) {
    //종료시간 기준으로 오름차순 -> 시작시간 기준으로 오름차순
    //roomTime 배열에 넣고 배정 가능하면 빼고, 가장 숫자가 작은게 앞으로
    const roomTime = [];
    book_time.sort((a, b) => {
        const [aHour,aMin]=a[0].split(":");
        const [bHour,bMin]=b[0].split(":");

        const aStart = Number(aHour)*60+Number(aMin);
        const bStart = Number(bHour)*60+Number(bMin);

        return aStart - bStart;
    });
    // console.log(book_time);

    for(let i=0;i<book_time.length;i++){
        const [sH, sM] = book_time[i][0].split(":");
        const [eH, eM] = book_time[i][1].split(":");

        const start = Number(sH)*60 + Number(sM);
        const end = Number(eH)*60 + Number(eM);
        
        //배정 가능하면
        if(roomTime[0]+10<=start){
            roomTime.shift(); //맨앞에 있는 시간 빼기
            roomTime.push(end);
        }else{
            //배정불가
            roomTime.push(end);
        }
        roomTime.sort((a,b)=>a-b) //가장 시간이 짧은걸 맨앞으로

    }

    return roomTime.length;
}