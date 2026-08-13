#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 알고리즘 뭐 쓰는지만 알면 되서 제일 쉬웠던듯...
// 하지만..? 크루스칼 구현 방법 몰라서 지피티한테 조금씩 물어봄..ㅋ
// ---
// <그래프 알고리즘 차이>
// 크루스칼: 모든 정점을 연결하는 데 필요한 전체 연결 비용 최소화 => 비용이 가장 적은 간선부터 하나씩 선택해서 모든 정점을 연결
// 다익스트라: 한 정점에서 다른 정점들까지의 최단거리
// 플로이드-워셜: 모든 정점 → 모든 정점 사이의 최단거리

vector<int> parents;

bool cmp(vector<int> a, vector<int> b) {
    return a[2] < b[2];
}
// 재귀로 현 정점의 부모 번호 반환
int getParent(int a) {
    if(a == parents[a]) {
        return a;
    } else {
        return getParent(parents[a]);
    }
}
// 같은 그룹인지 반환
bool unionFind(int a, int b) {
    if(getParent(a) == getParent(b)) {
        return true;
    } 
    return false;
}
// 그레픆끼리 연결
void unionParent(int a, int b) {
    int parentA = getParent(a);
    int parentB = getParent(b);
    
    if(parentA != parentB) {
        parents[parentB] = parentA;
    }
}

int solution(int n, vector<vector<int>> costs) {
    int answer = 0;
    
    parents.resize(n, 0);
    
    for(int i = 0; i < n; i++) {
        parents[i] = i;
    }
    // 비용을 기준으로 오름차순 정렬
    sort(costs.begin(), costs.end(), cmp);
    
    for(vector<int> cost : costs) {
        const int start = cost[0];
        const int end = cost[1];
        const int money = cost[2];
        // 두 정점이 다른 집합에 속해있다면
        if(!unionFind(start, end)) {
            // 비용 추가
            answer += money;
            // 부모 병합
            unionParent(start, end);
        }
    }
    
    return answer;
}