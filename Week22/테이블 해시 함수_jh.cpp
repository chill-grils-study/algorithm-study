#include <string>
#include <vector>
#include <algorithm>

using namespace std;

// 쉽다..! 그냥 지시사항에 나온대로 구현했어요.
int solution(vector<vector<int>> data, int col, int row_begin, int row_end) {
    const int ROWS = data.size();
    const int COLUMNS = data[0].size();
    int standardCol = col - 1;
    int answer = 0;
    
    sort(data.begin(), data.end(), [standardCol](vector<int> a, vector<int> b) {
        if(a[standardCol] == b[standardCol]) {
            return a[0] > b[0];
        }
        return a[standardCol] < b[standardCol];
    });
    
    for(int i = row_begin - 1; i <= row_end - 1; i++) {
        int sum = 0;
        for(int j = 0; j < COLUMNS; j++) {
            sum += data[i][j] % (i + 1);
        }
        answer ^= sum;
    }
    
    return answer;
}