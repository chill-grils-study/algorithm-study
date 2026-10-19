#include <string>
#include <vector>
#include <math.h>
#include <queue>

using namespace std;

const int MAX = 100;

int bfs(int cutStart, int cutEnd, int n, vector<vector<int>> &connections) {
    vector<int> visited(n, false);
    queue<int> q;
    int nodeCnt = 0;
    
    visited[0] = true;
    q.push(0);
    
    while(!q.empty()) {
        int curNode = q.front();
        q.pop();
        nodeCnt++;
        
        for(int nextNode : connections[curNode]) {
            if(visited[nextNode] || (curNode == cutStart && nextNode == cutEnd) || (curNode == cutEnd && nextNode == cutStart)) {
                continue;
            }
            visited[nextNode] = true;
            q.push(nextNode);
        }
    }
    
    return abs(nodeCnt - abs(n - nodeCnt));
}

int solution(int n, vector<vector<int>> wires) {
    vector<vector<int>> connections(n, vector<int>());
    int answer = MAX;
    
    for(vector<int> wire : wires) {
        int start = wire[0] - 1;
        int end = wire[1] - 1;
        
        connections[start].push_back(end);
        connections[end].push_back(start);
    }
    
    for(vector<int> wire : wires) {
        int start = wire[0] - 1;
        int end = wire[1] - 1;
        answer = min(answer, bfs(start, end, n, connections));
    }
    
    return answer;
}