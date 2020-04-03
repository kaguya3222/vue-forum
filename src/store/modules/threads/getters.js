import { countObjectProperties } from "../../../helpers";

export default {
  threads: state => state.threads,
  countThreadReplies: state => id =>
    countObjectProperties(state.threads[id].posts) - 1
};
