import type { FC } from 'react';

import { HEY_API_URL } from '@hey/data/constants';
import { Toggle } from '@hey/ui';
import getAuthWorkerHeaders from '@lib/getAuthWorkerHeaders';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import ToggleWrapper from '../ToggleWrapper';

interface ActivateLifetimeProProps {
  isPro: boolean;
  profileId: string;
}

const ActivateLifetimePro: FC<ActivateLifetimeProProps> = ({
  isPro: enabled,
  profileId
}) => {
  const [loading, setLoading] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    setIsPro(enabled);
  }, [enabled]);

  const updatePro = async () => {
    setLoading(true);
    toast.promise(
      axios.post(
        `${HEY_API_URL}/internal/pro/activate`,
        { enabled: !isPro, id: profileId, trial: false },
        { headers: getAuthWorkerHeaders() }
      ),
      {
        error: () => {
          setLoading(false);
          return 'Error updating pro status';
        },
        loading: 'Updating pro status...',
        success: () => {
          setIsPro(!isPro);
          setLoading(false);
          return 'Pro status updated';
        }
      }
    );
  };

  return (
    <ToggleWrapper title="Activate Lifetime Pro">
      <Toggle disabled={loading} on={isPro} setOn={updatePro} />
    </ToggleWrapper>
  );
};

export default ActivateLifetimePro;
