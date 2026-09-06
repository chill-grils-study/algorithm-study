#include <string>
#include <vector>
#include <iostream>

using namespace std;

// 처음에는 1개 점수에 n발 쏘기, 2개 점수에 n발 쏘기, 이렇게 나눠야 한다고 생각.
// 근데 이 경우는 조합을 2번 구해야되서 말도 안되게 복잡..
// 그래서 고민하다 지피티한테 물어봣는데 ㅠ 그냥 점수를 하나씩 보면서
// 이 점수를 가져갈지, 포기할지를 보면 된다는 것임. . !
// 그러니까 바로 이해되서, ,식을 세웠슨
const int TEN_X = 10;
vector<int> answer(TEN_X + 1, 0);
int maxDifference = 0;

void dfs(int curIndex, int remainArrows, vector<int> curArrows, vector<int> info, int n) {
    // 끝까지 탐색했거나 남은 화살이 없는 경우
    if(curIndex == -1 || remainArrows == 0) {
        int lionPoint = 0;
        int appeachPoint = 0;
        int totalArrows = 0;
        // 점수 계산
        for(int i = 0; i <= TEN_X; i++) {
            if(info[i] < curArrows[i]) {
                lionPoint += (TEN_X - i);
            } else if(info[i] > curArrows[i]) {
                appeachPoint += (TEN_X - i);
            } else if(info[i] != 0) {
                appeachPoint += (TEN_X - i);
            }
            // 화살을 몇개 썼는지 확인
            totalArrows += curArrows[i];
        }
        // 라이언이 이겼고, 점수 차가 제일 클 경우
        if(lionPoint > appeachPoint && maxDifference < (lionPoint - appeachPoint)) {
            for(int i = 0; i <= TEN_X; i++) {
                // 현재 결과를 정답 배열에 저장
                answer[i] = curArrows[i];
                // 화살이 남으면 0점에 쏜 걸로 한다
                if(i == TEN_X && totalArrows < n) {
                    answer[i] += n - totalArrows;
                }
            }// 최대 점수 차 갱신
            maxDifference = lionPoint - appeachPoint;
        }
        
        return;
    }
    // 어피치를 이길 수 있는 화살 갯수
    int newArrows = info[curIndex] + 1;
    // 화살 쏠 수 있으면
    if(newArrows <= remainArrows) {
        // 화살 발사 표시
        curArrows[curIndex] = newArrows;
        // 이번에 화살을 쏜 경우
        dfs(curIndex - 1, remainArrows - newArrows, curArrows, info, n);
        curArrows[curIndex] = 0;
    }
    // 이번에 화살을 쏘지 않은 경우
    dfs(curIndex - 1, remainArrows, curArrows, info, n);
}

vector<int> solution(int n, vector<int> info) {
    // 점수는 0점부터 볼건데 이유는?
    // 가장 큰 점수 차이로 우승할 수 있는 방법이 여러가지면 가장 낮은 점수를 더 많이 맞힌 경우가 답이라고 했기 때문.
    // 낮은 점수를 먼저 탐색하면 최적의 답이 먼저 저장됨
    dfs(10, n, vector<int>(TEN_X + 1, 0), info, n);
    
    if(maxDifference == 0) {
        return {-1};
    }
    
    return answer;
}