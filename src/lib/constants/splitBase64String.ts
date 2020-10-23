export type Base64Data = {
  readonly data: string;
  readonly mimeType: string;
};

export default function splitBase64String(base64: string): Base64Data | null {
  if (typeof base64 !== 'string' || !base64.length) {
    return null;
  }
  const data = base64.replace(/^data:(.*,)?/, '');
  const mimeTypes = base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

  if (!data.length || !Array.isArray(mimeTypes) || mimeTypes.length !== 2) {
    return null;
  }
  const mimeType = mimeTypes[1];
  return {
    data,
    mimeType,
  };
}
