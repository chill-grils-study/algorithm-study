#include <iostream>
#include <vector>
#include <string>
#include <map>

using namespace std;

// 첫번째 풀이
// 25%에서 시간 초과
bool compare(map<char, int> originCount, map<char, int> encryptedCount) {
    bool result = true;

    for(auto iter: originCount) {
        if(encryptedCount.find(iter.first) == encryptedCount.end() || encryptedCount[iter.first] != iter.second) {
            result = false;
            break;
        } 
    }

    return result;
}

int main() {
    int T;

    cin >> T;

    while(T--) {
        string password, encryptedPassword;

        cin >> encryptedPassword;
        cin >> password;

        map<char, int> originPasswordCount;
        map<char, int> encryptedPasswordCount;
        int size = password.size();

        for(int i = 0; i < size; i++) {
            char curPassword = password[i];
            char curEncryptedPassword = encryptedPassword[i];

            if(originPasswordCount.find(curPassword) == originPasswordCount.end()) {
                originPasswordCount.insert({curPassword, 1});
            } else {
                originPasswordCount[curPassword]++;
            }

            if(encryptedPasswordCount.find(curEncryptedPassword) == encryptedPasswordCount.end()) {
                encryptedPasswordCount.insert({curEncryptedPassword, 1});
            } else {
                encryptedPasswordCount[curEncryptedPassword]++;
            }
        }

        if(compare(originPasswordCount, encryptedPasswordCount)) {
            cout << "YES\n";
            continue;
        }

        int endIndex = encryptedPassword.size() - size;
        bool result = false;

        for(int i = 1; i <= endIndex; i++) {
            char newChar = encryptedPassword[i + size - 1];
            char prevChar = encryptedPassword[i - 1];

            if(encryptedPasswordCount.find(newChar) == encryptedPasswordCount.end()) {
                encryptedPasswordCount.insert({newChar, 1});
            } else {
                encryptedPasswordCount[newChar]++;
            }

            if(encryptedPasswordCount[prevChar] == 1) {
                encryptedPasswordCount.erase(prevChar);
            } else {
                encryptedPasswordCount[prevChar]--;
            }
            
            if(compare(originPasswordCount, encryptedPasswordCount)) {
                result = true;
                break;
            }
        }

        if(result) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }
    }

    return 0;
}

// 두번째 풀이
// map이 아닌 배열로 확인
// 시간복잡도: O(M)
// 공간복잡도: O(M + N)
// M: 암호화된 비밀번호 길이, N: 원래 비밀번호 길이
#include <iostream>
#include <vector>
#include <string>
#include <map>

using namespace std;

const int ALPHABET_COUNT = 26;

bool compare(int originCount[], int encryptedCount[]) {
    bool result = true;

    for(int i = 0; i < ALPHABET_COUNT; i++) {
        if(originCount[i] != encryptedCount[i]) {
            result = false;
            break;
        }
    }

    return result;
}

int main() {
    int T;

    cin >> T;

    while(T--) {
        string password, encryptedPassword;

        cin >> encryptedPassword;
        cin >> password;

        int originPasswordCount[ALPHABET_COUNT] = {0};
        int encryptedPasswordCount[ALPHABET_COUNT] = {0};
        int size = password.size();

        for(int i = 0; i < size; i++) {
            char curPassword = password[i];
            char curEncryptedPassword = encryptedPassword[i];

            originPasswordCount[curPassword - 'a']++;
            encryptedPasswordCount[curEncryptedPassword - 'a']++;
        }

        if(compare(originPasswordCount, encryptedPasswordCount)) {
            cout << "YES\n";
            continue;
        }

        int endIndex = encryptedPassword.size() - size;
        bool result = false;

        for(int i = 1; i <= endIndex; i++) {
            char newChar = encryptedPassword[i + size - 1];
            char prevChar = encryptedPassword[i - 1];

            encryptedPasswordCount[newChar - 'a']++;
            encryptedPasswordCount[prevChar - 'a']--;
            
            if(compare(originPasswordCount, encryptedPasswordCount)) {
                result = true;
                break;
            }
        }

        if(result) {
            cout << "YES\n";
        } else {
            cout << "NO\n";
        }
    }

    return 0;
}

