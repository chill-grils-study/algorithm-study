#include <string>
#include <vector>
#include <queue>
#include <utility>

using namespace std;

int bfs(string begin, string target, vector<string> words) {
    const int N = words.size();
    const int wordLength = begin.length();
    vector<bool> visited(N, false);
    queue<pair<string, int>> wordQ;
    int result;
    
    wordQ.push({begin, 0});
    
    while(!wordQ.empty()) {
        auto [curWord, curDepth] = wordQ.front();
        
        if(curWord == target) {
            result = curDepth;
            break;
        }
        
        wordQ.pop();
        
        for(int i = 0; i < N; i++) {
            int matchCnt = 0;
            
            if(visited[i]) {
               continue; 
            }
            
            for(int j = 0; j < wordLength; j++) {
                if(curWord[j] == words[i][j]) {
                    matchCnt++;
                }
            }
            
            if(matchCnt == wordLength - 1) {
                wordQ.push({words[i], curDepth + 1});
                visited[i] = true;
            }
        }
    }
    
    return result;
}

int solution(string begin, string target, vector<string> words) {
    bool hasTarget = false;
    
    for(string word : words) {
        if(word == target) {
            hasTarget = true;
            break;
        }
    }
    
    if(!hasTarget) {
        return 0;
    }
    
    int answer = bfs(begin, target, words);
    
    return answer;
}