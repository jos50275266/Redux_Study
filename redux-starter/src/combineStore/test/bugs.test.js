// import { addBug, bugAdded } from "../../store/bugs.js"
// import { apiCallBegan } from "../api.js";

// describe("bugSlice", () => {
//     describe("action creators", () => {
//         it("addBug", () => {
//             const bug = { description: 'a '}
//             const result = addBug(bug);
//             const expected = {
//                 type: apiCallBegan.type,
//                 payload: {
//                     url: '/bugs',
//                     method: "post",
//                     data: bug,
//                     onSuccess: bugAdded.type
//                 }
//             }
//             expect(result).toEqual(expected);
//         });
//     })
// })

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { addBug } from "../../store/bugs.js";
import configureStore from "../configureStore.js";

describe("bugsSlice", () => {
    it("should handle the addBug action", async () => {
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1 };

      const fakeAxios = new MockAdapter(axios);
      fakeAxios.onPost('/bugs').reply(200, savedBug);

      const store = configureStore();
      await store.dispatch(addBug(bug));
      expect(store.getState().entities.bugs.list).toHaveLength(1);
      expect(store.getState().entities.bugs.list).toContainEqual(savedBug);
    });
});

// Writing Clean Tests
// AAA
// Arrange
// Act
// Assert
describe("bugsSlice - Clean Tests", () => {
    // Initalizer
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;

    it("should add the bug to the store if it's saved to the server", async () => {
      // Arrange
      const bug = { description: 'a' };
      const savedBug = { ...bug, id: 1 };
      fakeAxios.onPost('/bugs').reply(200, savedBug);

      // Act
      await store.dispatch(addBug(bug));

      // Assert
      expect(bugsSlice().list).toHaveLength(1);
      expect(bugsSlice().list).toContainEqual(savedBug);
    });

    it("should not add the bug to the store if it's not saved to the server", async () => {
        // Arrange
        const bug = { description: 'a' };
        fakeAxios.onPost('/bugs').reply(500);
  
        // Act
        await store.dispatch(addBug(bug));
  
        // Assert
        expect(bugsSlice().list).toHaveLength(0);
      });
});

// resolving a bug
// loading bugs
// getting unresolved bugs