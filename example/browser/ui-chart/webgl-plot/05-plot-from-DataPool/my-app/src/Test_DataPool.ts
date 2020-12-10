
  import DataPool from './DataPool';

  export default class Test_DataPool {
    static case1():{strMsg:string, bOk:boolean}{
      /** Normal Test
       * Usage:
       *  let {strMsg, bOk} = Test_DataPool.case1();
       *  console.log('strMsg = ', strMsg, ' bOk = ', bOk);
       */
      let pool:DataPool = new DataPool();
      let numSec:number = 10;
      let numSamplingRate:number = 300;
      let numMountData:number = numSec * numSamplingRate;

      pool.addRandomData(numMountData);
      pool.print();

      for(let i:number = 0; pool.getCapacity() > 0; i++){
        console.log(i, 'Test_DataPool:: case 1, pool.getData() = ', pool.removeData());
      }
      return {strMsg:'ok', bOk:true};
    }

    static case2():{strMsg:string, bOk:boolean}{
      let pool:DataPool = new DataPool();
      pool.addRandomData(100);
      pool.print();

      for(let i:number = 0; pool.getCapacity() > 0; i++){
        console.log(i, 'Test_DataPool:: case 1, pool.getData() = ', pool.removeData());
      }
      return {strMsg:'ok', bOk:true};
    }

    static testRemoveData():{strMsg:string, bOk:boolean}{
      /** Test out of data
       * Usage:
       * let {strMsg, bOk} = Test_DataPool.testRemoveData();
       * console.log('strMsg = ', strMsg, ' bOk = ', bOk)
       */
      console.log('Test_DataPool::case3OutOfData');

      let pool:DataPool = new DataPool();
      pool.addRandomData(1);
      pool.print();
      console.log(0, 'Test_DataPool:: case 1, pool.getData() = ', pool.removeData());
      let numData:number|undefined = pool.removeData();
      console.log(1, 'Test_DataPool:: case 1, pool.getData() = ', numData); // should out of data
      if (typeof numData != 'undefined'){
        return {strMsg:'[Test Failure] numData should be undefined, when out of data', bOk:false};
      }
      return {strMsg:'ok', bOk:true};
    }

    static testAddDataArray():{strMsg:string, bOk:boolean}{
      /** Test append number array to the pool
       * Usage:
       *  let {strMsg, bOk} = Test_DataPool.testAddDataArray();
       *  console.log('strMsg = ', strMsg, ' bOk = ', bOk)
       */
      console.log('Test_DataPool::testAddDataArray');
      let pool:DataPool = new DataPool();
      pool.addNumArray([1]);
      pool.print();

      let numDataArray:Array<number> = [2, 3, 4, 5];
      pool.addNumArray(numDataArray);

      if(pool.getCapacity() !== 5){
        return {strMsg:'[Test Failure] pool.getCapacity() != 5', bOk:false};
      }
      for (let i = 1; i<=5; i++) {
        if (pool.removeData() !== i){
          return {strMsg:'[Test Failure] pool.removeData() != i', bOk:false};
        }
      }
      return {strMsg:'ok', bOk:true};
    }
  }