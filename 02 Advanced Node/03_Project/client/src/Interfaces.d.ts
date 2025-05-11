// Types and Interfaces

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
type Fetch = typeof store.fetch;
type Action = typeof store.action;
type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
type NextFunction = typeof store.nextFunction;

interface Blog {
  imageUrl: string;
  title: string;
  content: string;
  _id: string;
}
