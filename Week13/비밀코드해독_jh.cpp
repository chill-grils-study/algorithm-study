#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 접근 방법이 도저히 생각이 안 나서 지피티한테 힌트 하나만 달라고 했어요,,ㅎ
// 처음에는 q로 조합을 하나씩 만들고 확인해야 하나..? 생각했는데
// 1 ~ n 범위 안에서 배열 길이가 5인 조합을 만들고 q랑 몇개 일치하는지 확인하면 됨
const int SECRET_CODE_SIZE = 5;
int answer = 0;

void 완전탐색(int curNum, vector<int> secretCode, int n, vector<vector<int>>& q, vector<int>& ans) {
    if(secretCode.size() == SECRET_CODE_SIZE) {
       for(int i = 0; i < q.size(); i++) {
           int count = 0;
           // q[i]랑 code랑 일치하는 문자 개수 구하기
           for(int code : secretCode) {
               if(find(q[i].begin(), q[i].end(), code) != q[i].end()) {
                   count++;
               }
           }
           // 일치하는 문자 개수가 ans[i]와 다르다면 바로 리턴
           if(count != ans[i]) {
               return;
           }
       }
       // 반복문을 빠져나왔다는건 일치하는 문자 개수가 같다는거니까 answer + 1 후 리턴
        answer++;
        return;
    }
    
    for(int i = curNum; i <= n; i++) {
        secretCode.push_back(i);
        // 처음에 i + 1이 아니라 curNum + 1을 넣어서 틀렸음,,ㅎ
        // 아 i인거 알고 있었는데 ~ 실수했어요 ㅋ
        완전탐색(i + 1, secretCode, n, q, ans);
        secretCode.pop_back();
    }
}

int solution(int n, vector<vector<int>> q, vector<int> ans) {
    완전탐색(1, {}, n, q, ans);
    return answer;
}