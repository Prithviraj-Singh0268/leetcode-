class Solution {
    public long maxPairStrength(int[] nums) {
        long max = 0;
        for(int i = 1; i<nums.length; i++){
            for(int j = 0; j<nums.length-1; j++ ){
                if(i==j  || i<j){continue;}
                long g = GCD(nums[i],nums[j]);
                long r = ((long)nums[i]*nums[j])/(g*g);
                if(r>max){
                    max=r;
                }
            }
        }
        return max;
    }
    public long GCD(long a , long b){
        if(b==0){
            return a ;
        }
        return GCD(b,a%b);
    }
}