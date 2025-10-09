function 능력치계산(team) {
  const halfN = N / 2;
  let 능력치 = 0;

  for (let i = 0; i < halfN - 1; i++) {
    for (let j = i + 1; j < halfN; j++) {
      능력치 += S[team[i]][team[j]] + S[team[j]][team[i]];
    }
  }

  return 능력치;
}

function solution(N, S) {
  const startTeamMap = new Map();
  let minDiff = Infinity;

  for (let i = 0; i < N; i++) {
    startTeamMap.set(i, false);
  }

  function 팀분배(currentStartTeam, startIndex) {
    if (currentStartTeam.length === N / 2) {
      const linkTeam = [];
      startTeamMap.forEach((value, key) => {
        if (!value) {
          linkTeam.push(key);
        }
      });

      minDiff = Math.min(
        minDiff,
        Math.abs(능력치계산(currentStartTeam) - 능력치계산(linkTeam))
      );
    }

    for (let i = startIndex; i < N; i++) {
      if (!startTeamMap.get(i)) {
        startTeamMap.set(i, true);
        팀분배([...currentStartTeam, i], i);
        startTeamMap.set(i, false);
      }
    }
  }

  팀분배([], 0);

  console.log(minDiff);
}
