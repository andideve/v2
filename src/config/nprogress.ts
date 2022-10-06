import { NProgressOptions } from 'nprogress';

const nProgressConfig: Partial<NProgressOptions & { trickleRate: number }> = {
  showSpinner: false,
  speed: 300,
  minimum: 0.15,
  trickleRate: 0.1,
};

export default nProgressConfig;
