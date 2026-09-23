class Solution {
    public String sortSentence(String s) {
        String [] parts = s.split(" ");
        StringBuilder sb = new StringBuilder("");
        int len = parts.length;
        String [] sortedPart = new String[len];
        for(int i = 0; i<len; i++){
            int n = parts[i].length();
            int index = parts[i].charAt(n-1)-'0';
            sortedPart[index-1] = parts[i].substring(0,n-1);
        }
        for(int i = 0; i<len; i++){
            if( i==0){
                sb.append(sortedPart[i]);
            }else{
                sb.append(" " + sortedPart[i]);
            }  
        }
        return sb.toString();
    }
}