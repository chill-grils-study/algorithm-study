#include <string>
#include <vector>
#include <iostream>

using namespace std;

// 제일 멀리 있는 집에서 부터 가능한 집까지 묶어서 순차적으로 배달하려고 했음
// 1 2 3 / 4 5
// 부분 배달이 가능하다는걸 고려하지 않음
long long solution(int cap, int n, vector<int> deliveries, vector<int> pickups) {
    long long curDeliveryCnt = 0;
    long long curPickupCnt = 0;
    long long answer = 0;
    long long prevIndex = n - 1;
    
    for(long long i = n - 1; i >= 0; i--) {
        curDeliveryCnt += deliveries[i];
        curPickupCnt += pickups[i];
        
        if(curDeliveryCnt > cap || curPickupCnt > cap) {
            answer += (prevIndex + 1) * 2;
            prevIndex = i;
            curDeliveryCnt = deliveries[i];
            curPickupCnt = pickups[i];
        } else {
            deliveries[i] = 0;
            pickups[i] = 0;
        }
    }
    
    for(long long i = n - 1; i >= 0; i--) {
        if(deliveries[i] > 0 || pickups[i] > 0) {
            answer += (i + 1) * 2;
            break;
        }
    }
    
    return answer;
}

// 부분 배달 가능하게 수정 -> 그래도 틀림
long long solution(int cap, int n, vector<int> deliveries, vector<int> pickups) {
    long long curDeliveryCnt = 0;
    long long curPickupCnt = 0;
    long long answer = 0;
    long long prevIndex = n - 1;
    
    for(long long i = n - 1; i >= 0; i--) {
        curDeliveryCnt += deliveries[i];
        curPickupCnt += pickups[i];
        
        if(curDeliveryCnt > cap || curPickupCnt > cap) {
            answer += (prevIndex + 1) * 2;
            prevIndex = i;
            curDeliveryCnt = curDeliveryCnt - cap;
            curPickupCnt = curPickupCnt - cap;
        }
    }
    
    answer += (prevIndex + 1) * 2;
    
    return answer;
}

// 최종 정답 -> 지피티한테 수정해달라 함 .. ㅎ 
long long solution(int cap, int n, vector<int> deliveries, vector<int> pickups) {
    long long curDeliveryCnt = 0;
    long long curPickupCnt = 0;
    long long answer = 0;

    for (long long i = n - 1; i >= 0; i--) {
        curDeliveryCnt += deliveries[i];
        curPickupCnt += pickups[i];
        // 현재 배달개수에서 cap을 한번만 뻬는건 안됨
        // 현재 배달개수: 18, cap: 4 -> 한번 왕복으로 배달 다 못함
        // curDeliveryCnt, curPickupCnt가 음수라면 배달/수거 여유분이 남았다는 뜻
        // cap: 5
        // 배달: [1, 0, 2, 0, 1, 14, 2]
        // 수거: [0, 2, 0, 1, 0, 2, 0]
        while (curDeliveryCnt > 0 || curPickupCnt > 0) {
            answer += (i + 1) * 2;

            curDeliveryCnt -= cap;
            curPickupCnt -= cap;
        }
    }

    return answer;
}