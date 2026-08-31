def solution(users, emoticons):
    answer = [0, 0] # 가입자수, 매출
    discount_rates = [10, 20, 30, 40]
    selected = [0] * len(emoticons)

    def dfs(current):
        # 모든 이모티콘의 할인율을 결정한 경우
        if current == len(emoticons):
            joiner = 0
            profit = 0

            # 모든 사용자 확인
            for user_rate, user_price in users:
                total = 0

                # 모든 이모티콘의 구매 금액 계산
                for i in range(len(emoticons)):
                    if selected[i] >= user_rate:
                        price = emoticons[i] * (100 - selected[i]) // 100
                        total += price

                # 이모티콘 플러스 가입 여부
                if total >= user_price:
                    joiner += 1
                else:
                    profit += total

            # 가입자 수 > 매출
            if joiner > answer[0]:
                answer[0] = joiner
                answer[1] = profit
            elif joiner == answer[0] and profit > answer[1]:
                answer[0] = joiner
                answer[1] = profit

            return

        # 현재 이모티콘의 할인율을 4가지 중 하나로 선택
        for discount in discount_rates:
            selected[current] = discount
            dfs(current + 1)

    dfs(0)

    return answer
