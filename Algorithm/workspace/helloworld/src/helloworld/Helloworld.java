package helloworld;

public class Helloworld {
	
	public static int sum(int a, int b) {
		return a + b;
	}
	
	public static int nsum(int n) {
		int result = 0;
		
		for(int i = 1; i <= n; i++) {
			result = result + i;
		}
		
		return result;
	}
	
	public static void sayHello(int n) {
		for(int i = 0; i < n; i++) {
			System.out.println("Hello");
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Car c1 = new Car();
		Car c2 = new Car();
		
		c1.name = "Mirai";
		//c1.color = "Red";
		Car.color = "Red";
		c2.name = "BMW";
		
		c1.accel(10);
		c1.print();
		c2.print();
		
	}

}
