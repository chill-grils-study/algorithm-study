#include <string>
#include <vector>
#include <queue>

using namespace std;
// 요새 정말 혼자 힘으로 한번에 푸는게 없어서 슬프다 .. ^^ㅠ
// 그리디 + 우산순위 큐, 남은 병사로 적을 처리하지 못할 때 큐에서 가장 많은 적을 가진 라운드에 무적권을 쓰면 된다.
// 는 기본 아이디어는 지피티랑 얘기하면서 알게됨..
int solution(int n, int k, vector<int> enemy) {
    const int SIZE = enemy.size();
    priority_queue<int> pq;
    
    for(int i = 0; i < SIZE; i++) {
        // 우선순위 큐에 현재 적 추가
        // 이번 라운드에서 바로 무적권을 쓰게 될 수도 있으니까
        pq.push(enemy[i]);
        // 병사 일단 죽이기
        n -= enemy[i];
        // 병사보다 적의 수가 많다면
        while(n < 0) {
            // 무적권을 최대한 쓰기
            if(k > 0) {
                n += pq.top();
                pq.pop();
                k--;
            } else if(k == 0) { // 무적권을 다 써도 여전히 적이 병사보다 많다면 종료
                return i;
            }
        }
    }
    
    return SIZE;
}