#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

// 원형이라는걸 까먹음;;
int solution(vector<int> sticker)
{
    const int N = sticker.size();
    vector<vector<int>> dp(N, vector<int>(2, 0));
    int answer =0;
    
    dp[0][0] = sticker[0];
    dp[0][1] = 0;
    dp[1][0] = sticker[1];
    dp[1][1] = dp[0][0];
    
    for(int i = 2; i < N; i++) {
        dp[i][0] = dp[i - 1][1] + sticker[i];
        dp[i][1] = max(dp[i - 1][0], dp[i - 1][1]);
    }

    return max(dp[N - 1][0], dp[N - 1][1]);
}

// 1. 마지막 케이스에서만 segmantation fault 발생.
//    아 놔 ~~~! 배열 길이가 1일 때를 완전히 놓침. 하.. ! 바보냐 . . ?!
// 2. 시간초과
//    로직 문제가 아니라 이차원 벡터를 N * 2로 만드는게 문제라는 피티의 이야기를 듣고 깊생.
//    벡터가 아닌 변수로 계산. 이전 상태를 다 확인하는게 아니라 직전 상태만 알고 있으면 되기에 가능.
// 시간복잡도가 높지 않은데도 시간초과가 나면 자료구조를 확인해보자 >_<
#include <iostream>
#include <vector>
#include <math.h>
using namespace std;

int solution(vector<int> sticker)
{
    const int N = sticker.size();
    // 현재 스티커 뜯었을 때, 안 뜯었을 때
    int pickStickerTotal = 0, unpickStickerTotal = 0;
    int answer = 0;
    
    if(N == 1) {
      return sticker[0];
    }
    
    pickStickerTotal = sticker[1];
    unpickStickerTotal = sticker[0];
    
    for(int i = 2; i < N; i++) {
        int previousPickStickerTotal = pickStickerTotal;
        if(i < N - 1) {
            pickStickerTotal = unpickStickerTotal + sticker[i];            
        }
        unpickStickerTotal = max(previousPickStickerTotal, unpickStickerTotal);
    }
    
    answer = unpickStickerTotal;
    
    pickStickerTotal = sticker[1];
    unpickStickerTotal = 0;
    
    for(int i = 2; i < N; i++) {
        int previousPickStickerTotal = pickStickerTotal;
        pickStickerTotal = unpickStickerTotal + sticker[i];
        unpickStickerTotal = max(previousPickStickerTotal, unpickStickerTotal);
    }

    return max(answer, max(pickStickerTotal, unpickStickerTotal));
}