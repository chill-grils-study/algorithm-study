function solution(n, roads, sources, destination) {
    const graph = Array.from({ length: n + 1 }, () => []);

    for (let i = 0; i < roads.length; i++) {
        const [n, m] = roads[i];
        graph[n].push(m);
        graph[m].push(n);
    }

    const dist = new Array(n + 1).fill(-1);
    const queue = [destination];
    dist[destination] = 0;

    while (queue.length) {
        const curr = queue.shift();
        
        for (let i = 0; i < graph[curr].length; i++) {
            const next = graph[curr][i];
            
            if (dist[next] === -1) {
                dist[next] = dist[curr] + 1;
                queue.push(next);
            }
        }
    }

    var answer = [];
    for (let i = 0; i < sources.length; i++) {
        answer.push(dist[sources[i]]);
    }

    return answer;
}
console.log(solution(3,[[1, 2], [2, 3]],[2, 3],1))
console.log(solution(5,[[1, 2], [1, 4], [2, 4], [2, 5], [4, 5]],[1, 3, 5]))
