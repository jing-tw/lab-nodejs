export default class DataPool {
    private __pool:Array<number> = [];
  
    public addData(numMountData:number){
      for(let i=0; i<numMountData; i++){
        let y:number = Math.random();
        this.__pool.push(y);
      }
    }
  
    public removeData():number|undefined{
      /**
       * Pop out the data
       * Return:
       * 1. number, if success
       * 2. undefined, if there is no data.
       */
      let data:number = this.__pool.slice(0, 1)[0];
      this.__pool = this.__pool.slice(1);
      return data;
    }
  
    public getCapacity():number{
      return this.__pool.length;
    }
  
    public print(){
      for(let i=0; i<this.getCapacity(); i++){
        console.log(i, '[info] DataPool::print, __pool[i] = ', this.__pool[i]);
      }
    }
  
  }
  
  export class Test_DataPool {
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
  
      pool.addData(numMountData);
      pool.print();
      
      for(let i:number = 0; pool.getCapacity() > 0; i++){
        console.log(i, 'Test_DataPool:: case 1, pool.getData() = ', pool.removeData());
      }
      return {strMsg:'ok', bOk:true};
    }
  
    static case2():{strMsg:string, bOk:boolean}{
      let pool:DataPool = new DataPool();
      pool.addData(100);
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
      pool.addData(1);
      pool.print();
      console.log(0, 'Test_DataPool:: case 1, pool.getData() = ', pool.removeData());
      let numData:number|undefined = pool.removeData();
      console.log(1, 'Test_DataPool:: case 1, pool.getData() = ', numData); // should out of data
      
      if (typeof numData != 'undefined'){
        return {strMsg:'numData should be undefined, when out of data', bOk:false};
      } 
      return {strMsg:'ok', bOk:true};
    }
  }