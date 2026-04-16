#include <iostream>
#include <vector>
#include <map>
#include <math.h>

using namespace std;

int N;
int result = 5000;
vector<vector<int>> power;
// 방문 배열로 스타트/링크 팀 나누기
void 조합(vector<bool> visited, int size, int curNum) {
    if(size == N / 2) {
        vector<int> startTeam;
        vector<int> linkTeam;
        int startTotal = 0, linkTotal = 0;

        for(int i = 0; i < N; i++) {
            if(visited[i]) {
                startTeam.push_back(i);
            } else {
                linkTeam.push_back(i);
            }
        }

        for(int i = 0; i < size - 1; i++) {
            for(int j = i + 1; j < size; j++) {
                int addPower = power[startTeam[i]][startTeam[j]] + power[startTeam[j]][startTeam[i]];
                startTotal += addPower;
            }
        }

        for(int i = 0; i < size - 1; i++) {
            for(int j = i + 1; j < size; j++) {
                int addPower = power[linkTeam[i]][linkTeam[j]] + power[linkTeam[j]][linkTeam[i]];
                linkTotal += addPower;
            }
        }
        
        result = min(result, abs(linkTotal - startTotal));
        return;
    }

    for(int i = curNum; i < N; i++) {
        if(!visited[i]) {
            visited[i] = true;
            조합(visited, size + 1, i + 1);
            visited[i] = false;
        }
    }
}

int main() {
    cin >> N;

    power.resize(N, vector<int>(N));
    
    for(int i = 0; i < N; i++) {
        for(int j = 0; j < N; j++) {
            cin >> power[i][j];
        }
    }
    
    vector<bool> visited(N, false);

    조합(visited, 0, 0);

    cout << result;

    return 0;
}
