#include <string>
#include <vector>
#include <algorithm>
#include <set>

using namespace std;

// 각 불량 사용자 아이디와 일치하는 사용자 아이디 저장
// 데이터를 쉽게 다루려고 아이디의 인덱스를 저장
vector<vector<int>> bannedIdList;
// 같은 아이디의 중복 저장을 막기 위해 방문 배열 사용
// 예: ["frodo"], ["fr*d*", "f**d*"] => ["frodo", "frodo"]
vector<bool> visited;
// 중복 여부는 set으로 점검
set<string> answer;

void backtracking(string curStr, int outerIndex, int bannedCount) {
    // 모든 경우를 탐색했을 때
    if(outerIndex == bannedCount) {
        // 아이디 목록 내용이 동일하다면 같은 것으로 처리되기 때문에
        // 아이디 목록을 오름차순 정렬한 뒤에 set에 저장
        sort(curStr.begin(), curStr.end());
        answer.insert(curStr);
        return;
    }
    
    const int size = bannedIdList[outerIndex].size();
    
    for(int j = 0; j < size; j++) {
        // 현재 아이디가 재재 아이디 목록에 아직 들어가지 않았다면
        if(!visited[bannedIdList[outerIndex][j]]) {
            visited[bannedIdList[outerIndex][j]] = true;
            backtracking(curStr + to_string(bannedIdList[outerIndex][j]), outerIndex + 1, bannedCount);
            visited[bannedIdList[outerIndex][j]] = false;
        }
    }
}

int solution(vector<string> user_id, vector<string> banned_id) {
    const int bannedIdCount = banned_id.size();
    const int userIdCount = user_id.size();
    
    bannedIdList.resize(bannedIdCount);
    visited.resize(userIdCount);
    
    // 각 불량 아이디와 일치하는 사용자 아이디를 저장
    for(int i = 0; i < bannedIdCount; i++) {
        for(int j = 0; j < userIdCount; j++) {
            const int bannedIdSize = banned_id[i].length();
            bool isMatch = true;
            if(bannedIdSize != user_id[j].length()) {
                continue;
            }
            
            for(int k = 0; k < bannedIdSize; k++) {
                if(banned_id[i][k] != '*' && banned_id[i][k] != user_id[j][k]) {
                    isMatch = false;
                    break;
                }
            }
            // 매칭되지 않으면 continue
            if(!isMatch) {
                continue;
            }
            // 사용자 아이디가 현재 불량 아이디와 일치한다면 목록에 추가
            // 0: 0 1, 1; 0 2
            bannedIdList[i].push_back(j);
         }
    }
    // 만들 수 있는 조합을 모두 점검
    backtracking("", 0, bannedIdCount);
    
    return answer.size();
}