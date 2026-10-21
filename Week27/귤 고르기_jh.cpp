#include <string>
#include <vector>
#include <map>
#include <algorithm>

using namespace std;

int solution(int k, vector<int> tangerines) {
    map<int, int> sizeCntMap;
    vector<pair<int, int>> sizeCntList;
    int answer = 0;
    
    // 종류별 개수 계산
    for(int tangerine : tangerines) {
        sizeCntMap[tangerine]++;
    }
    // 개수 기준으로 내림차순 정렬을 위해 배열에 저장
    for(auto sizeCnt : sizeCntMap) {
        sizeCntList.push_back({sizeCnt.first, sizeCnt.second});
    }
    
    sort(sizeCntList.begin(), sizeCntList.end(), [](pair<int, int> a, pair<int, int> b) {
        // >= 로 하니까 "실패 (munmap_chunk(): invalid pointer)" 오류가 남.. 조심하자..
        return a.second > b.second; 
    });
    
    for(auto [size, cnt] : sizeCntList) {
        // 귤 종류 개수 1 증가              
        answer++;
        // 수확해야 될 개수에서 현재 종류의 개수를 뺌
        k -= cnt;
        // 수확해야 될 개수가 0 이하라면 더 이상 수확할 게 없으니까 종료
        if(k <= 0) {
            break;
        }
    }
    
    return answer;
}