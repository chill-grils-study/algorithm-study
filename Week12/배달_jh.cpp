#include <iostream>
#include <vector>
#include <queue>

using namespace std;

vector<int> weights;

void dijkstra(vector<vector<pair<int, int>>>& graph) {
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> queue;
    
    weights[1] = 0;
    queue.push({0, 1});
    
    while(!queue.empty()) {
        auto [curWeight, curPosition] = queue.top();
        queue.pop();
        
        if(curWeight > weights[curPosition]) {
            continue;
        }
        
        for(auto [nextPosition, nextWeight] : graph[curPosition]) {
            if(weights[curPosition] + nextWeight < weights[nextPosition]) {
                queue.push({weights[curPosition] + nextWeight, nextPosition});
                weights[nextPosition] = weights[curPosition] + nextWeight;
            }
        }
    }
}

int solution(int N, vector<vector<int>> road, int K) {
    const int INF = 500001;
    vector<vector<pair<int, int>>> graph;
    int answer = 0;
    
    graph.resize(N + 1);
    weights.resize(N + 1, INF);
    
    for(auto item : road) {
        graph[item[0]].push_back({item[1], item[2]});
        graph[item[1]].push_back({item[0], item[2]});
    }

    dijkstra(graph);
    
    for(int weight : weights) {
        if(weight <= K) {
            answer++;
        }
    }

    return answer;
}