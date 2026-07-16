#include <string>
#include <vector>
#include <utility>
#include <stack>

using namespace std;

// 처음에 막막했는데 재귀로 풀면 되는거였슨
bool 올바른괄호여부(string p) {
    stack<char> s;
    
    for(char ch : p) {
        if(ch == '(') {
            s.push(ch);
        } else {
            if(!s.empty() && s.top() == '(') {
                s.pop();
            }
        }
    }
    
    return s.empty();
}

// u, v로 쪼개주는 함수
pair<string, string> split(string origin) {
    const int length = origin.length();
    int leftCnt = 0, rightCnt = 0;
    int index = length - 1;
    
    for(int i = 0; i < length; i++) {
        if(origin[i] == '(') {
            leftCnt++;
        } else {
            rightCnt++;
        }
        if(leftCnt == rightCnt) {
            index = i;
            break;
        }
    }

    return {origin.substr(0, index + 1), origin.substr(index + 1)};
}

string 올바른괄호문자열만들기(string w) {
    if(w == "") {
        return w;
    }
    
    auto [u, v] = split(w);
    
    if(올바른괄호여부(u)) {
        return u + 올바른괄호문자열만들기(v);
    } else {
        string result = "(" + 올바른괄호문자열만들기(v) + ")";
        
        for(int i = 1; i < u.length() - 1; i++) {
            result += u[i] == '(' ? ')' : '(';
        }
        
        return result;
    }
}

string solution(string p) {
    string answer = "";
    
    if(올바른괄호여부(p)) {
        return p;
    }
    
    return 올바른괄호문자열만들기(p);
}