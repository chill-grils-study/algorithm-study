/**
 * @param {number[]} nums
 * @return {number}
 */
// var wiggleMaxLength = function(nums) {
//     const dp = new Array(nums.length).fill(0);

//     let m = -1;
    
//     dp[0] = 1;
//     m = minus(nums[0],nums[1]);
//     dp[1] = m===0?dp[0]:dp[0]+1;
//     //dp[1] = minus(num[0],num[1])>0 양수이면 m = 1, dp[0]+1
//     //minus(num[0],num[1])<0 음수이면 m = -1 dp[0]+1
//     // =0이면 dp[1]=dp[0]
//     //dp[2] = m 이랑 minus(dp[1],dp[2])랑 달라야함 -> 곱해서 -1 이면 dp[1]+1 아니면 dp[1] 최대값 전에거랑 동일한거 하면 m 동일 다르면 m * -1 = m;

//     for(let i=2;i<nums.length;i++){
//         let result = 0; 
//         if(minus(nums[i-1],nums[i])===0){
//             dp[i] = dp[i-1];
//             continue;
//         }
//         if((m===0&&minus(nums[i-1],nums[i])!==0)|| minus(nums[i-1],nums[i])*m < 0)//흔들림 수열이면,
//             result = dp[i-1]+1;
//         if(result<dp[i-1]){ //앞에 수열이 길이가 더 길면 m 그대로
//             result = dp[i-1];
//         }else{ //result가 더 길면
//             m  = m* -1;
//         }
//         dp[i] = result;
//     }
//     console.log(dp)
//     return dp[nums.length-1];
// };

//그리디? dp?

var wiggleMaxLength = function(nums) {

    if(nums.length === 1) return 1;
    let up = 1;
    let down = 1;
    for(let i = 1; i < nums.length; i++){
        // 현재 차이가 양수
        if(nums[i] > nums[i-1]){
            up = down + 1;
        }
        // 현재 차이가 음수
        else if(nums[i] < nums[i-1]){
            down = up + 1;
        }
        // 같으면 아무것도 안함
    }

    return Math.max(up, down);

};

// function minus(a,b){
//     if(a<b) return -1;
//     else if(a>b) return 1;
//     else return 0;
// }