import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';

export const apiErrorLogger: Middleware =
  (storeApi: MiddlewareAPI) => (next) => (action) => {
    // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
    if (isRejectedWithValue(action)) {
      // console.log('-------------- api error logger -----------');
      // console.log(action);
      // const dispatch = useAppDispatch();
    }

    return next(action);
  };