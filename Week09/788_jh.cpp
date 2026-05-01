#include <vector>

using namespace std;

struct TreeNode {
   int val;
   TreeNode *left;
   TreeNode *right;
   TreeNode() : val(0), left(nullptr), right(nullptr) {}
   TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
   TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
};

class Solution {
public:    
    TreeNode* buildTree(vector<int>& preorder, vector<int>& inorder) {
        return binary(0, inorder.size() - 1, 0, preorder, inorder);
    }
// 클래스 다루는 방법을 어쩌다 보니 지피티가 알려줘서 참고했음. 로직은 제가 생각했답니다..
private:
    TreeNode* binary(int left, int right, int preIndex, vector<int>& preorder, vector<int>& inorder) {
        // left가 right보다 크면 탐색 중지. null 반환
        // 이 부분은 좀 헷갈렸음. 이렇게 하면 정상적인 리프 노드에도 다 null이 붙을테니까
        // 정답과 다른 결과가 나올거라고 생각했는데 마지막 층 null은 알아서 생략하고
        // 보여준다고 합니다. 제미나이가 말해줌
        if(left > right) {
            return nullptr;
        }
        
        int centerIndex;
        int rootVal;
        // 전위순회 이용해서 root를 찾음
        for(int i = left; i <= right; i++) {
            if(preorder[preIndex] == inorder[i]) {
                centerIndex = i;
                rootVal = inorder[i];
                break;
            }
        }
        // 현재 루트 노드 생성
        TreeNode* root = new TreeNode(rootVal);
        // 왼쪽 부분 트리 탐색
        root -> left = binary(left, centerIndex - 1, preIndex + 1, preorder, inorder);
        // 오른쪽 부분 트리 탐색
        // 오른쪽 부분 트리에서 root를 찾아야 하니까 preIndex(전위순회에서 현재 root 노드 인덱스)를 아래처럼 계산해줌
        root -> right = binary(centerIndex + 1, right, preIndex + (centerIndex - left) + 1, preorder, inorder); 
        
        return root;
    }
};