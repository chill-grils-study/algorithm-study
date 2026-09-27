def solution(plans):
    plans.sort(key=lambda x: x[1])
    stack = []
    answer = []

    for i in range(len(plans)):
        # 현재 과제 시작 시간 / 소요 시간
        homework, time, taken = plans[i]

        # 시간 -> 분
        hour, minute = map(int, time.split(':'))
        start = hour * 60 + minute
        taken = int(taken)

        # 다음 과제가 있는 경우 
        if i < len(plans) - 1:
            # 다음 과제 시작 시간
            next_hour, next_minute = map(int, plans[i+1][1].split(':'))
            next_start = next_hour * 60 + next_minute

            remain = next_start - start
            
            # 현재 과제를 끝낼 수 있음
            if taken <= remain:
                answer.append(homework)
                remain -= taken
                
                while stack and remain > 0:
                    # 여기서 stack의 가장 최근 과제를 꺼냄
                    latest_homework, latest_remain = stack.pop()
                    if (latest_remain <= remain):
                        answer.append(latest_homework)
                        remain -= latest_remain
                    else:
                        stack.append([latest_homework, latest_remain - remain])
                        remain = 0

                    
            else:
                # 현재 과제를 못 끝냄
                # 남은 시간을 stack에 저장
                stack.append([homework, taken - remain])

        else:
            # 마지막 과제는 무조건 실행
            answer.append(homework)
            
            # 남은 과제들 수행 
            while stack:
                latest_homework, latest_remain = stack.pop()
                answer.append(latest_homework)
    return answer
