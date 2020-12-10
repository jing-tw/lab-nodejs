let arrayDict:Array<{key:string, value:number}> = [
    {key:'key1', value:0},
    {key:'key2', value:1},
    {key:'key3', value:2},
    {key:'key4', value:3},
  ];

for (let i = 0; i< arrayDict.length; i++){
    console.log('key = ', arrayDict[i].key, ' value = ', arrayDict[i].value);
}