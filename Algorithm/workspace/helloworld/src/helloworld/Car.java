package helloworld;

public class Car {
	
	// instance variable
	public static String color;
	public int speed;
	public String name;
	
	// class variable
	public static int numberWheel = 4;
	
	public void accel(int x) {
		this.speed += x;
	}
	
	public void print() {
		System.out.println(this.name + " " + Car.color + " " + this.speed);
	}
}
