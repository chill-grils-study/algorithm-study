#include <string>
#include <vector>
#include <cctype>
#include <tuple>
#include <queue>

using namespace std;
// 성질 드러워질 것 같음 ㅡㅡ c++에서 문자열 문제 푸는건 너무 힘들다...

// 문자열 반복 함수
string repeat(string originStr, int num) {
    string result = "";
    
    for(int i = 0; i < num; i++) {
        result += originStr;
    }
    
    return result;
}
// A# -> a, B# -> b 샾이 붙은 음은 소문자로 변경
string replaceSharp(string originStr) {
    int n = originStr.length();
    string replacedStr;
    char prevChar = originStr[0];
    
    if(n == 1) {
        return originStr;
    }
    
    for(int i = 1; i < n; i++) {
        if(originStr[i] == '#') {
            replacedStr += (char)tolower(prevChar); 
        } else {
            if(prevChar != '#') {
                replacedStr += prevChar; 
            }
            if(i == n - 1) {
                replacedStr += originStr[i];
            }
        }
        prevChar = originStr[i];
    }
    
    return replacedStr;
}
// 시간은 분단위로 치환
int convertHourToMinute(string time) {
    int hour = stoi(time.substr(0, 2));
    int minute = stoi(time.substr(3));
    
    return hour * 60 + minute;
}
// split 내장 함수 없어서 만듬
vector<string> splitStr(string originStr, char ch) {
    vector<string> result;
    int prevIndex = 0;
    
    for(int i = 0; i < originStr.length(); i++) {
        if(originStr[i] == ch) {
            result.push_back(originStr.substr(prevIndex, i - prevIndex));
            prevIndex = i + 1;
        }
    }
    
    result.push_back(originStr.substr(prevIndex));
    
    return result;
}

string solution(string m, vector<string> musicinfos) {
    // 기본이 내림차순. 첫번째 값이 같으면 알아서 두번쨰 값 기준으로 비교
    priority_queue<tuple<int, int, string>> pq;
    string answer = "";
    string replacedM = replaceSharp(m);

    for(int i = 0; i < musicinfos.size(); i++) {
        vector<string> splitedMusicinfo = splitStr(musicinfos[i], ',');
      
        int startTime = convertHourToMinute(splitedMusicinfo[0]);
        int endTime = convertHourToMinute(splitedMusicinfo[1]);
        // 재생 시간
        int playTime = endTime - startTime;
        string title = splitedMusicinfo[2];
        string melody = replaceSharp(splitedMusicinfo[3]);
        string changedMelody = "";
        // 재생 시간이 노래보다 길다면
        if(melody.length() < playTime) {
            int quot = playTime / melody.length();
            int remainder = playTime % melody.length();
            // 노래를 반복 재생한다
            changedMelody = repeat(melody, quot);
            changedMelody += melody.substr(0, remainder);
        } else { // 재생 시간이 노래보다 짧다면 재생 시간만큼만 재생
            changedMelody = melody.substr(0, playTime);
        }
        // 재생된 멜로디에 네오가 들은 멜로디가 포함되어 있다면
        if(changedMelody.find(replacedM) != string::npos) {
            // 내림차순 정렬이기 때문에 인덱스는 음수로 저장
            // 재생시간, 인덱스, 제목
            pq.push({playTime, -i, title});
        }
    }
    // 큐가 비어있다면 조건에 맞는 음악이 없음, 비어있지 않다면 맨 위에 있는 음악이 정답
    return pq.empty() ? "(None)" : get<2>(pq.top());
}