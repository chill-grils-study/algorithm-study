import sys
input = sys.stdin.readline

def check_winner(board, player):
    # 가로
    for i in range(3):
        if board[i][0] == player and board[i][1] == player and board[i][2] == player:
            return True

    # 세로
    for i in range(3):
        if board[0][i] == player and board[1][i] == player and board[2][i] == player:
            return True

    # 대각선
    if board[0][0] == player and board[1][1] == player and board[2][2] == player:
        return True

    if board[0][2] == player and board[1][1] == player and board[2][0] == player:
        return True

    return False


while True:
    row = input().strip()

    if row == 'end':
        break

    x_cnt = row.count('X')
    o_cnt = row.count('O')

    if x_cnt < o_cnt or x_cnt > o_cnt + 1:
        print('invalid')
        continue

    # board 만들기
    board = []
    for i in range(3):
        temp = []
        for j in range(3):
            temp.append(row[i*3 + j])
        board.append(temp)

    x_win = check_winner(board, 'X')
    o_win = check_winner(board, 'O')

    if x_win and o_win:
        print('invalid')
        continue

    if o_win and x_cnt != o_cnt:
        print('invalid')
        continue

    if x_win and x_cnt != o_cnt + 1:
        print('invalid')
        continue

    if not x_win and not o_win:
        if x_cnt + o_cnt != 9:
            print('invalid')
            continue

    print('valid')

######################################
import sys
input = sys.stdin.readline

def win(row, c):
    return (
        (row[0]==row[1]==row[2]==c) or
        (row[3]==row[4]==row[5]==c) or
        (row[6]==row[7]==row[8]==c) or
        (row[0]==row[3]==row[6]==c) or
        (row[1]==row[4]==row[7]==c) or
        (row[2]==row[5]==row[8]==c) or
        (row[0]==row[4]==row[8]==c) or
        (row[2]==row[4]==row[6]==c)
    )

while True:
    row = input().strip()
    if row == 'end':
        break

    x = row.count('X')
    o = row.count('O')

    if x < o or x > o + 1:
        print('invalid')
        continue

    x_win = win(row, 'X')
    o_win = win(row, 'O')

    if x_win and o_win:
        print('invalid')
    elif x_win and x == o + 1:
        print('valid')
    elif o_win and x == o:
        print('valid')
    elif not x_win and not o_win and x + o == 9:
        print('valid')
    else:
        print('invalid')
