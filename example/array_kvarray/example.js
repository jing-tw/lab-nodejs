var AssArray = {key1: 'value1',
               key2: 'value2' };

console.log('value = ' + AssArray['key1']);

var key = 'notkey';
if( key in AssArray){
  console.log('value = ' + AssArray[key]);
}else{
  console.log('error: The key donot exist in the array');
}


