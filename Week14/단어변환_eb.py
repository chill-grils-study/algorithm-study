from collections import deque
def solution(begin, target, words):
    answer = 0
    if target not in words:
        return answer
    visited = {word: False for word in words}

    def bfs():
        q = deque([(begin, 0)])

        while q:
            current_word, change_cnt = q.popleft()

            if current_word == target:
                return change_cnt

            for word in words:
                if not visited[word] and findCanChange(word, current_word):
                    visited[word] = True
                    q.append((word, change_cnt + 1))

        return 0

    return bfs()

def findCanChange(word1, word2):
    diff = 0

    for i in range(len(word1)):
        if word1[i] != word2[i]:
            diff += 1

    return diff == 1