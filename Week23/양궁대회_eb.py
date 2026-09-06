def solution(n, info):
    best_result = 0           
    best_result_arr = []
    can_shoot = sum(info)
    selected = [0] * 11
    def dfs(idx, remain):
        nonlocal best_result, best_result_arr
        if idx == 10:
            selected[10] = remain
            result = cal(selected)
            if best_result < result or (best_result == result and selected[::-1] > best_result_arr[::-1]):
                best_result = result
                best_result_arr = selected[:]
        return
        
        # 현재 점수에서 안 이기려고 할 때 
        selected[idx] = 0
        dfs(idx + 1, remain)
        
        # 현재 점수에서 이기려고 할 때 
        need_win = info[idx] + 1
        if remain >= need_win:
            selected[idx] = need_win
            dfs(idx + 1, remain - need_win)
            
    def cal(selected):
        p_win = 0
        l_win = 0
        for idx, (p, l) in enumerate(zip(info, selected)):
            if p == 0 and l == 0:
                continue
            if p >= l:
                p_win += 10 - idx
            else:
                l_win += 10 - idx
        return l_win - p_win
    
    dfs(0, can_shoot)
    
    if best_result > 0:
        return best_result_arr
    else:
        return [-1]
