// 이 방식을 취하면 내일 BUG_ADDED의 값을 BUG_CREATED로 변경해도 actionTypes 파일에 와서
// bugAdded 부분만을 변경하면되기 때문에 훨씬더 maintainable하다

export const BUG_ADDED = "bugAdded";
export const BUG_REMOVED = "bugRemoved";
export const BUG_RESOLVED = "bugResolved";
