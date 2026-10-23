from collections import defaultdict

def solution(k, tangerine):
    answer = []
    div = defaultdict(int)
    
    for tan in tangerine:
        div[tan] += 1
    current = 0
    for key, value in sorted(div.items(), key=lambda t: t[1], reverse=True):
        current += value
        answer.append(key)
        if current >= k:
            break
        
    return len(answer)
