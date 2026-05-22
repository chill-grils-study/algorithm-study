#include <string>
#include <vector>
#include <queue>
#include <algorithm>
#include <math.h>

using namespace std;

// 지피티 도움을 꽤 받아버려서 자존심 상하네요..

// 시간 문자열을 숫자로 변환해주는 함수
int convertTimeToNum(string time) {
    int hour = stoi(time.substr(0, 2));
    int minute = stoi(time.substr(3, 2));
    
    return hour * 60 + minute;
}

int solution(vector<vector<string>> book_time) {
    // 예약 종료 시간을 오름차순으로 저장할 우선순위큐
    priority_queue<int, vector<int>, greater<int>> endTimeList;
    int answer = 0;
    // 입실 시간 기준 정렬
    sort(book_time.begin(), book_time.end());
    
    for(const auto& pairOfTime : book_time) {
        int startTimeNum = convertTimeToNum(pairOfTime[0]);
        int endTimeNum = convertTimeToNum(pairOfTime[1]) + 10;
        // 현재 입실 시간보다 작은 값들은 모두 제거
        // *처음에는 큐 원소를 제거한 적이 없을 때만 객실 수를 증가시켰는데 그러면 틀리더라구용. 근데 왜 틀리는지 아직도 이해 못하겠음 .. 객실 부족할 때마다 객실 추가하면 그게 결국 최소 객실 수가 되는 것 아닌가?
        while(!endTimeList.empty() && endTimeList.top() <= startTimeNum) {
            endTimeList.pop();
        }
        // 현재 퇴실 시간을 큐에 추가
        endTimeList.push(endTimeNum);
        // 모든 손님을 수용할 수 있는 최소 객실 수 갱신
        // 큐의 크기가 현재 운영중인 객실 수
        answer = max(answer, (int)endTimeList.size());
    }
    
    return answer;
}