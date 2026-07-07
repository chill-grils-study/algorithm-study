#include <string>
#include <vector>

using namespace std;

const int SIZE = 3;

// 이번에는 처음부터 조건별로 잘 나눠서 풀었슨
// 1. !(O가 X보다 1개 많거나 같아야 함)
//   - O가 승리한 경우 -> O = X + 1
//   - X가 승리한 경우 -> O = X
// 2. 종료됐는데 계속 하는 경우
//   - O랑 X 둘다 성공한 경우
//   - O가 성공했는데 O != X + 1
//   - X가 성공했는데 O != X

// 빙고 개수 확인
int getBingoCount(char target, vector<string>& board) {
    int bingoCount = 0;
    bool isBingo = false;
    
    for(int i = 0; i < SIZE; i++) {
        for(int j = 0; j < SIZE; j++) {
            isBingo = target == board[i][j];
            if(!isBingo) {
                break;
            }
        }
        bingoCount += isBingo ? 1 : 0;
    }
    
    for(int j = 0; j < SIZE; j++) {
        isBingo = false;
        for(int i = 0; i < SIZE; i++) {
            isBingo = target == board[i][j];
            if(!isBingo) {
                break;
            }
        }
        bingoCount += isBingo ? 1 : 0;
    }
    
    isBingo = false;
    
    for(int i = 0; i < SIZE; i++) {
        isBingo = board[i][i] == target;
        if(!isBingo) {
            break;
        }
    }
    bingoCount += isBingo ? 1 : 0;

    isBingo = false;
    
    if(target == board[0][2] && target == board[1][1] && target == board[2][0]) {
        isBingo = true;
    }
    
    bingoCount += isBingo ? 1 : 0;
    return bingoCount;
}

int solution(vector<string> board) {
    int oCount = 0, xCount = 0;
    int answer = -1;
    
    for(int i = 0; i < SIZE; i++) {
        for(int j = 0; j < SIZE; j++) {
            if(board[i][j] == 'O') {
                oCount++;
            } else if(board[i][j] == 'X') {
                xCount++;
            }
        }
    }
    
    // !(O가 X보다 1개 많거나 같아야 함)
    if(!(oCount == xCount + 1 || oCount == xCount)) {
        return false;
    }
    
    int oBingoCount = getBingoCount('O', board);
    int xBingoCount = getBingoCount('X', board);
    
    // 종료됐는데 계속 하는 경우
    if(oBingoCount >= 1 && xBingoCount >= 1) {
        return false;
    }
    if(oBingoCount >= 1 && oCount != xCount + 1) {
        return false;
    }
    if(xBingoCount >= 1 && oCount != xCount) {
        return false;
    }
    
    return true;
}