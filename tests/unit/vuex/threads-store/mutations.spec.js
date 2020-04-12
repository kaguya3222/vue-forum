import threadsMutations from "@/store/modules/threads/mutations";
import threadsStore from "@/store/modules/threads/store";
import { countObjectProperties } from "../../../../src/helpers";

const thread = Object.values(threadsStore.state.items)[0];

describe("setThread", function() {
  test("Adds thread to threads object", () => {
    const threadsLengthBeforeSet = countObjectProperties(
      threadsStore.state.items
    );
    threadsMutations.setThread(threadsStore.state, {
      thread,
      threadId: "greatThread" + Date.now()
    });
    const threadsLengthAfterSet = countObjectProperties(
      threadsStore.state.items
    );
    expect(threadsLengthAfterSet > threadsLengthBeforeSet).toBe(true);
  });
});
