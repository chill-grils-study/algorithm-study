#include <string>
#include <vector>
#include <unordered_map>
#include <queue>

using namespace std;

// 너무 복잡하게 풀었나..? 머쓱타드 ^^;;

// 우선순위 큐 비교함수
struct Compare {
    bool operator()(pair<int, int> a, pair<int, int> b) {
       // 재생횟수 같으면 고유번호 오름차순
        if(a.first == b.first) {
            return a.second > b.second;
        } // 재생횟수 내림차순
        return a.first < b.first;
    }
};

vector<int> solution(vector<string> genres, vector<int> plays) {
    const int SIZE = genres.size();
    // 장르별로 각 노래의 재생횟수와 번호를 저장
    unordered_map<string, priority_queue<pair<int, int>, vector<pair<int, int>>, Compare>> 장르별노래모음;
    // 장르별 총 재생횟수 저장
    unordered_map<string, int> 장르별총재생횟수;
    vector<int> answer;
    
    for(int i = 0; i < SIZE; i++) {
        string genre = genres[i];
        int play = plays[i];
        
        장르별노래모음[genre].push({play, i});
        장르별총재생횟수[genre] += play;
    }
    // 장르 횟수 내림차순으로 정렬
    priority_queue<pair<int, string>> 장르재생횟수순위;
    
    for(auto 장르재생횟수 : 장르별총재생횟수) {
        장르재생횟수순위.push({장르재생횟수.second, 장르재생횟수.first});
    }
    
    while(!장르재생횟수순위.empty()) {
        auto 현재장르 = 장르재생횟수순위.top();
        // 현재 장르의 곡이 1개밖에 없다면 1곡만 실음, 아니면 2곡
        int endCount = 장르별노래모음[현재장르.second].size() == 1 ? 1 : 2;
        // 현재 장르에서 가장 많이 재생된 곡 1 or 2곡 실음
        for(int i = 0; i < endCount; i++) {
            answer.push_back(장르별노래모음[현재장르.second].top().second);
            장르별노래모음[현재장르.second].pop();
        }
        장르재생횟수순위.pop();
    }
    
    return answer;
}