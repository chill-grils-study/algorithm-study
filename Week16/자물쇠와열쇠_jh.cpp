#include <string>
#include <vector>

using namespace std;

// 첫번째 시도방법
// 1. 열쇠 회전
// 2. 열쇠를 자물쇠 안에서 이동시키면서 매칭되는지 보기
bool solution(vector<vector<int>> key, vector<vector<int>> lock) {
    const int KEY_SIZE = key.size();
    const int LOCK_SIZE = lock.size();
    bool answer = true;
    
    for(int i = 0; i < 3; i++) {
        // 자물쇠 범위
        int startX = 0, endX = KEY_SIZE - 1, startY = 0, endY = KEY_SIZE - 1;
        // 오른쪽, 아래로 한칸씩 이동하면서 매칭되는지 확인
        for(int i = 0; i < KEY_SIZE; i++) {
            for(int j = 0; j < KEY_SIZE; j++) {
                bool hasMatch = true;
                for(int i = startX; i < endX; i++) {
                    for(int j = startY; j < endY; j++) {
                        if(key[i - startX][j - startY] != lock[i][j]) {
                            hasMatch = false;
                            break;
                        }
                    }
                    if(hasMatch) {
                        return true;
                    } else {
                        break;
                    }
                }
                startY++;
            }
            startX++;
            startY = 0;
        }
        
        // 자물쇠 범위
        // 여기서 틀림. 확인 범위 구하는게 너무 어려워서 하다가 때려침
        startX = 0, endX = KEY_SIZE - 1, startY = 0, endY = KEY_SIZE - 1;
        int keyStartX = KEY_SIZE - (endX - startX);
        int keyStartY = KEY_SIZE - (endY - startY);
        // 왼쪽, 위로 한칸씩 이동하면서 매칭되는지 확인
        for(int i = 0; i < KEY_SIZE; i++) {
            for(int j = 0; j < KEY_SIZE; j++) {
                bool hasMatch = true;
                for(int i = startX; i < endX; i++) {
                    for(int j = startY; j < endY; j++) {
                        if(key[i + endX - startX][j + endY - startY] != lock[i][j]) {
                            hasMatch = false;
                            break;
                        }
                    }
                    if(hasMatch) {
                        return true;
                    } else {
                        break;
                    }
                }
                endY--;
            }
            endX--;
            startY = 0;
        }

        vector<vector<int>> copiedLock = lock;
        // 90도 회전
        for(int i = 0; i < KEY_SIZE; i++) {
            for(int j = 0; j < KEY_SIZE; j++) {
                lock[j][KEY_SIZE - i] = copiedLock[i][j];
            }
        }
    }
    
    return answer;
}

// 지피티 대가리 쥐어 뜯으면서 풀었는데... 아 에바참치로 너무 어려워 머리 안 돌아가 절망적.. 걍 지피티 풀이임
vector<vector<int>> rotateKey(vector<vector<int>> key) {
    int n = key.size();
    vector<vector<int>> rotated(n, vector<int>(n));

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            rotated[j][n - 1 - i] = key[i][j];
        }
    }

    return rotated;
}

bool check(const vector<vector<int>>& board, int keySize, int lockSize) {
    for (int i = keySize - 1; i < keySize - 1 + lockSize; i++) {
        for (int j = keySize - 1; j < keySize - 1 + lockSize; j++) {
            if (board[i][j] != 1)
                return false;
        }
    }

    return true;
}

bool solution(vector<vector<int>> key, vector<vector<int>> lock) {
    int keySize = key.size();
    int lockSize = lock.size();

    int boardSize = lockSize + 2 * (keySize - 1);
    vector<vector<int>> board(boardSize, vector<int>(boardSize, 0));

    // 자물쇠를 가운데에 복사
    for (int i = 0; i < lockSize; i++) {
        for (int j = 0; j < lockSize; j++) {
            board[keySize - 1 + i][keySize - 1 + j] = lock[i][j];
        }
    }

    // 4번 회전
    for (int rot = 0; rot < 4; rot++) {

        // 모든 위치 탐색
        for (int x = 0; x <= boardSize - keySize; x++) {
            for (int y = 0; y <= boardSize - keySize; y++) {

                // 열쇠 올리기
                for (int i = 0; i < keySize; i++) {
                    for (int j = 0; j < keySize; j++) {
                        board[x + i][y + j] += key[i][j];
                    }
                }

                // 검사
                if (check(board, keySize, lockSize))
                    return true;

                // 원상복구
                for (int i = 0; i < keySize; i++) {
                    for (int j = 0; j < keySize; j++) {
                        board[x + i][y + j] -= key[i][j];
                    }
                }
            }
        }

        key = rotateKey(key);
    }

    return false;
}