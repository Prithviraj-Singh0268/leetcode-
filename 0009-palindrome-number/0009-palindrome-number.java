class Solution {
    public boolean isPalindrome(int x) {
        if(x<0){
            return false;
        }
        int t = x;
        int rev  = 0;
        while(t>0){
            int dig = t%10;
            rev = rev*10 + dig;
            t=t/10; 
        }
        if(rev ==  x){
            return true;
        }else{
            return false;
        }
    }
}