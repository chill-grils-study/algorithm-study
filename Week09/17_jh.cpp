#include <vector>
#include <string>

using namespace std;

class Solution {
public:
    vector<string> telephone = {
        "", "",
        "abc", "def", "ghi",
        "jkl", "mno",
        "pqrs", "tuv", "wxyz"
    };
    vector<string> result;
    bool visited[10][4] = {false};

    void backtracking(int curIndex, string curStr, string digits) {
        if(curIndex == digits.length()) {
            result.push_back(curStr);
            return;
        }

        int telephoneIndex = digits[curIndex] - '0';

        for(int j = 0; j < telephone[telephoneIndex].length(); j++) {
            if(!visited[curIndex][j]) {
                visited[curIndex][j] = true;
                backtracking(curIndex + 1, curStr + telephone[telephoneIndex][j], digits);
                visited[curIndex][j] = false;
            }
        }
    }

    vector<string> letterCombinations(string digits) {
        backtracking(0, "", digits);

        return result;
    }
};