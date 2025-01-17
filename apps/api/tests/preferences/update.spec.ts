import getAuthWorkerHeadersForTest from '@hey/lib/getAuthWorkerHeadersForTest';
import { TEST_URL } from '@utils/constants';
import axios from 'axios';
import { describe, expect, test } from 'vitest';

describe('preferences/update', () => {
  test('should update profile preferences', async () => {
    const response = await axios.post(
      `${TEST_URL}/preferences/update`,
      { highSignalNotificationFilter: true, isPride: true },
      { headers: await getAuthWorkerHeadersForTest() }
    );

    expect(response.data.result.highSignalNotificationFilter).toBeTruthy();
    expect(response.data.result.isPride).toBeTruthy();
  });
});
