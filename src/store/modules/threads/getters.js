import { countObjectProperties } from "../../../helpers";

export default {
  items: state => state.items,
  countThreadReplies: state => id =>
    countObjectProperties(state.items[id].posts) - 1
};
