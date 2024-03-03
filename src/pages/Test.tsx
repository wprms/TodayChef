import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  TestRequest,
  useRegistTestMutation,
  useSelectTestMutation,
  useModifyTestMutation,
  useDeleteTestMutation,
} from '../services/sampleTest';
import {
  ResponseData,
  TestData,
} from '../services/apiTypes';

interface TestItemProps {
  data : TestData;
}

function MyTestListItem(props : TestItemProps) {
  return (
        <div>
           <b>{props.data.test}</b> 
        </div>
  );
}

function Test() {
  const registTestMutation = useRegistTestMutation();
  const selectTestMutation = useSelectTestMutation();
  const modifyTestMutation = useModifyTestMutation();
  const deleteTestMutation = useDeleteTestMutation();
  const [testList, setTestList] = useState<TestData[]>([]);
  const [result, setResult] = useState<ResponseData>();
  
  const selectTest = async () => {
    await selectTestMutation[0](null)
      .then((response) => {
        // @ts-ignore
        const res = response.data as ResponseData;
        // @ts-ignore
        const result = res.result as TestData[];

        console.log(result);
        setTestList(result);
        setResult(res);
      })
      .catch();
  };
  const registTest = async (value: string) => {
    const request: TestRequest = {
      testReq: value
    };
    await registTestMutation[0](request)
      .then((response) => {
        // @ts-ignore
        const res = response.data as ResponseData;
        // @ts-ignore
        const result = res.result as TestData[];

        console.log(result);
        setTestList(result);
        setResult(res);
      })
      .catch();
  };
  const modifyTest = async (value: string) => {
    const request: TestRequest = {
      testReq: value
    };
    await modifyTestMutation[0](request)
      .then((response) => {
        // @ts-ignore
        const res = response.data as ResponseData;
        // @ts-ignore
        const result = res.result as TestData[];

        console.log(result);
        setTestList(result);
        setResult(res);
      })
      .catch();
  };
  const deleteTest = async () => {
    await deleteTestMutation[0](null)
      .then((response) => {
        // @ts-ignore
        const res = response.data as ResponseData;
        // @ts-ignore
        const result = res.result as TestData[];

        console.log(result);
        setTestList(result);
        setResult(res);
      })
      .catch();
  };

  return (
    <div>
      <button onClick={(e) => { 
        selectTest();
      }}>照会</button>
      <br/>
      <button onClick={(e) => { 
        const element : HTMLInputElement = document.getElementById('testId') as HTMLInputElement;
        const testId: string = element.value;
        registTest(testId);
      }}>登録</button><input id='testId' type={'text'}/>
      <br/>
      <button onClick={(e) => { 
        const element : HTMLInputElement = document.getElementById('testIdMod') as HTMLInputElement;
        const testIdMod: string = element.value;
        modifyTest(testIdMod);
      }}>更新</button><input id='testIdMod' type={'text'}/>
      <br/>
      <button onClick={(e) => { 
        deleteTest();
      }}>クリア</button>


      <br/>{result?.resultCode}
      <br/>{result?.resultMessage}
      {testList.map((test, index) => (
            <MyTestListItem key={index} data={test} />
          ))}
    </div>
  );
}

export default Test;