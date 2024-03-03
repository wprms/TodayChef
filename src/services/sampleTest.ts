import { api } from './api';
import {
  ResponseData,
} from './apiTypes';

export type TestRequest = {
  testReq: string;
};

const apiWithTag = api.enhanceEndpoints({ addTagTypes: ['Test'] });
const testApi = apiWithTag.injectEndpoints({
  endpoints: (builder) => ({
    selectTest: builder.mutation<ResponseData, null>({
      query: (payload) => {
        return {
          url: '/testapi',
          method: 'GET',
        };
      },
    }),
    registTest: builder.mutation<ResponseData, TestRequest>({
      query: (payload) => {
        return {
          url: '/testapi/regtest',
          method: 'POST',
          body: payload,
        };
      },
    }),
    modifyTest: builder.mutation<ResponseData, TestRequest>({
      query: (payload) => {
        return {
          url: '/testapi/modtest',
          method: 'PUT',
          body: payload,
        };
      },
    }),
    deleteTest: builder.mutation<ResponseData, null>({
      query: (payload) => {
        return {
          url: '/testapi/deltest',
          method: 'DELETE',
        };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useSelectTestMutation,
  useRegistTestMutation,
  useModifyTestMutation,
  useDeleteTestMutation,
} = testApi;