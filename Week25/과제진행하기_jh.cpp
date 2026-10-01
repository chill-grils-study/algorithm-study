#include <string>
#include <stack>
#include <vector>
#include <tuple>
#include <algorithm>
using namespace std;

// 시간을 분 단위로 바꾸는 함수
int convertTimeToMinute(string time) {
    int hour = stoi(time.substr(0, 2));
    int minute = stoi(time.substr(3, 2));
    
    return hour * 60 + minute;
}

vector<string> solution(vector<vector<string>> plans) {
    const int n = plans.size();
    vector<tuple<string, int, int>> copiedPlans;
    stack<tuple<string, int, int>> 남은작업;
    vector<string> answer;
    // 복사 배열 만들어서 (작업 이름, 분 단위로 바꾼 작업 시작시간, 정수로 바꾼 작업 시간) 저장
    for(vector<string> plan : plans) {
        copiedPlans.push_back({plan[0], convertTimeToMinute(plan[1]), stoi(plan[2])});
    }
    // 작업 시작시간 순으로 오름차순
    sort(copiedPlans.begin(), copiedPlans.end(), [](tuple<string, int, int> a, tuple<string, int, int> b) {
        return get<1>(a) <= get<1>(b);
    });
    // 첫 작업을 현재작업에 저장
    tuple<string, int, int> 현재작업 = copiedPlans[0];
    // 현재 시간
    int curTime = get<1>(현재작업), curPlanIndex = 0;
    
    while(true) {
        auto [curPlanName, curPlanStartTime, curPlanRemainTime] = 현재작업;
        int curEndTime = curTime + curPlanRemainTime;
        int nextPlanIndex = curPlanIndex + 1;
        // 현재 작업이 끝나기 전에 시작하는 다음 작업이 있다면
        if(nextPlanIndex < n && curEndTime > get<1>(copiedPlans[nextPlanIndex])) {
            // 현재 작업을 남은 작업 스택에 추가
            남은작업.push({curPlanName, curPlanStartTime, curEndTime - get<1>(copiedPlans[nextPlanIndex])});
            // 현재 작업 인덱스 1 증가
            curPlanIndex++;
            // 현재 작업 갈아끼움
            현재작업 = copiedPlans[curPlanIndex];
            // 현재 시간도 현재 작업 시작 시간으로 변경
            curTime = get<1>(현재작업);
            // 현재 작업이 끝남과 동시에 다음 작업이 시작한다면
        } else if(nextPlanIndex < n && curEndTime == get<1>(copiedPlans[nextPlanIndex])) {
            curTime = curEndTime;
            // 끝난 작업 정답 배열에 넣고 이어서 진행
            answer.push_back(curPlanName);
            curPlanIndex++;
            현재작업 = copiedPlans[curPlanIndex];
            // 현재 작업이 끝났는데 이전에 진행하던 남은 작업이 있다면
        } else if(!남은작업.empty()) {  
            curTime = curEndTime;
            answer.push_back(curPlanName);
            현재작업 = 남은작업.top();
            남은작업.pop();
        } else { // 현재 작업도 끝났고 남은 작업도 없다면 다음 작업을 가져와서 시작
            if(curPlanIndex == n - 1) {
                answer.push_back(curPlanName);
                break;
            } else {
                answer.push_back(curPlanName);  
                curPlanIndex++;
                현재작업 = copiedPlans[curPlanIndex];
                curTime = get<1>(copiedPlans[curPlanIndex]);
            }
        }
    }
    
    return answer;
}