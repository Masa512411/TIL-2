## Tree
Node와 Link로 이루어진 자료구조
순환구조가 있으면 안된다.

>이진 트리

>이진 순회 트리

>균형트리 / 불균형 트리

>완전이진트리

>순회

>AVL 트리, 레드블랙 트리

>트라이

## Graph
Vertex와 Edge로 이루어진 자료구조
순환구조가 있다.

#### Binary Search Tree
1. 배열을 이용한 방법
> 한줄씩 숫자를 써나가면 배열에 넣을 수 있다.

2. 참조를 이용한 방법

```Java
package Practice;

public class TreeNode {
	public TreeNode left;
	public TreeNode right;
	public int value;

	public TreeNode(int v) {
		this.value = v;
		this.left = this.right = null;
	}
	public TreeNode search(int v) {
		TreeNode current = this;
		while(current != null) {
			if(current.value == v) {
				return current;
			} else if(v < current.value) {
				current = current.left;
			} else {
				current = current.right;
			}
		}
		return null;
	}

	public void insert(int v) {
		TreeNode current = this;
		TreeNode parent = null;

		while(current != null) {
			if(current.value == v) {
				current.value = v;
				return;
			} else if(v < current.value) {
				parent = current;
				current = current.left;
			} else {
				parent = current;
				current = current.right;
			}
		}

		TreeNode addNode = new TreeNode(v);

		if(addNode.value < parent.value) {
			parent.left = addNode;
		} else {
			parent.right = addNode;
		}
	}

	public void visit(TreeNode t) {
		System.out.println(t.value);
	}

	public void printAll() {
		System.out.println("preorder");
		preorder(this);
		System.out.println("inorder");
		inorder(this);
		System.out.println("postorder");
		postorder(this);
	}

	public void preorder(TreeNode t) {
		if(t != null) {
			visit(t);
			preorder(t.left);
			preorder(t.right);
		}
	}

	public void inorder(TreeNode t) {
		if(t != null) {
			inorder(t.left);
			visit(t);
			inorder(t.right);
		}
	}

	public void postorder(TreeNode t) {
		if(t != null) {
			postorder(t.left);
			postorder(t.right);
			visit(t);
		}
	}

	public static void main(String[] args) {
		TreeNode t = new TreeNode(5);
		t.insert(5);
		t.insert(3);
		t.insert(7);
		t.insert(2);
		t.insert(4);
		t.insert(9);

		t.printAll();
	}
}
```

#### 순회

###### preorder 전위 순회
```Java
public void preorder(TreeNode t) {
  if(t != null) {
    visit(t);
    preorder(t.left);
    preorder(t.right);
  }
}
```

###### inorder 중위 순회
```Java
public void inorder(TreeNode t) {
  if(t != null) {
    inorder(t.left);
    visit(t);
    inorder(t.right);
  }
}
```

###### postorder 후위 순회
```Java
public void postorder(TreeNode t) {
  if(t != null) {
    postorder(t.left);
    postorder(t.right);
    visit(t);
  }
}
```

#### 삭제하기
1. 자식이 없을때
- 부모에게서 자식을 삭제하면 된다.
2. 자식이 하나일때
- 부모에게서 자식을 삭제하고 자신의 자식을 부모에게 연결하면 된다.
3. 자식이 둘일때
- 자신에게서 가장 가까운 값을 찾아 자신과 바꾸고 그 값을 지운다.
###### 2번째 버전
```Java
package codesquad;

public class TreeNode {
	public static enum Order {PRE, IN, POST };
	public TreeNode left;
	public TreeNode right;
	//public TreeNode next;
	public int value;

	public TreeNode(int v) {
		this.value = v;
		this.left = this.right = null;
	}

	/**
	 *
	 * @param v 찾는 값  
	 * @return 찾았을 경우 노드를 리턴, 못 찾으면 null 리턴
	 */
	public TreeNode search(int v) {
		TreeNode current = this;
		while(current != null) {
			if (current.value == v)
				return current;
			else if (v < current.value)
				current = current.left;
			else
				current = current.right;
		}
		//current = null
		return null;
	}

	public void insert(int v) {
		TreeNode current = this;
		TreeNode parent = null;
		//find
		while(current != null) {
			parent = current;
			if(current.value == v) {
				this.value = v;
				return;
			}
			else if (v < current.value) {
				current = current.left;
			}
			else {
				current = current.right;
			}
		}

		//insert
		//100% current = null
		TreeNode t = new TreeNode(v);
		if (t.value < parent.value) {
			parent.left = t;
		}
		else {
			parent.right = t;
		}
	}

	public void delete(int v) {

		//find node with v and set its parent node


		//case 3
		//find successor, smallest node of right subtree, and its parent

		// minNode.delete(minNode.value)

		//for case 2 and 3

	}

	public void visit(TreeNode t) {
		System.out.print(t.value + " ");
	}

	public void printAll(Order order) {
		switch (order) {
		case IN:
			inorder(this);
			break;
		case PRE:
			preorder(this);
			break;
		case POST:
			postorder(this);
			break;
		}
		System.out.println();
	}

	public void preorder(TreeNode t) {
		if (t != null) {
			visit(t);
			preorder(t.left);
			preorder(t.right);
		}
	}

	public void inorder(TreeNode t) {
		if (t != null) {
			inorder(t.left);
			visit(t);
			inorder(t.right);
		}
	}

	public void postorder(TreeNode t) {
		if (t != null) {
			inorder(t.left);
			inorder(t.right);
			visit(t);
		}
	}

	public static void main(String[] args) {
		int[] arr = { 5, 3, 8, 1, 6, 12, 2, 10 };
		TreeNode root = new TreeNode(arr[0]);
		for (int i = 1; i < arr.length; i++) {
			root.insert(arr[i]);
		}

		/*
		 *        5
		 *       / \
		 *      3   8
		 *    /    / \
		 *   1    6   12
		 *    \      /
		 *     2    10    
 		 */

		root.printAll(Order.PRE); //5 3 1 2 8 6 12 10

		for (int i = 0; i < arr.length; i ++)
			System.out.println(root.search(arr[i]).value == arr[i]);

		System.out.println(root.search(99) == null);

		//case 1
		root.delete(2);
		root.inorder(root); //1 3 5 6 8 10 12
		System.out.println();
		//case 2
		root.delete(3);
		root.inorder(root); //1 5 6 8 10 12
		System.out.println();

		//case 3
		root.delete(8);
		root.inorder(root); //1 5 6 10 12
		System.out.println();

		//delete root
		root.delete(5);
		root.inorder(root); //1 5 6 10 12
		System.out.println();
	}
}
```
