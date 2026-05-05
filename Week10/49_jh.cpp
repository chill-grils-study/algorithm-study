#include <vector>
#include <string>
#include <map>

using namespace std;

// 초기 풀이, ㅎ 나름 창의적이라고 생각했는데 틀리더라구~
// vector<vector<string>> groupAnagrams(vector<string>& strs) {
//     map<string, vector<string>> anagrams;
//     vector<vector<string>> result;
//     for(string str : strs) {
//         double total = 0;
//         double multiple = 1;
//         for(char ch : str) {
//             double asciiCode = (int)ch - (int)'a';
//             total += asciiCode;
//             multiple *= asciiCode;
//         }
//         string key = to_string(total) + to_string(multiple);
//         if(anagrams.find(key) == anagrams.end()) {
//             anagrams.insert({key, {str}});
//         } else {
//             anagrams[key].push_back(str);
//         }
//     }
//     for(auto anagram : anagrams) {
//         result.insert(result.end(), anagram.second);
//     }
//     return result;
// }

// 두번째 풀이
// map의 key 생성하는 방법을 바꿨음
// 통과는 하지만 개느림..
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    map<string, vector<string>> anagrams;
    vector<vector<string>> result;
    const int alphabetCount = (int)'z' - (int)'a' + 1;
    for(string str : strs) {
        // 각 문자의 개수를 세기 위한 배열
        vector<int> counts(alphabetCount, 0);
        string key = "";
        for(char ch : str) {
            counts[ch - 'a']++;
        }
        // "abbc" -> "01-12-21"
        for(int i = 0; i < alphabetCount; i++) {
            key += to_string(i) + to_string(counts[i]) + '-';
        }
        if(anagrams.find(key) == anagrams.end()) {
            anagrams.insert({key, {str}});
        } else {
            anagrams[key].push_back(str);
        }
    }
    for(auto anagram : anagrams) {
        result.insert(result.end(), anagram.second);
    }
    return result;
}

// 허무하다.. 이렇게 문자 정렬해서 키 만들어도 된대요..
// 시간복잡도: O(n * k log k)
// 공간복잡도: O(n * k)
// 하긴 근데 str 최대 길이가 100이니까 충분히 가능하겠네...
vector<vector<string>> groupAnagrams(vector<string>& strs) {
    map<string, vector<string>> anagrams;
    vector<vector<string>> result;

    for(string& str : strs) {
        string key = str;
        sort(key.begin(), key.end());
        anagrams[key].push_back(str);
    }

    for(auto anagram : anagrams) {
        result.insert(result.end(), anagram.second);
    }

    return result;
}