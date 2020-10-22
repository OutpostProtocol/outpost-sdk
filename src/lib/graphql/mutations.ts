export const uploadPost = `
  mutation UploadPost($postUpload: PostUpload!, $communityTxId: String!) {
    uploadPost(postUpload: $postUpload, communityTxId: $communityTxId) {
      txId
      title
      postText
      subtitle
      timestamp
      canonicalLink
      community {
        name
      }
      user {
        address
      }
    }
  }
`;

export const getSignInToken = `
  mutation getToken($addr: String!) {
    getSignInToken(addr: $addr)
  }
`;

export const authAccount = `
  mutation auth($sig: String!, $addr: String!) {
    authAccount(signature: $sig, addr: $addr)
  }
`;

export const verifyToken = `
  mutation validate($token: String!) {
    verifyToken(token: $token)
  }
`;

export const uploadImage = `
  mutation uploadImage($image: Image!, $address: String!) {
    uploadImage(image: $image, address: $address) {
      txId
    }
  }
`;

export const uploadComment = `
  mutation uploadComment($commentText: String!, $postTxId: String!, $communityTxId: String!, $ethAddr: String!, $timestamp: Int!) {
    uploadComment(commentText: $commentText, postTxId: $postTxId, communityTxId: $communityTxId, ethAddr: $ethAddr, timestamp: $timestamp) {
      postText
      timestamp
      user {
        address
      }
    }
  }
`;
