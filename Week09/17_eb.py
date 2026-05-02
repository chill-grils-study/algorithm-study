class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        answer = []
        
        if not digits: 
            return []

        mapping = {
            '2': "abc",
            '3': "def",
            '4': "ghi",
            '5': "jkl",
            '6': "mno",
            '7': "pqrs",
            '8': "tuv",
            '9': "wxyz"
        }

        def dfs(index, combo):
            if index == len(digits):
                answer.append(combo)
                return
            
            current = digits[index]
            for char in mapping[current]:
                dfs(index + 1, combo + char)

        dfs(0, "")
        return answer 