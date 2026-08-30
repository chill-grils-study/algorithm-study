#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 쉽다..! 그냥 지시사항에 나온대로 구현했어요.
int solution(vector<vector<int>> data, int col, int row_begin, int row_end) {
    const int ROWS = data.size();
    const int COLUMNS = data[0].size();
    vector<int> results;
    int standardCol = col - 1;
    int answer = 0;
    
    sort(data.begin(), data.end(), [standardCol](vector<int> a, vector<int> b) {
        if(a[standardCol] == b[standardCol]) {
            return a[0] > b[0];
        }
        return a[standardCol] < b[standardCol];
    });
    
    for(int i = 0; i < ROWS; i++) {
        int sum = 0;
        if(i >= row_begin - 1 && i <= row_end - 1) {
            for(int j = 0; j < COLUMNS; j++) {
                sum += data[i][j] % (i + 1);
            }
            results.push_back(sum);
        }
    }
    
    for(int result : results) {
        // XOR 연산자가 있더군.
        answer ^= result;    
    }
    
    return answer;
}