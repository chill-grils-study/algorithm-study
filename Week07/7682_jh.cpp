#include <iostream>
#include <vector>
#include <string>
#include <map>

using namespace std;

// 조건이 많아서 귀찮았다..!!
// 알고리즘 분류가 '많은 조건 분기'로 되어있어서 역시..^^ 했음
const int ROWS = 3;
const int SIZE = ROWS * 3;

string ticktacktoe(string grids) {
    int xCount = 0, oCount = 0, dotCount = 0;
    // 승자가 누구인지 저장
    map<char, bool> winner;

    winner.insert({'O', false});
    winner.insert({'X', false});

    for(char grid : grids) {
        if(grid == 'X') {
            xCount++;
        } else if(grid == 'O') {
            oCount++;
        } else {
            dotCount++;
        }
    }
    // X가 이겼을 때는 X가 O보다 한개 많아야 하고
    // O가 이겼을 때는 X랑 O 개수가 같아야 함
    // 이 외의 경우는 모두 불가능함
    if(!(xCount == oCount + 1 || xCount == oCount)) {
        return "invalid";
    }
    // 세로 빙고 확인
    for(int i = 0; i < ROWS; i++) {
        if(grids[i] != '.' && grids[i] == grids[i + 3] && grids[i + 3] == grids[i + 6]) {
            winner[grids[i]] = true;
        }
    }
    // 가로 빙고 확인
    for(int i = 0; i < SIZE; i+=3) {
        if(grids[i] != '.' && grids[i] == grids[i + 1] && grids[i + 1] == grids[i + 2]) {
            winner[grids[i]] = true;
        }
    }
    // 대각선 빙고 확인
    if(grids[0] != '.' && grids[0] == grids[ROWS + 1] && grids[ROWS + 1] == grids[2 * ROWS + 2]) {
        winner[grids[0]] = true;
    }
    if(grids[ROWS - 1] != '.' && grids[ROWS - 1] == grids[2 * ROWS - 2] && grids[2 * ROWS - 2] == grids[3 * ROWS - 3]) {
        winner[grids[ROWS - 1]] = true;
    }

    // O랑 X 둘 다 이기는 경우는 없음
    if(winner['O'] && winner['X']) {
        return "invalid";
    }
    // X가 이겼을 때는 X가 O보다 한개 많아야 하고
    // O가 이겼을 때는 X랑 O 개수가 같아야 함
    if((winner['O'] && xCount == oCount) || (winner['X'] && xCount == oCount + 1)) {
        return "valid";
    }
    // 무승부일 경우 개수 한번 더 확인
    if(!winner['O'] && !winner['X'] && xCount == oCount + 1 && dotCount == 0) {
        return "valid";
    }

    return "invalid";
}

int main() {
    while(true) {
        string grids;

        cin >> grids;

        if(grids == "end") {
            break;
        }

        cout << ticktacktoe(grids) << '\n';
    }

    return 0;
}
