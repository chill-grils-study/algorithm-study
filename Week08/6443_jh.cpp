#include <iostream>
#include <algorithm>
#include <vector>
#include <set>

using namespace std;

set<string> result;
string word;
int wordSize;

// 시간복잡도: O(wordSize! * wordSize)
// 공간복잡도: O(wordSize * wordSize!)
void backtracking(string currentWord, int size, vector<bool> visited) {
    if(size == wordSize) {
        result.insert(currentWord);
        return;
    }

    // 첫번째 풀이.
    // 그냥 set에 저장해서 중복 제거하려고 했는데 시간초과 발생
    // 시간 초과 해결하려면 애초에 중복을 만들지 말아야 한다. 
    // for(int i = 0; i < wordSize; i++) {
    //     if(!visited[i]) {
    //         visited[i] = true;
    //         backtracking(currentWord + word[i], size + 1, visited);
    //         visited[i] = false;
    //     }
    // }


    // 두번째 풀이
    // 사실 지피티한테 물어봤음 ㅎ
    for(int i = 0; i < wordSize; i++) {
        // 애초에 같은 문자열 조합은 하나만 만든다.
        // 앞에 있는 문자를 아직 방문하지 않았다 => 첫 탐색이 아니다
        // 예시: aaabcd -> 두번째 a부터 조합하는 경우는 확인하지 않아도 됨
        if(visited[i] || (i > 0 && word[i] == word[i - 1] && !visited[i - 1])) {
          continue;
        }

        visited[i] = true;
        backtracking(currentWord + word[i], size + 1, visited);
        visited[i] = false;
    }

    return;
}

int main() {
    int N;

    cin >> N;

    while(N--) {
        cin >> word;

        wordSize = word.size();

        sort(word.begin(), word.end());
        result.clear();

        vector<bool> visited(wordSize, false);

        backtracking("", 0, visited);

        for(auto item: result) {
            cout << item << '\n';
        }
    }

    return 0;
}
