#include <string>
#include <vector>
#include <unordered_map>
#include <iostream>

using namespace std;

// 첫번째 풀이
// 문제를 제대로 안 읽었다죠...?ㅋ 
// az -> ba가 되어야 하는데..?
// az -> bz가 되도록 짰음
// 그리고 지피티가 어차피 이렇게 풀면 절대 못 맞춘다고 날 도발함
string solution(long long n, vector<string> bans) {
    unordered_map<string, bool> mappedBans;
    string answer = "a";
    int cLength = 1, cDigits = 0;
    long long cNum = 0;
    
    for(string ban : bans) {
        mappedBans[ban] = true;
    }
    
    while(true) {
        if(mappedBans.find(answer) == mappedBans.end()) {
            cNum++;
        }
        cout << answer << " " << cNum << '\n';
        
        if(cNum == n) {
            break;
        }
        if(answer[cDigits] == 'z') {
            if(cDigits == 0) {
                cLength++;
                cDigits = cLength - 1;
                answer = string(cLength, 'a');
                continue;
            } else {
                cDigits--;
            }
        }
        answer[cDigits] = (char)((int)(answer[cDigits]) + 1);
    }
    
    return answer;
}

// 결국 피티의 도움을 받아버렸다.. ^^ㅠ;;...샤갈!
string solution(long long n, vector<string> bans) {
    const int alphabetCount = (int)'z' - (int)'a' + 1;
    vector<long long> bansNum;
    string answer = "";
    
    for(string ban : bans) {
        long long num = 0;
        // abc의 순번을 계산해보면 다음과 같음
        // abc = 26^2 * 1 + 26^1 * 2 + 26^0 * 3
        // => 26진수로 변환하면 됨!
        for(char ch : ban) {
            // 쉽게 n진수로 변환하는 방법
            // num = num * n + digit
            num = num * alphabetCount + ((int)ch - (int)'a' + 1);
        }
        
        bansNum.push_back(num);
    }
    // 26진수로 변환된 순번을 오름차순 정렬
    // 정렬 한 뒤에 앞에서부터 확인해야 문자열 제거한 뒤에 정확한 순번을 알 수 있음
    sort(bansNum.begin(), bansNum.end());
    
    for(long long num : bansNum) {
        if(num <= n) {
            n++;
        }
    }
    // 26진수를 다시 알파벳으로 변환
    while(n > 0) {
        // n = 26일 때 remainder가 0이 되는 상황들을 피하기 위해 1 빼줌
        n--;
        
        int remainder = n % alphabetCount;
        
        answer = (char)(remainder + (int)'a') + answer;
        n /= alphabetCount;
    }
    
    return answer;
}