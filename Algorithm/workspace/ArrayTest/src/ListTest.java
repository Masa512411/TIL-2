
public class ListTest {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		StringList sList = new StringList(10);
		
		System.out.println(sList.size());
		sList.insert("First");
		sList.insert("Second");
		System.out.println(sList.size());
		System.out.println(sList.get(0));
		System.out.println(sList.get(1));
		System.out.println(sList.get(2));
	}

}
