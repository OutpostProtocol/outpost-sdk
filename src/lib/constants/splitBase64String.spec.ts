import test from 'ava';

import splitBase64String from './splitBase64String';

test('splitBase64String', (t) => {
  t.true(splitBase64String(undefined) === null);
  t.true(splitBase64String(null) === null);
  const base64 =
    'data:image/png;base64,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';
  const { mimeType, rawData } = splitBase64String(base64);
  t.true(mimeType === 'image/png');
  t.true(
    rawData ===
      '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'
  );
});
