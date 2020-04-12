import firebase from "firebase";

const mockFirebase = () => {
  const data = { name: "data" };
  const snapshot = {
    key: "snapshot key",
    val: () => data,
    exportVal: () => data,
    exists: jest.fn(() => true)
  };

  firebase.database = jest.fn().mockReturnValue({
    ref: jest.fn().mockReturnThis(),
    on: jest.fn((eventType, callback) => callback(snapshot)),
    update: jest.fn(() => Promise.resolve(snapshot)),
    remove: jest.fn(() => Promise.resolve()),
    once: jest.fn(() => Promise.resolve(snapshot)),
    push: jest.fn().mockReturnValue({ key: "key" }),
    child: jest.fn().mockReturnThis()
  });
};

export { mockFirebase };
