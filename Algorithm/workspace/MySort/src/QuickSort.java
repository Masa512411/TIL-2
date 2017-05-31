import java.util.Random;

public class QuickSort {
	
	public long start;
	public void start() {
		start = System.currentTimeMillis();
	}
	
	public long end() {
		return System.currentTimeMillis() - start;
	}
	
	public int[] genArray(int size, boolean is_ordered) {
		int[] arr = new int[size];
		for (int i = 0; i < arr.length; i++) {
			arr[i] = i * 2 + 1;
		}
		if (is_ordered)
			return arr;
		shuffle(arr);
		return arr;	
	}
	
	public void shuffle(int[] arr) {
		Random r = new Random();
		int temp, randomIdx;
		for (int idx = arr.length - 1; idx > 0; idx--) {
			randomIdx = r.nextInt(idx + 1);
			temp = arr[randomIdx];
			arr[idx] = temp;			
		}	
	}
	
	public void insertionSort(int[] arr) {
		// TODO implement
	}
	
	public void print(int[] array) {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		for(int i: array) {
			sb.append(i + ", ");
		}
		sb.append("]");
	}
	
	public void qsort(int[] array) {
		// TODO implement
		
	}
	
	public void _qsort(int[] array, int left, int right) {
		// TODO implement
		int less, pivot, greater;
		
		pivot = array[right];
		
		while(left < right) {
			if(array[left] < pivot) {
				
			}
		}
		
	}
	

	public static void main(String[] args) {
		//TODO complete codes
		int size = 100;
		QuickSort m = new QuickSort();
		int[] array = m.genArray(size, true);
		System.out.println(array);
		m.shuffle(array);
		System.out.println(array);
	}

}
