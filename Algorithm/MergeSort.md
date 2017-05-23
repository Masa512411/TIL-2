## Merge Sort

#### Divide and Conquer
분할 정복

```java
public void mergeSort(int[] arr) {
		_mergeSort(arr, 0, arr.length - 1);
	}

	private void _mergeSort(int[] arr, int left, int right) {
		int middle = (left + right)/2;
		if (left < right) {
			_mergeSort(arr, left, middle);
			_mergeSort(arr, middle + 1, right);
			merge(arr, left, middle, right);
		}

	}

	private void merge(int[] arr, int left, int middle, int right) {
		int[] helper = new int[arr.length];

		for (int i = left; i <=right; i++)
			helper[i] = arr[i];

		int helperLeft = left;
		int helperRight = middle + 1;
		int current = left;

		while(helperLeft <= middle && helperRight <= right) {
			if(helper[helperLeft] <= helper[helperRight]) {
				arr[current] = helper[helperLeft];
				helperLeft++;
			} else {
				arr[current] = helper[helperRight];
				helperRight++;
			}
			current++;
		}

		int remain = middle - helperLeft;
		for(int i = 0; i <= remain; i++) {
			arr[current + i] = helper[helperLeft + i];
		}

//		int a = left, b = middle + 1;
//		
//		for(int j = left; j <= right; j++) {
//			if(a <= middle && (b > right || helper[a] <= helper[b])) {
//				arr[j] = helper[a];
//				a++;
//			} else {
//				arr[j] = helper[b];
//				b++;
//			}
//		}
	}
```
