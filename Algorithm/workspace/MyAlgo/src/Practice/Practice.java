package Practice;

public class Practice {
	
	public static int[] merge(int[] arr1, int[] arr2) {
		
		int arr1length = arr1.length;
		int arr2length = arr2.length;
		int size = arr1length + arr2length;
		int[] result = new int[size];
		
		int i = 0, j = 0, index = 0;
		
		while(i < arr1length && j < arr2length) {
			if(arr1[i] <= arr2[j]) {
				result[index] = arr1[i];
				i++;
			} else {
				result[index] = arr2[j];
				j++;
			}
			index++;
		}
		return result;
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		int[] arr1 = {1,2,5};
		int[] arr2 = {2,4,9,10};
		
		int[] result = merge(arr1, arr2);
		
		for(int i = 0; i < result.length; i++) {
			System.out.println(result[i]);
		}
	}

}
