class Solution {
    public String toLowerCase(String s) {
        StringBuilder sb = new StringBuilder("");
        for(int i = 0; i < s.length(); i++){
            char c = s.charAt(i);
            if(c >= 'A' && c <= 'Z'){
                char ch = Character.toLowerCase(c);
                sb.append(ch);
                continue;
            }
            sb.append(c);
        }
        return sb.toString();
    }
}