import type { Preferences } from '@hey/types/hey';

import { HEY_API_URL } from '@hey/data/constants';
import axios from 'axios';

/**
 * Get user preferences
 * @param id user id
 * @param headers auth headers
 * @returns user preferences
 */
const getPreferences = async (
  id: string,
  headers: any
): Promise<Preferences> => {
  try {
    const response: { data: { result: Preferences } } = await axios.get(
      `${HEY_API_URL}/preferences/get`,
      { headers, params: { id } }
    );

    return response.data.result;
  } catch {
    return {
      features: [],
      isPro: false,
      isTrusted: false,
      membershipNft: { dismissedOrMinted: false },
      preference: null,
      restrictions: { isFlagged: false, isSuspended: false }
    };
  }
};

export default getPreferences;
