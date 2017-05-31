
public class StringList {
	private String[] strList;
	
	public StringList(int n) {
		this.strList = new String[n];
	}
	
	public boolean empty() {
		for(int i = 0; i < this.strList.length; i++) {
			if(this.strList[i] == null) {
				return true;
			}
		}
		
		return false;
	}
	
	public int size() {
		return this.strList.length;
	}
	
	public String get(int index) {
		return this.strList[index];
	}
	
	public int indexOf(String s) {
		for(int i = 0; i < this.strList.length; i++) {
			if(this.strList[i] == s) {
				return i;
			}
		}
		
		return -1;
	}
	
	public void insert(String s) {
		for(int i = 0; i < this.strList.length; i++) {
			if(this.strList[i] == null) {
				this.strList[i] = s;
				break;
			}
		}
	}
	
	public String output() {
		return String.join(" ", this.strList);
	}
}
