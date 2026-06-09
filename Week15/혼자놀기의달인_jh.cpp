#include <string>
#include <vector>
#include <queue>

using namespace std;

// bfs로 각 그룹에 몇개의 상자가 있는지 구함
int bfs(vector<int>& cards, vector<bool>& visited, int startIndex) {
    queue<int> q;
    int count = 1;
    
    visited[startIndex] = true;
    q.push(startIndex);
    
    while(!q.empty()) {
        int curIndex = q.front();
        int nextIndex = cards[curIndex] - 1;
        
        if(visited[nextIndex]) {
            break;
        }
        
        q.pop();
        q.push(nextIndex);
        visited[nextIndex] = true;
        count++;
    }
    
    return count;
}

int solution(vector<int> cards) {
    const int N = cards.size();
    // 우선순위 큐로 상자의 개수가 많은 그룹 순대로 정렬
    // 가장 많은 상자를 고를 수 있는 경우로 게임 두번 하면 되니까
    priority_queue<int> boxCounts;
    vector<bool> visited(N, false);
    
    for(int i = 0; i < N; i++) {
        if(!visited[i]) {
            int count = bfs(cards, visited, i);
            boxCounts.push(count);
        }
    }
    // 그룹이 한개라면 0 리턴
    if(boxCounts.size() == 1) {
        return 0;
    }
    
    int answer = boxCounts.top();
    boxCounts.pop();
    answer *= boxCounts.top();
    
    return answer;
}