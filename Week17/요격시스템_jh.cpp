#include <string>
#include <vector>
#include <algorithm>


using namespace std;
// 처음에는 이분탐색을 의심함. 하지만 요격 미사일을 구하는 간단한 식이 안 세워짐..
// 그래서 더 생각해보다 그리디..?를 짚어봤는데 맞았슨
// 끝점을 기준으로 정렬해야된다는 힌트는 지피티가 줬음.. ㅠ ㅠ 정말 혼자서 푸는게 하나도 없구나. .
// 힌트는 단계별로 달라고 하기는 한데 더 열심히 풀어야겠어요 .. ^^
int solution(vector<vector<int>> targets) {
    int answer = 0;
    // 끝점 기준으로 오름차순 정렬
    sort(targets.begin(), targets.end(), [](vector<int> a, vector<int> b) {
        if(a[1] == b[1]) {
            return a[0] < b[0];
        }
        return a[1] < b[1];
    });
    // 이전 요격 미사일이 현재 미사일과 겹치는지 확인할 변수
    int prev = 0;
    
    for(auto target : targets) {
        int start = target[0];
        int end = target[1];
        // 요격 미사일이 현재 미사일 범위를 벗어났다면
        if(prev <= start || prev > end) {
            // 이전 요격 지점 변경, 요격 미사일 개수 증가
            // 요격 미사일은 끝점에 가깝게 쐈다고 가정 -> 최대한 겹치는 범위를 늘리기 위해
            // 만약에 end가 4라면 3.9정도에 쐈다고 생각. 근데 실수를 넣기는 귀찮아서 그냥 정수로 넣음
            prev = end;
            answer++;
        }
    }
    
    return answer;
}