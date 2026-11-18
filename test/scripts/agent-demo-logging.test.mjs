import { describe, expect, it } from 'vitest';
import { safeLog } from '../../scripts/agent-demo-logging.mjs';

describe('safeLog', () => {
  it('replaces C0, DEL, and C1 control characters without altering printable text', () => {
    expect(safeLog('á\u0000\u001f\u007f\u0080\u009fé')).toBe('á     é');
  });
});
