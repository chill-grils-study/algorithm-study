#include <string>
#include <vector>
#include <map>

using namespace std;

map<string, string> parentNode;
map<string, int> profits;

// 그냥 노드를 계속 타고 올라가면서 검사하면 됨
void calcProfit(string startPerson, int profit) {
    string curPerson = startPerson;
    int remainProfit = profit;
    
    while(true) {
        // center에 도착했다면 반복문 중지
        if(curPerson == "-") {
            break;
        }

        int 나눠줄금액 = remainProfit * 0.1;
        // 나눠줄금액이 1보다 작으면 낼름 먹기
        if(나눠줄금액 < 1) {
            profits[curPerson] += remainProfit;
            break;
        }
        // 부모노드에 남겨줄 금액 제외하고 낼름 먹기
        profits[curPerson] += remainProfit - 나눠줄금액;
        remainProfit = 나눠줄금액;
        // 부모노드로 이동
        curPerson = parentNode[curPerson];
    }
}

vector<int> solution(vector<string> enroll, vector<string> referral, vector<string> seller, vector<int> amount) {
    const int ENROLL_SIZE = enroll.size();
    const int SELLER_SIZE = seller.size();
    vector<int> answer;
    
    for(int i = 0; i < ENROLL_SIZE; i++) {
        parentNode[enroll[i]] = referral[i];
    }
    
    for(int i = 0; i < SELLER_SIZE; i++) {
        calcProfit(seller[i], amount[i] * 100);
    }
    
    for(auto person : enroll) {
        // 판매자가 아니면 수익은 0
        if(profits.find(person) == profits.end()) {
            answer.push_back(0);
        } else { // 판매자의 수익 answer에 추가
            // enroll순으로 보여줘야되니까 이런 방법을 선택. 근데 더 좋은 방법이 있을듯
            answer.push_back(profits[person]);
        }
    }
    
    return answer;
}