#include <iostream>
#include <vector>
#include <functional>

using namespace std;

// 첫번째 풀이
// 핵심 풀이: 각 열마다 땅과 유성 사이의 공기 개수를 세고, 제일 적은 개수만큼 유성을 밑으로 내린다
// 시간복잡도: O(R * S)
// 공간복잡도: O(R * S)
int main() {
    int R, S;
    
    cin >> R >> S;
    
    vector<vector<char>> map(R, vector<char>(S));

    for(int i = 0; i < R; i++) {
        for(int j = 0; j < S; j++) {
            cin >> map[i][j];
        }
    }

    int minDepth = R;

    for(int j = 0; j < S; j++) {
        int depth = 0;
        bool 유성있음 = false;
        // 유성과 땅 사이 공기 개수를 센다
        for(int i = R - 2; i >= 0; i--) {
            if(map[i][j] == 'X') {
                유성있음 = true;
                break;
            } else if(map[i][j] == '.') {
                depth++;
            } else { // 처음에는 이 else문을 안 썼더니 틀림, 
                // 아래 반례처럼 공기와 유성 사이에 땅이 있을 수도 있기 때문에 땅을 만나면 현재 깊이를 0으로 초기화해줘야 함
                // 반례
                // 5 2
                // X.
                // ..
                // ##
                // .#
                // ##
                depth = 0;
            }
        }
        // 최소 깊이를 구함
        if(유성있음) {
            minDepth = min(depth, minDepth);
        }
    }
    // 유성을 밑으로 내림
    for(int j = 0; j < S; j++) {
        for(int i = R - 2; i >= 0; i--) {
            if(map[i][j] == 'X') {
                map[i + minDepth][j] = 'X';
                map[i][j] = '.';
            }
        }
    }

    for(int i = 0; i < R; i++) {
        for(int j = 0; j < S; j++) {
            cout << map[i][j];
        }
        cout << '\n';
    }

    return 0;
}
