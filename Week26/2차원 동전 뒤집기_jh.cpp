#include <string>
#include <vector>
#include <math.h>

using namespace std;

const int MAX = 101;
int N, M, columns;
int answer = MAX;

// 행, 열 둘 다 완탐해야 된다고 생각했는데 행만 하면 됨
// 행을 뒤집을 수 있는 모든 경우를 완탐 → 그 상태에서 필요한 열 뒤집기를 계산 → 가능한지 확인
void dfs(int startNum, vector<int> rows, vector<vector<int>> beginning, vector<vector<int>> &target) {
    vector<vector<int>> current = beginning;
    bool canChange = true;
    // 뒤집어야 할 열/행 개수
    int cnt = 0;

    // 현재 조합의 행에 있는 동전들을 다 뒤집음
    for(int row : rows) {
        cnt++;
        for(int j = 0; j < M; j++) {
            current[row][j] = !current[row][j];
        }
    }
    // 뒤집어야 하는 열을 확인
    for(int j = 0; j < M; j++) {
        // 현재 열의 동전이 목표 상태와 불일치하는 개수를 셈
        int differentCnt = 0;
        for(int i = 0; i < N; i++) {
            if(current[i][j] != target[i][j]) {
                differentCnt++;
            }
        }
        // 현재 열의 모든 동전이 불일치하면 현재 열은 뒤집어야 됨
        if(differentCnt == N) {
            cnt++;
          // 일부만 불일치하다면 현 상태에서 target을 만들 수 없음.
        } else if(differentCnt > 0) {
            canChange = false;
            break;
        }
    }
    // 타겟을 만들 수 있는 경우에만 answer 최댓값으로 갱신
    if(canChange) {
        answer = min(answer, cnt);        
    }
    // 모든 경우의 수를 조합
    for(int i = startNum; i < N; i++) {
        rows.push_back(i);
        dfs(i + 1, rows, beginning, target);
        rows.pop_back();
    }
}

int solution(vector<vector<int>> beginning, vector<vector<int>> target) {
    N = beginning.size();
    M = beginning[0].size();
    
    dfs(0, vector<int>{}, beginning, target);
    
    return answer == MAX ? -1 : answer;
}
