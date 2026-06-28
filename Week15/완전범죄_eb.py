def solution(info, n, m):
    states = {(0, 0)}

    for a_cost, b_cost in info:
        next_states = set()

        for a, b in states:

            # A가 훔침
            if a + a_cost < n:
                next_states.add((a + a_cost, b))

            # B가 훔침
            if b + b_cost < m:
                next_states.add((a, b + b_cost))

        states = next_states

    if not states:
        return -1

    return min(a for a, b in states)