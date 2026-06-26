#include <string>
#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

// 이번에도 지피티의 도움을 받았지만.. 그래도 접근 방법 알고서 점화식은 혼자 세웠음니다..
// dp[i][x] = y
// i번쨰까지 A가 x개 훔쳤을 때 B는 y개 훔쳤다
int solution(vector<vector<int>> info, int n, int m) {
    const int SIZE = info.size();
    const int INF = 121;
    vector<vector<int>> dp(SIZE, vector<int>(INF, INF));
   
    if(info[0][0] < n) {
        dp[0][info[0][0]] = 0;    
    }
    if(info[0][1] < m) {
        dp[0][0] = info[0][1];        
    }
    
    for(int i = 1; i < SIZE; i++) {
        for(int j = 0; j < INF; j++) {
            // 이전에 훔친 흔적이 있다면
            if(dp[i - 1][j] != INF) {
                // A가 훔침
                if(j + info[i][0] < n) {
                    dp[i][j + info[i][0]] = min(dp[i][j + info[i][0]], dp[i - 1][j]);
                }
                // B가 훔침
                if(dp[i - 1][j] + info[i][1] < m) {
                    dp[i][j] = min(dp[i][j], dp[i - 1][j] + info[i][1]);
                }
            }
        }
    }
    
    for(int j = 0; j < INF; j++) {
        if(dp[SIZE - 1][j] != INF) {
            return j;
        }
    }
    
    return -1;
}