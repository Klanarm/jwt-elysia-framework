import { serverTiming } from "@elysiajs/server-timing";

const serverTimingConfig = {
  trace: {
    request: false,
    parse: false,
    transform: false,
    beforeHandle: false,
    handle: false,
    afterHandle: false,
    total: true,
  },
};

export default serverTiming(serverTimingConfig);
