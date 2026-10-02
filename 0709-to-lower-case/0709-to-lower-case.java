class Solution {
    public String toLowerCase(String s) {
        StringBuilder sb = new StringBuilder("");
        for(int i = 0; i < s.length(); i++){
            char c = s.charAt(i);
            if(c >= 'A' && c <= 'Z'){
                int ch = c + 32;
                char ch2 = (char) ch;
                sb.append(ch2);
                continue;
            }
            sb.append(c);
        }
        return sb.toString();
    }
}