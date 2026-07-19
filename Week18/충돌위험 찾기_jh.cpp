#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

// 첫번째 풀이, 20점..;
// routes에 각 로봇이 이동해야할 포인트가 여러개 주어진다는걸 몰랐음..
// 난독증 오졌고.. ! 그냥 시작점과 종료지점만 주어지는줄 ㅎ
int solution(vector<vector<int>> points, vector<vector<int>> routes) {
    const int routeLength = routes.size();
    unordered_map<string, int> bombCnt;
    vector<vector<int>> curPosition(routeLength, vector<int>(2, 0));
    int answer = 0;
    
    for(int i = 0; i < routeLength; i++) {
        curPosition[i][0] = points[routes[i][0] - 1][0];
        curPosition[i][1] = points[routes[i][0] - 1][1];
        bombCnt[to_string(curPosition[i][0]) + to_string(curPosition[i][1])]++;
    }
    
    for(auto bombItem : bombCnt) {
        if(bombItem.second >= 2) {
            answer++;   
        }
    }
    
    while(true) {
        unordered_map<string, int> bombCnt;
        int moveCnt = 0;
        
        for(int i = 0; i < routeLength; i++) {
            int endX = points[routes[i][1] - 1][0];
            int endY = points[routes[i][1] - 1][1];
            
            if(curPosition[i][0] == endX && curPosition[i][1] == endY) {
                continue;
            }
            
            if(curPosition[i][0] > endX) {
                curPosition[i][0]--;
            } else if(curPosition[i][0] < endX) {
                curPosition[i][0]++;
            } else if(curPosition[i][1] > endY) {
                curPosition[i][1]--;
            } else {
                curPosition[i][1]++;
            }
            
            bombCnt[to_string(curPosition[i][0]) + to_string(curPosition[i][1])]++;
            moveCnt++;
        }
        
        if(moveCnt == 0) {
            break;
        }
        
        for(auto bombItem : bombCnt) {
            if(bombItem.second >= 2) {
                answer++;   
            }
        }
    }
    
    return answer;
}

// 각 로봇이 이동해야할 지점 반영
#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

int solution(vector<vector<int>> points, vector<vector<int>> routes) {
    const int routeLength = routes.size();
    unordered_map<string, int> bombCnt;
    vector<vector<int>> curPosition(routeLength, vector<int>(2, 0));
    // 각 로봇이 이동해야 할 경로 포인트의 인덱스
    vector<int> routeIndex(routeLength, 1);
    int answer = 0;
    
    // 출발지점 반영
    for(int i = 0; i < routeLength; i++) {
        curPosition[i][0] = points[routes[i][0] - 1][0];
        curPosition[i][1] = points[routes[i][0] - 1][1];
        // 현재 좌표 개수 저장
        bombCnt[to_string(curPosition[i][0]) + "|" + to_string(curPosition[i][1])]++;
    }
    // 충돌 지점 있는지 확인
    for(auto bombItem : bombCnt) {
        if(bombItem.second >= 2) {
            answer++;   
        }
    }
    
    while(true) {
        // 충돌지점 확인용
        unordered_map<string, int> bombCnt;
        // 이동한 로봇의 개수
        int moveCnt = 0;
        
        for(int i = 0; i < routeLength; i++) {
            // routeIndex가 routes[i]의 크기보다 크다는건 현재 로봇의 이동이 종료됐다는 뜻               
            if(routeIndex[i] >= routes[i].size()) {
                continue;
            }
            
            int pointIndex = routes[i][routeIndex[i]] - 1;
            int endX = points[pointIndex][0];
            int endY = points[pointIndex][1];
            // 최단경로로 이동하되 x좌표를 먼저 움직임
            if(curPosition[i][0] > endX) {
                curPosition[i][0]--;
            } else if(curPosition[i][0] < endX) {
                curPosition[i][0]++;
            } else if(curPosition[i][1] > endY) {
                curPosition[i][1]--;
            } else {
                curPosition[i][1]++;
            }
            // 현재 목표 포인트에 도달했다면 다음 포인트 탐색하도록 수정                                       
            if(curPosition[i][0] == endX && curPosition[i][1] == endY) {
                routeIndex[i]++;
            }
            
            bombCnt[to_string(curPosition[i][0]) + "|" + to_string(curPosition[i][1])]++;
            moveCnt++;
        }
        
        if(moveCnt == 0) {
            break;
        }
        // 충돌지점 확인
        for(auto bombItem : bombCnt) {
            if(bombItem.second >= 2) {
                answer++;   
            }
        }
    }
    
    return answer;
}