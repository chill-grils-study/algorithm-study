#include <iostream>
#include <queue>
#include <vector>

using namespace std;
// 이분그래프 -> 방문 노드에 색을 칠한다, 인접한 노드끼리는 다른 색이어야 한다.
// 같은 집합에 속한 정점끼리는 연결되면 안되니까
bool bfs(vector<vector<int>>& graph, vector<char>& color, int start) {
    queue<int> nextQueue;
    nextQueue.push(start);
    color[start] = 'B';

    while(!nextQueue.empty()) {
        int currentNode = nextQueue.front();
        int currentColor = color[currentNode];
        nextQueue.pop();

        for(int nextNode : graph[currentNode]) {
            if(color[nextNode] == 'W') {
                nextQueue.push(nextNode);
                color[nextNode] = currentColor == 'B' ? 'R' : 'B';
            } else if(color[nextNode] == currentColor){
                return false;
            }
        }
    }

    return true;
}

int main() {
    int T;

    cin >> T;

    while(T--) {
        int V, E;

        cin >> V >> E;

        vector<vector<int>> graph(V + 1, vector<int>());

        for(int i = 0; i < E; i++) {
            int start, end;

            cin >> start >> end;

            graph[start].push_back(end);
            graph[end].push_back(start);
        }
        // 초기에는 모든 노드에 'W'로 칠한다
        vector<char> color(V + 1, 'W');
        bool isBipartiteGraph = false;

        for(int i = 1; i <= V; i++) {
            // 아직 색칠하지 않은 부분 그래프를 확인
            if(color[i] == 'W') {
                isBipartiteGraph = bfs(graph, color, i);
                if(!isBipartiteGraph) {
                    break;
                }   
            }
        }

        if(isBipartiteGraph) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }
    }

    return 0;
}
