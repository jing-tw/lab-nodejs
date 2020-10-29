export default class DataPool {
  /** Queue Pool
   * Usage:
   *  let __pool:DataPool = new DataPool();
   *  pool.addRandomData(100);
   *  pool.print();
   *  let numData:number|undefined = pool.removeData();
   */
    private __pool:Array<number> = [];

    public addRandomData(numMountData:number){
      for(let i=0; i<numMountData; i++){
        let y:number = Math.random();
        this.__pool.push(y);
      }
    }

    public addNumArray(numDataArray:Array<number>) {
      this.__pool = this.__pool.concat(numDataArray);
    }

    public removeArrayData(numDataNum:number): Array<number>{
      let numArrayData:Array<number> = this.__pool.slice(0, numDataNum);
      this.__pool = this.__pool.slice(numDataNum);

      return numArrayData;
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
