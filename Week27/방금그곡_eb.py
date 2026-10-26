def convert(s):
    for sharp, one in [('C#', 'c'), ('D#', 'd'), ('F#', 'f'), ('G#', 'g'), ('A#', 'a'), ('B#', 'b')]:
        s = s.replace(sharp, one)
    return s

def solution(m, musicinfos):
    answer = []
    m = convert(m)
    for music in musicinfos:
        start, end, title, 음 = music.split(",")
        음 = convert(음)
        start_hour, start_min = start.split(":")
        end_hour, end_min = end.split(":")
        재생시간 = (int(end_hour) * 60 + int(end_min)) - (int(start_hour) * 60 + int(start_min))
        full_악보 = ''
        for i in range(재생시간):
            full_악보 += 음[i % (len(음))]
        
        if m in full_악보:
            answer.append([재생시간, title])
        answer.sort(key=lambda t: t[0], reverse=True)
        
    if not answer:
        return "(None)"
    return answer[0][1]
