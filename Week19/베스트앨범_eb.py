from collections import defaultdict

def solution(genres, plays):
    answer = []
    
    # 장르별 합 딕셔너리
    genre_sum = defaultdict(int)
    
    for genre, play in zip(genres, plays):
        genre_sum[genre] += play
        
    sorted_genres = sorted(
        genre_sum.items(),
        key=lambda x: x[1], # 재생횟수로 
        reverse=True # 내림차순
    )
    
    songs = defaultdict(list)

    # enumerate idx 같이 꺼냄 
    for idx, (genre, play) in enumerate(zip(genres, plays)): 
        songs[genre].append((play, idx))
    # defaultdict(<class 'list'>, {'classic': [(500, 0), (150, 2), (800, 3)], 'pop': [(600, 1), (2500, 4)]})
    
    for genre in songs:
        songs[genre].sort(key=lambda x: (-x[0], x[1])) # - 내림차순
        
    for genre, _ in sorted_genres:
        for play, idx in songs[genre][:2]:
            answer.append(idx)
    return answer