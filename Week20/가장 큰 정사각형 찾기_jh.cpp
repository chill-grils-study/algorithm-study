#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

// 첫번째 풀이
// 아 아이디어 좋다고 생각했는데 ㅋ 쩝;;
// 시간초과도 나고 난리부르스~
#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

int solution(vector<vector<int>> board)
{
    const int ROWS = board.size();
    const int COLUMNS = board[0].size();
    vector<vector<int>> boardSize(ROWS, vector<int>(COLUMNS, 0));
    int answer = 0;

    for(int i = 0; i < ROWS; i++) {
        int count = 0;
        for(int j = COLUMNS - 1; j >= 0; j--) {
            if(board[i][j] == 1) {
                count++;
                boardSize[i][j] = count;
            } else {
                count = 0;
            }
        }
    }
    
    for(int i = 0; i < ROWS; i++) {
        for(int j = COLUMNS - 1; j >= 0; j--) {
            int count = boardSize[i][j];
            bool isSquare = true;
            
            for(int k = i + 1; k < ROWS && k < i + count; k++) {
                if(count > boardSize[k][j]) {
                    isSquare = false;
                }
            }

            if(isSquare && i + count <= ROWS) {
                answer = max(answer, count);
            }
        }
    }
    
    return answer * answer;
}

// 피티랑 얘기하다가 dp였다는걸 깨닫고 다시 깊생.
// 그래.. 원래 정보를 이용해야 되니까 dp를 쓰는게 맞겠군.
// dp[i][j] = (i, j) 꼭짓점에서 만들 수 있는 정사각형의 최대 길이
#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

int solution(vector<vector<int>> board)
{
    const int ROWS = board.size();
    const int COLUMNS = board[0].size();
    vector<vector<int>> dp(ROWS, vector<int>(COLUMNS, 0));
    int answer = 0;

    // 첫번째 행과 열에서 만들 수 있는 정사각형의 최대 크기는 1
    for(int i = 0; i < ROWS; i++) {
        if(board[i][0] == 1) {
            dp[i][0] = 1;
            answer = 1;
        }
    }
    
    for(int j = 0; j < COLUMNS; j++) {
        if(board[0][j] == 1) {
            dp[0][j] = 1;
            answer = 1;
        }
    }

    // 현재 칸에서 좌, 우, 좌상 지점 중 최솟값에 1을 더해주면 됨
    // 그림을 그려서 설명하는게 빠를듯,, ~
    for(int i = 1; i < ROWS; i++) {
        for(int j = 1; j < COLUMNS; j++) {
            if(board[i][j] == 1) {
                int count = min(dp[i - 1][j], min(dp[i - 1][j - 1], dp[i][j - 1]));
                dp[i][j] = count + 1;
                answer = max(answer, dp[i][j]);
            }
        }
            
    }
    
    return answer * answer;
}