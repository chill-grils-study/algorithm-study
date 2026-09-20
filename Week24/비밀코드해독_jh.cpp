#include <string>
#include <vector>
#include <algorithm>
#include <iostream>

using namespace std;

int answer = 0;

// 완탐이랍니다.
// 기냥 만들 수 있는 조합 다 만들고 검사해!!!
void 조합(int curNum, int n, vector<int> curQ, vector<vector<int>> q, vector<int> ans) {
    if(curQ.size() == 5) {
        bool allMatched = true;
        for(int i = 0; i < q.size(); i++) {
            int matchCnt = 0;
            int j = 0, k = 0;
            
            while(j < 5 && k < 5) {
                if(curQ[j] == q[i][k]) {
                    j++;
                    k++;
                    matchCnt++;
                } else if(curQ[j] > q[i][k]) {
                    k++;
                } else {
                    j++;
                }
            }
            
            if(matchCnt != ans[i]) {
                allMatched = false;
                break;
            }
        }
       
        if(allMatched) {
            answer++;    
        }

        return;
    }
    
    for(int i = curNum; i <= n; i++) {
        curQ.push_back(i);
        조합(i + 1, n, curQ, q, ans);
        curQ.pop_back();
    }
}

int solution(int n, vector<vector<int>> q, vector<int> ans) {
    조합(1, n, vector<int>{}, q, ans);
    return answer;
}