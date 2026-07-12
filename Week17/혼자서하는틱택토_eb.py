
def isWin(board, target):
  for i in range(3):
      if board[i][0] == board[i][1] == board[i][2] == target:
          return True
      if board[0][i] == board[1][i] == board[2][i] == target:
          return True

  if board[0][0] == board[1][1] == board[2][2] == target:
      return True

  if board[0][2] == board[1][1] == board[2][0] == target:
      return True

  return False
# 개수 조건
# O == X 또는 O == X + 1
# O와 X가 동시에 승리하면 불가능
# O가 승리했다면 O == X + 1
# X가 승리했다면 O == X
def solution(board):
    o = sum(row.count('O') for row in board)
    x = sum(row.count('X') for row in board)

    oWin = isWin(board, 'O')
    xWin = isWin(board, 'X')

    if o < x or o > x + 1:
        return 0

    if oWin and xWin:
        return 0

    if oWin and o != x + 1:
        return 0

    if xWin and o != x:
        return 0

    return 1