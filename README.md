# outpost-sdk

📨 🚀 The official JavaScript client SDK for the Outpost Protocol.

## Install

`npm install outpost-sdk`

OR

`yarn add outpost-sdk`

## Usage

### Import into your project

`const { createClient } = require('outpost-sdk')`

Or with es6

`import { createClient } from 'outpost-sdk'`

### Methods

#### `createClient`

Create an outpost client. Returns the methods available in the SDK.

`const createClient = (options: createClientParams = defaultOptions): createClientResult`

The result:
```typescript
type createClientResult = {
  readonly getAllCommunities: () => Promise<readonly Community[]>;
  readonly getPosts: (params: getPostsParams) => Promise<getPostsResult>;
  readonly getChallenge: (
    params: getChallengeParams
  ) => Promise<getChallengeResult>;
  readonly getAuthToken: (
    params: getAuthTokenParams
  ) => Promise<getAuthTokenResult>;
  readonly getPostPreview: (
    params: getPostPreviewParams
  ) => Promise<getPostPreviewResult>;
  readonly uploadImage: (
    params: uploadImageParams
  ) => Promise<uploadImageResult>;
  readonly uploadPost: (params: uploadPostParams) => Promise<uploadPostResult>;
  readonly uploadComment: (
    params: uploadCommentParams
  ) => Promise<uploadCommentResult>;
  readonly getPost: (params: getPostParams) => Promise<getPostResult>;
};
```

#### `getChallenge`

Get a challenge from the outpost server so that it can verify a user owns their Ethereum address. Returns a string that the user must sign and send back to the server in `getAuthToken`.

`getChallenge: (params: getChallengeParams) => Promise<getChallengeResult>`

`type getChallengeParams = { readonly address: string; };`

`type getChallengeResult = string;`

#### `getAuthToken`

Get an authentication token to be able to access authenticated routes. Returns the users authentication token.

`getAuthToken: (params: getAuthTokenParams) => Promise<getAuthTokenResult>;`

```typescript
type getAuthTokenParams = {
  readonly address: string;
  readonly signature: string;
};
```

`type getAuthTokenResult = string;`

#### `getPosts`

List all the posts of a specified community. Returns an array of posts.

`getPosts: (params: getPostsParams) => Promise<getPostsResult>;`

`type getPostsParams = { readonly slug: string; };`

`type getPostsResult = readonly Post[];`

```typescript
type Post = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly txId: string;
  readonly featuredImg: string;
};
```

#### `getPostPreview`

Get the preview for a post.

`getPostPreview: (params: getPostPreviewParams) => Promise<getPostPreviewResult>;`

`export type getPostPreviewParams = { readonly txId: string; };`

```typescript
type getPostPreviewResult = {
  readonly id: string;
  readonly title: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly txId: string;
  readonly featuredImg: string | null;
  readonly canonicalLink: string;
};
```

#### `uploadImage`

Upload a base64 representation of an image file to arweave. Returns the transaction id of the upload.

`uploadImage: (params: uploadImageParams) => Promise<uploadImageResult>;`

```typescript
type uploadImageParams = {
  readonly base64: string;
  readonly authToken: string;
};
```

```typescript
type uploadImageResult = {
  readonly txId: string;
  readonly gateway: string;
};
```

Now you can view the image at
```typescript
`https://${gateway}/${txId}`
```

Note: The `gateway` returned is the host of the gateway the image was uploaded to (i.e. 'arweave.net'). Transactions take about 2 minutes to be included in a block but Arweave's gateways ('arweave.net' and 'arweave.dev') optimistically store the transaction so it can be served immediately.

#### `uploadPost`

Upload a post to arweave.

`uploadPost: (params: uploadPostParams) => Promise<uploadPostResult>;`

```typescript
type uploadPostParams = {
  readonly authToken: string;
  readonly communityTxId: string;
  readonly postUpload: {
    readonly canonicalLink: string;
    readonly postText: string;
    readonly subtitle: string;
    readonly timestamp: number;
    readonly title: string;
  };
};
```

```typescript
type uploadPostResult = {
  readonly txId: string;
  readonly title: string;
  readonly postText: string;
  readonly subtitle: string;
  readonly timestamp: number;
  readonly canonicalLink: string;
  readonly community: {
    readonly name: string;
  };
  readonly user: {
    readonly address: string;
  };
};
```

#### `getPost`

Get a post.

`uploadPost: (params: uploadPostParams) => Promise<uploadPostResult>;`

```typescript
type getPostParams = {
  readonly txId: string;
  readonly authToken: string;
};
```

#### `getAllCommunities`

Get all the publications (a.k.a. communities).

`getAllCommunities: () => Promise<readonly Community[]>;`
