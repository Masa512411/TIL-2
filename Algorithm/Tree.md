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
