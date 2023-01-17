import Queue from "bull";
import redisConfig from "../../config/redis";

import * as jobs from "../jobs";

const queues = Object.values(jobs).map((job) => ({
  bull: new Queue(job.key, {
    redis: { ...redisConfig },
  }),
  name: job.key,
  handle: job.handle,
}));

export default {
  queues,
  add(name: String, data: any) {
    const queue = this.queues?.find((queue) => queue.name === name);

    return queue?.bull.add(data);
  },
  process() {
    return this.queues?.forEach((queue: any) => {
      queue.bull.process(queue.handle);

      queue.bull.on("failed", (job: any, err: any) => {
        console.log("Job failed", job.name, job.data);
        console.log(err);
      });
    });
  },
};
