#include <iostream>
#include <map>
#include <vector>
#include <math.h>

// 슬라이딩 윈도우
// 시간복잡도: O(N)
// 공간복잡도: O(N)
using namespace std;
int main() {
    int T;

    cin >> T;

    for(int i = 0; i < T; i++) {
        string W;
        int K;

        cin >> W;
        cin >> K;

        map<char, vector<int>> charInfo;

        // 각 문자열이 등장하는 인덱스를 배열로 저장
        for(int i = 0; i < W.size(); i++) {
            char current = W[i];
            if(charInfo.find(current) != charInfo.end()) {
                charInfo[current].push_back(i);
            } else {
                charInfo[current] = {i};
            }
        }

        int shortLength = 10001, longLength = -1;

        for(auto& [key, vec]: charInfo) {
            // 처음 풀 때 K를 고려하지 않고 품;; 당연히 틀렷죠?ㅋ
            // int lastIndex = vec.size() - 1;
            // for(int i = 0; i < lastIndex; i++) {
            //     shortLength = min(shortLength, vec[i + 1] - vec[i]);
            // }
            // longLength = max(longLength, vec[lastIndex] - vec[0]);

            int size = vec.size();
            // 해당 문자 등장 횟수가 K보다 작다면 게임을 진행할 수 없음
            if(size < K) {
                continue;
            }

            for(int i = 0; i <= size - K; i++) {
                // 조건을 만족하는 문자열들의 길이를 구하고 최대/최소값 갱신
                // 어떤 문자를 정확히 K개를 포함하는 가장 짧은 연속 문자열 = 첫 번째와 마지막 글자가 해당 문자일 수 밖에 없음
                // 예시: abbabbba
                shortLength = min(shortLength, vec[i + K - 1] - vec[i]);
                longLength = max(longLength, vec[i + K - 1] - vec[i]);
            }
        }


        if(longLength == -1) {
            cout << -1 << '\n';
        } else {
            cout << shortLength + 1 << " " << longLength + 1 << '\n';
        }
    }

    return 0;
}
