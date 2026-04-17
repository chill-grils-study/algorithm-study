#include <iostream>
using namespace std;

// 항상 상대방을 불리하게 만드는 선택을 한다.
// 근데 사실 이거 완벽하게 이해 안 됐음 ..^^
int main() {
    long long N;

    while (cin >> N) {
        long long p = 1;
        bool baekjoonTurn = true; 

        while (true) {
            // 백준은 동혁이가 이기는걸 막기 위해 9를 곱해야 하고
            if (baekjoonTurn) {
                p *= 9;
            } else { // 동혁이는 백준이 이기는걸 막기 위해 2를 곱한다.
                p *= 2;
            }

            if (p >= N) {
                if (baekjoonTurn) {
                    cout << "Baekjoon wins.\n";
                } else {
                    cout << "Donghyuk wins.\n";
                }
                break;
            }

            baekjoonTurn = !baekjoonTurn;
        }
    }

    return 0;
}