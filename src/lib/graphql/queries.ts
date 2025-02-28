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

export const postPage = `
  query postpage($txId: String!, $slug: String!) {
    postPreview (txId: $txId) {
      id
      title
      subtitle
      timestamp
      txId
      featuredImg
      canonicalLink
      readRequirement
    }
    community(slug: $slug) {
      id
      name
      txId
      tokenAddress
      tokenSymbol
      description
      imageTxId
      defaultReadRequirement
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
      readRequirement
      community {
        name
        defaultReadRequirement
        tokenSymbol
      }
      user {
        name
      }
    }
  }
`;

export const getPost = `
  query getPost($txId: String!) {
    getPost(txId: $txId) {
      post {
        id
        title
        postText
        subtitle
        timestamp
        featuredImg
        canonicalLink
        txId
        readRequirement
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
  query post($txId: String!) {
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
        tokenAddress
        tokenSymbol
        defaultReadRequirement
      }
    }
  }
`;

export const getCommunityPage = `
  query ComPage($slug: String) {
      community(slug: $slug) {
        id
        name
        txId
        tokenAddress
        tokenSymbol
        description
        imageTxId
        defaultReadRequirement
        owner {
          name
          image
        }
        showOwner
      }
    }
`;
