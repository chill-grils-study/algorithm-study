function solution(N, meeting) {
  let prevEndTime = 0;
  let count = 0;

  meeting.sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

  for (const [startTime, endTime] of meeting) {
    if (startTime >= prevEndTime) {
      count++;
      prevEndTime = endTime;
    }
  }

  return count;
}
