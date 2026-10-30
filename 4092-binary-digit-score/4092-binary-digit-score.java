class Solution {
    public int calculateScore(int a, int b) {
        String str1 = Integer.toBinaryString(a);
        String str2 = Integer.toBinaryString(b);
        int i=0,j=0,s1=0,s2=0;
        while(i<str1.length() || j<str2.length()){
            if(i<str1.length() && str1.charAt(i)=='1'){
                s1++;
            }
            if(j<str2.length() && str2.charAt(j)=='1'){
                s2++;
            }
            i++;
            j++;
        }
        if(s1>=s2){
            return s1*s2;
        }
        return s2/s1;
    }
}