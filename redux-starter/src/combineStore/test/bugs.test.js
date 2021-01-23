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
import { addBug, getUnresolvedBugs, resolveBug, loadBugs } from "../../store/bugs.js";
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
    // Initializer
    let fakeAxios;
    let store;

    beforeEach(() => {
        fakeAxios = new MockAdapter(axios);
        store = configureStore();
    });

    const bugsSlice = () => store.getState().entities.bugs;
    const createState = () => ({
      entities: {
        bugs: {
          list: []
        }
      }
    });
/**
 * loading bugs
 *  - if they exist in the cache
 *    * they should come from the cache
 *  - if they don't exist in cache
 *    * they should be fetched from the server
 *    - loading indicator
 *      * should be true while fetching
 *      * should be false after bugs are fetched
 *      * should be false if the server fails
 */

    describe("loading Bugs", () => {
      it("they should be fetched from the server and put in the store", async () => {

        fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

        await store.dispatch(loadBugs());

        // Because server reponds with a single length array
        expect(bugsSlice().list).toHaveLength(1);
      });

      describe("if the bugs exist in the cache", () => {
        it("they should not be fetched from the server again", async () => {
          fakeAxios.onGet("/bugs").reply(200, [{ id: 1 }]);

          await store.dispatch(loadBugs());
          await store.dispatch(loadBugs());

          // history.get returns an array
          expect(fakeAxios.history.get.length).toBe(1);
        });
      });
      describe("if the bugs don't exist in the cache", () => {
        describe('loading indicator', () => {
          it("should be true while fetching the bugs", () => {
            // fakeAxios.onGet("/bugs").reply(200, [{id: 1}]);
            fakeAxios.onGet("/bugs").reply(() => {
              expect(bugsSlice().loading).toBe(true);
              return [200, [{id: 1}]]
            });

            store.dispatch(loadBugs());

          })

          it("should be false after the bugs are fetched", async () => {
            fakeAxios.onGet("/bugs").reply(200, [{id: 1}]);
  
            const x = await store.dispatch(loadBugs());
            console.log("DEBUG1", x);

            expect(bugsSlice().loading).toBe(false);
          })

          it("should be false if the server returns an error", async () => {
            fakeAxios.onGet("/bugs").reply(500);
  
            const x = await store.dispatch(loadBugs());
            console.log("DEBUG2", x);

            expect(bugsSlice().loading).toBe(false);
          })
        })
      });
    });


    it("should mark the bug as resolved if it's saved to the server", async () => {
      /// AAA
      fakeAxios.onPatch("/bugs/1").reply(200, { id: 1, description: "a", resolved: true });
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).toBe(true);
    });

    it("should not mark the bug as resolved if it's saved to the server", async () => {
      /// AAA
      fakeAxios.onPatch("/bugs/1").reply(500);
      fakeAxios.onPost("/bugs").reply(200, { id: 1 });

      await store.dispatch(addBug({}));
      await store.dispatch(resolveBug(1));

      expect(bugsSlice().list[0].resolved).not.toBe(true);
    });

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
    
    // resolving a bug 
    describe("selectors", () => {
      it("getUnresolvedBugs", () => {
        const state = createState();
        state.entities.bugs.list = [
          { id: 1, resolved: true},
          { id: 2 },
          { id: 3 }
        ]

        const result = getUnresolvedBugs(state);

        expect(result).toHaveLength(2);
      });
    });
});

