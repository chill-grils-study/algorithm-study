#include <string>
#include <vector>
#include <utility>
#include <queue>

using namespace std;

const int MAX = 100001;
// 목적지에서 각 위치까지의 거리를 다익스트라로 계산
vector<int> dijkstra(int n, vector<vector<int>> roadInfo, int destination) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq;
    vector<int> distances(n, MAX);
    
    distances[destination] = 0;
    pq.push({0, destination});
    
    while(!pq.empty()) {
        auto [curDistance, curNode] = pq.top();
        pq.pop();
        
        for(int nextNode : roadInfo[curNode]) {
            int nextDistance = curDistance + 1;
            if(distances[nextNode] > nextDistance) {
                distances[nextNode] = nextDistance;
                pq.push({nextDistance, nextNode});
            }
        }
    }
    
    return distances;
}

vector<int> solution(int n, vector<vector<int>> roads, vector<int> sources, int destination) {
    vector<vector<int>> roadInfo(n, vector<int>());
    vector<int> answer;
    
    for(auto road : roads) {
        int start = road[0] - 1;
        int end = road[1] - 1;
        
        roadInfo[start].push_back(end);
        roadInfo[end].push_back(start);
    }

    vector<int> distances = dijkstra(n, roadInfo, destination - 1);
    
    for(int source : sources) {
        int distanceIndex = source - 1;
        int value = distances[distanceIndex] == MAX ? -1: distances[distanceIndex];
        answer.push_back(value);
    }
    
    return answer;
}