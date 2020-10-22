// TODO: May want to introduce listCommunities.
export const getAllCommunities = `
  query {
    allCommunities {
      id
      name
      txId
      tokenAddress
      tokenSymbol
      description
      imageTxId
      slug
      owner {
        name
      }
      showOwner
    }
  }
`;

export const postPreview = `
  query postpage($txId: String!, $slug: String!) {
    postPreview (txId: $txId) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      canonicalLink
    }
    community(slug: $slug) {
      id
      name
      txId
      tokenAddress
      tokenSymbol
      description
      imageTxId
      readRequirement
      owner {
        name
        image
      }
    }
  }
`;

export const getPosts = `
  query posts($slug: String) {
    posts (communitySlug: $slug) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      community {
        name
        readRequirement
        tokenSymbol
      }
      user {
        name
      }
    }
  }
`;

export const getPost = `
  query getPost($txId: String!, $userToken: String!) {
    getPost(txId: $txId, userToken: $userToken) {
      post {
        id
        title
        postText
        subtitle
        timestamp
        featuredImg
        canonicalLink
        txId
        community {
          name
          slug
          txId
        }
        user {
          address
          name
          image
        }
      }
      comments {
        postText
        timestamp
        user {
          address
          name
          image
        }
      }
      userBalance
      readRequirement
      tokenSymbol
      tokenAddress
    }
  }
`;

export const getPostPreview = `
  query posts($txId: String!) {
    postPreview (txId: $txId) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      canonicalLink
    }
  }
`;

export const getUser = `
  query user($ethAddr: String) {
    user(ethAddr: $ethAddr) {
      name,
      id
    }
  }
`;

export const isNameAvailable = `
  query isNameAvailable($name: String!) {
    isNameAvailable(name: $name)
  }
`;

export const getUserRoles = `
  query {
    userRoles {
      title
      community {
        txId
        name
        slug
      }
    }
  }
`;
