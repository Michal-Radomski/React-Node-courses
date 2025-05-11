//* V4
const asyncMiddleware =
  ({ dispatch }: { dispatch: Dispatch }) =>
  (next: NextFunction) =>
  (action: Action) => {
    // Check to see if action has a promise on its payload (if yes wait for if to resolve, if not send action to next middleware)
    // check if there is then property
    if (!action.payload || !action.payload.then) {
      return next(action);
    }
    // We want to wait for the promise to resolve (get data) and then create a new action with that date and dispatch it
    action.payload.then((response: Response) => {
      const newAction = { ...action, payload: response };
      dispatch(newAction);
    });
  };

//* V1
// const asyncMiddleware = ({ dispatch }) => {
//   return function (next) {
//     return function (action) {};
//   };
// };

//* V2
// const asyncMiddleware = ({ dispatch }) =>
//   function (next) {
//     return function (action) {};
//   };

//* V3
// const asyncMiddleware =
//   ({ dispatch }) =>
//   (next) =>
//     function (action) {};

//* V5 - the same as V4
// const asyncMiddleware = ({ dispatch }, next, action) => {};

export default asyncMiddleware;
