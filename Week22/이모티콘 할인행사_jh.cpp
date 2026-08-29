#include <string>
#include <vector>
#include <math.h>

using namespace std;

// 오랜만에 혼자서 푼 문제 .. ^^ 아 달다 ...
// 제한사항 보고 무조건 완탐이겠다 생각함..
int maxNewUser = 0, maxSalesAmount = 0;

void dfs(vector<vector<int>> &users, vector<int> &emoticons, int emoticonSize, vector<int> sales) {
    if(sales.size() == emoticonSize) {
        int totalNewUser = 0, totalSalesAmount = 0;
        for(vector<int> user : users) {
            int discountRate = user[0];
            int standardPrice = user[1];
            double salesAmount = 0;

            for(int i = 0; i < emoticonSize; i++) {
                // 할인율이 높다면 구매
                if(sales[i] >= discountRate) {
                    salesAmount += emoticons[i] * ((100 - sales[i]) / 100.0);                    
                }
            }
            // 임티 플러스 구매 여부 결정
            if(salesAmount >= standardPrice) {
                totalNewUser++;
            } else {
                totalSalesAmount += salesAmount;
            }
        }
        // 이번 할인율 조합일 때 임티 플러스 구매자가 기존보다 많다면
        if(maxNewUser < totalNewUser) {
            maxNewUser = totalNewUser;
            maxSalesAmount = totalSalesAmount;
        } else if(maxNewUser == totalNewUser) { // 임티 플러스 구매자가 기존과 같다면
            // 이모티콘 구매액 최댓값만 갱신
            maxSalesAmount = max(maxSalesAmount, totalSalesAmount);
        }
        return;
    }
    
    // 할인율 조합 만들기
    // 각 이모티콘은 10, 20, 30, 40 할인 받을 수 있으니까
    // 배열에 차례대로 할인율 넣으면서 dfs 탐색
    for(int i = 1; i <= 4; i++) {
      if(i != 1) {
          sales.pop_back();
      }
      sales.push_back(10 * i);
      dfs(users, emoticons, emoticonSize, sales);
    }
}

vector<int> solution(vector<vector<int>> users, vector<int> emoticons) {
    dfs(users, emoticons, emoticons.size(), vector<int>());
    
    return {maxNewUser, maxSalesAmount};
}