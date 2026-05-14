#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 첫번째 풀이
// DP[i][0][0]: i 물건을 A가 훔쳤을 때 A 누적 흔적
// DP[i][0][1]: i 물건을 A가 훔쳤을 때 B 누적 흔적
// DP[i][1][0]: i 물건을 B가 훔쳤을 때 A 누적 흔적
// DP[i][1][1]: i 물건을 B가 훔쳤을 때 B 누적 흔적
// 접근 자체가 틀렸답니다.. 뭔 한번에 푸는 문제가 없네.. ^^
int solution(vector<vector<int>> info, int n, int m) {
    const int MAX = 5000;
    const int SIZE = info.size();
    vector<vector<vector<int>>> dp(SIZE, vector<vector<int>>(2, vector<int>(2, 0)));
    int answer = 0;
    
    if(info[0][0] < n) {
        dp[0][0][0] = info[0][0];   
        dp[0][0][1] = 0;   
    } else {
        dp[0][0][0] = MAX;
        dp[0][0][1] = MAX;  
    }
    
    if(info[0][1] < m) {
        dp[0][1][0] = 0;   
        dp[0][1][1] = info[0][1];   
    } else {
        dp[0][1][0] = MAX;
        dp[0][1][1] = MAX; 
    }
    
    for(int i = 1; i < SIZE; i++) {
        // 이전 dp에서 A가 제일 적은 상태를 골라서 풀려고 했는데 이러면 틀리는 케이스와 왕왕 있음..
        int targetIndex = dp[i - 1][0][0] < dp[i - 1][1][0] ? 0 : 1;
        
        if(dp[i - 1][targetIndex][0] + info[i][0] < n) {
            dp[i][0][0] = dp[i - 1][targetIndex][0] + info[i][0];
            dp[i][0][1] = dp[i - 1][targetIndex][1];
        } else {
            dp[i][0][0] = MAX;
            dp[i][0][1] = MAX;
        }
        
        if(dp[i - 1][targetIndex][1] + info[i][1] < m) {
            dp[i][1][0] = dp[i - 1][targetIndex][0];
            dp[i][1][1] = dp[i - 1][targetIndex][1] + info[i][1];
        } else if(dp[i - 1][1 - targetIndex][1] + info[i][1] < m) {
            dp[i][1][0] = dp[i - 1][1 - targetIndex][0];
            dp[i][1][1] = dp[i - 1][1 - targetIndex][1] + info[i][1];
        } else {
            dp[i][1][0] = MAX;
            dp[i][1][1] = MAX;
        }
        
        if(dp[i][0][0] == MAX && dp[i][1][0] == MAX) {
            return -1;
        }
    }
    
    return min(dp[SIZE - 1][0][0], dp[SIZE - 1][1][0]);
}

// 지피티랑 얘기하면서 풀긴 했는데.. 다시 풀어봐야됨...
// dp[i][a] = b -> i번째 물건까지 훔치고 A의 흔적이 a만큼 있을 때 B가 남긴 최소 흔적
int solution(vector<vector<int>> info, int n, int m) {
    const int MAX = 5000;
    const int SIZE = info.size();
    vector<vector<int>> dp(SIZE + 1, vector<int>(n, MAX));
    int answer = 0;
    
    // 첫번째 물건을 A가 훔쳤을 때
    if(info[0][0] < n) {
        dp[0][info[0][0]] = 0;
    }
    // 첫번째 물건을 B가 훔쳤을 때
    if(info[0][1] < m) {
        dp[0][0] = info[0][1];
    }
    
     for(int i = 1; i < SIZE; i++) {
        int a = info[i][0];
        int b = info[i][1];

        // 물건을 더 훔칠 수 있는지 확인
        for(int j = 0; j < n; j++) {
            // 물건을 더 훔칠 수 없을 때
            if(dp[i - 1][j] == MAX) continue;
            
            // 현재 물건을 A가 훔칠 때
            // 지금 A 흔적 + 현재 물건 훔쳤을 때 추가될 흔적 < n
            if(j + a < n) {
                dp[i][j + a] =
                    min(dp[i][j + a], dp[i - 1][j]);
            }
            // 현재 물건을 B가 훔칠 때
            // 지금 B 흔적 + 현재 물건 훔쳤을 때 추가될 흔적 < m
            if(dp[i - 1][j] + b < m) {
                dp[i][j] =
                    min(dp[i][j], dp[i - 1][j] + b);
            }
        }
    }
    
    for(int a = 0; a < n; a++) {
        if(dp[SIZE - 1][a] != MAX) {
            return a;
        }
    }
    
    return -1;
}