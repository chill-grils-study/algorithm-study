#include <string>
#include <vector>
#include <math.h>

using namespace std;

const int MAX = 10000000;

// 풀이 다 똑같을 것 같음...
// 결국 블록에서 마지막에 남는 숫자는 해당 블록의 최대 약수(본인 제외)
int 약수구하기(long long n) {
    if(n == 1) {
        return 0;
    } else if(n == 2) {
        return 1;
    }
    // 약수 한쪽을 구하면 반대쪽도 구할 수 있기 때문에 제곱근까지만 나눠보면 됨
    // 16 = 2 8 / 4 4 / 8 2
    long long end = sqrt(n);
    int 약수 = 1;
    
    for(long long i = 2; i <= end; i++) {
        if(n % i == 0) {
            // 약수에 일단 i를 저장
            약수 = i;
            // 반대쪽 큰 약수가 정해진 범위 안에 있다면 정답
            if(n / i <= MAX) {
                약수 = n / i;
                break;
            }
        }
    }
    
    return 약수;
}

vector<int> solution(long long begin, long long end) {
    vector<int> answer;
    
    for(long long i = begin; i <= end; i++) {
        answer.push_back(약수구하기(i));
    }
    
    return answer;
}