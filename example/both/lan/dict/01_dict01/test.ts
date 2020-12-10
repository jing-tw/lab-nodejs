let data:number = 5;
let dictData:{[index:string]:number} = {"a": 1, "b":2};

for (let strKey in dictData){
	console.log('strKey = ', strKey);
	console.log('vale = ', dictData[strKey]);
}

Object.keys(dictData).forEach(strKey => {
		console.log("strKey = " + strKey);
		console.log('value = ' + dictData[strKey]);
	}
);

