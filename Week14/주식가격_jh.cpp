#include <vector>
#include <stack>
#include <utility>

using namespace std;

// 오랜만에 기분 좋게 풀었네요..^^
// 스택에 주식 가격이랑 인덱스 쌓아두고 가격 떨어지면 pop하기
vector<int> solution(vector<int> prices) {
    const int N = prices.size();
    stack<pair<int, int>> s;
    vector<int> answer(N, 0);
    
    for(int i = 0; i < N; i++) {
        int curPrice = prices[i];
        while(!s.empty() && s.top().first > curPrice) {
            auto [topPrice, topIndex] = s.top();
            answer[topIndex] = i - topIndex;
            s.pop();
        }
        s.push({curPrice, i});
    }
    
    while(!s.empty()) {
        auto [topPrice, topIndex] = s.top();
        answer[topIndex] = N - topIndex - 1;
        s.pop();
    }
    
    return answer;
}