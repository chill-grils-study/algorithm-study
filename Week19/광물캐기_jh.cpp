#include <string>
#include <vector>
#include <unordered_map>

using namespace std;

// 세시간동안 풀었음. 눈물이 앞을 가리고 손발이 벌벌 떨리고 웅앵~~

// 첫번째 풀이. 
// 그리디로 생각.
// 다이아 캐야 됨 -> 다이아, 철, 돌 순으로 확인해서 캠
// 철 캐야 됨 -> 철, 다이아, 돌 순으로 확인해서 캠
// 돌 캐야 됨 -> 돌, 철, 다이아 순으로 확인해서 캠
// 다이아 1, 돌 4 / 다이아 5 -> 이 경우에 다이아를 먼저 사용하는게 문제
int solution(vector<int> picks, vector<string> minerals) {
    const int SIZE = minerals.size();
    const int LIMIT = 5;
    string mineralList[3] = {"diamond", "iron", "stone"};
    unordered_map<string, int> mineralIndex;
    int damage[3][3] = {{1, 1, 1}, {5, 1, 1}, {25, 5, 1}};
    int answer = 0;
    
    mineralIndex.insert({mineralList[0], 0});
    mineralIndex.insert({mineralList[1], 1});
    mineralIndex.insert({mineralList[2], 2});
    
    for(int i = 0; i < SIZE; i+=LIMIT) {
        unordered_map<string, int> count;
        for(int j = i; j < i + LIMIT && j < SIZE; j++) {
            count[minerals[j]]++;
        }
        
        int picksIndex = 0;
        
        if(count.find(mineralList[0]) != count.end()) {
            picksIndex = 0;
        } else if(count.find(mineralList[1]) != count.end()) {
            picksIndex = 1;
        } else {
            picksIndex = 2;
        }
        
        if(picks[picksIndex] == 0) {
            int extraIndex = 0;
            if(picksIndex == 0) {
                for(int i = 1; i <= 2; i++) {
                    if(picks[picksIndex + i] > 0) {
                        extraIndex = i;
                        break;
                    }
                }
            } else {
                for(int i = 1; i <= 2; i++) {
                    int newIndex = picksIndex - i < 0 ? 2 : picksIndex - i;

                    if(picks[newIndex] > 0) {
                        extraIndex = newIndex - picksIndex;
                        break;
                    }
                }
            }
        
            if(extraIndex == 0) {
                return answer;
            }
            
            picksIndex += extraIndex;
        }
        
        for(auto item : count) {
            if(item.second > 0) {
                answer += damage[picksIndex][mineralIndex[item.first]] * item.second;
            }
        }
        picks[picksIndex]--;
    }
    
    return answer;
}

// 처음에 완탐 생각했다가..? 한 곡괭이를 여러개 쓸 수 있다는 조건 때문에 로직이 안 세워져서
// 그리디를 선택했지만 틀렸고..? 지피티가 수정 아이디어 줬는데 납득이 안 돼서 완탐으로 더 생각해보기로 함...
// 너무 복잡하게 풀었나..? 하지만 .. 이렇게 밖에 못 풀겠어..
#include <string>
#include <vector>
#include <unordered_map>
#include <math.h>

using namespace std;

void dfs(vector<vector<int>> &damage, vector<int> &picks, vector<int> curPicks, vector<vector<int>> &mineralInfo, int cnt, int &answer) {
    // 모든 구간을 확인했거나 곡괭이를 다 썼을 때
    if(cnt == mineralInfo.size() || (picks[0] == 0 && picks[1] == 0 && picks[2] == 0)) {
        int total = 0;
        for(int i = 0; i < cnt; i++) {
            total += damage[curPicks[i]][0] * mineralInfo[i][0];
            total += damage[curPicks[i]][1] * mineralInfo[i][1];
            total += damage[curPicks[i]][2] * mineralInfo[i][2];
        }
        answer = min(answer, total);
        return;
    }
    
    for(int i = 0; i < 3; i++) {
        if(picks[i] > 0) {
            picks[i]--;
            curPicks.push_back(i);
            dfs(damage, picks, curPicks, mineralInfo, cnt + 1, answer);
            curPicks.pop_back();
            picks[i]++;
        }
    }
    
    return;
}

int solution(vector<int> picks, vector<string> minerals) {
    const int SIZE = minerals.size();
    // mineral 배열 구간 개수
    const int REPEAT = SIZE % 5 > 0 ? SIZE / 5 + 1 : SIZE / 5 ;
    string mineralList[3] = {"diamond", "iron", "stone"};
    // 각 구간의 광물 개수
    vector<vector<int>> mineralInfo(REPEAT, vector<int>(3, 0));
    unordered_map<string, int> mineralIndex;
    vector<vector<int>> damage = {{1, 1, 1}, {5, 1, 1}, {25, 5, 1}};
    int answer = 25 * 5 * 15;
    
    mineralIndex.insert({mineralList[0], 0});
    mineralIndex.insert({mineralList[1], 1});
    mineralIndex.insert({mineralList[2], 2});

    for(int i = 0; i < REPEAT; i++) {
        for(int j = i * 5; j < (i + 1) * 5 && j < SIZE; j++) {
            mineralInfo[i][mineralIndex[minerals[j]]]++;
        }
    }
    
    dfs(damage, picks, vector<int>{}, mineralInfo, 0, answer);
    
    return answer;
}