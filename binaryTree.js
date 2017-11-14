class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key <= this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    get(key) {
        if (this.key == key) {
            return this.value;
        }
        else if (key < this.key && this.left) {
            return this.left.get(key);
        }
        else if (key > this.key && this.right) {
            return this.right.get(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);

            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        }
        else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }

    findHeight(node, depth=0) {
        //basecase:
        //if !node return depth
        if (!node) return depth;
        //recursive:
        //get max depth of left
        let leftHeight = this.findHeight(node.left, depth + 1);
        //get max depth of right
        let rightHeight = this.findHeight(node.right, depth + 1);
        //return greatest max depth
        if (leftHeight >= rightHeight) return leftHeight;
        else return rightHeight
    }
}

const playBinarySearchTree = new BinarySearchTree;

playBinarySearchTree.insert(6, "F");
// console.log(playBinarySearchTree);
playBinarySearchTree.insert(1, "A");
// console.log(playBinarySearchTree);
playBinarySearchTree.insert(17, "Q");
playBinarySearchTree.insert(7, "G");
// console.log(playBinarySearchTree);
playBinarySearchTree.insert(26, "Z");
// console.log(playBinarySearchTree);
playBinarySearchTree.insert(2, "B");
// console.log(playBinarySearchTree);
playBinarySearchTree.insert(21, "U");
playBinarySearchTree.insert(22, "V");
playBinarySearchTree.insert(23, "W");
playBinarySearchTree.insert(24, "X");

playBinarySearchTree.remove(23);

console.log(playBinarySearchTree.findHeight(playBinarySearchTree));