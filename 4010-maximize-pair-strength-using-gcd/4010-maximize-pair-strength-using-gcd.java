class Solution {
    public long maxPairStrength(int[] nums) {
        long max = 0;
        for(int i = 0; i<nums.length; i++){
            for(int j = i+1 ; j<nums.length; j++ ){
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
        while(b!=0){
            long t = b;
            b = a % b;
            a=t; 
        }
        return a;
    }
}