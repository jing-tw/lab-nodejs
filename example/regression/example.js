var regression = require('regression');

var data = [

				[-10, -738],
				[-9, -520],
				[-8, -350],
				[-7, -222],
				[-6, -130],
				[-5, -68],
				[-4, -30],
				[-3, -10],
				[-2, -2],
				[-1, 0],
				[0, 2],
				[1, 10],
				[2, 30],
				[3, 68],
				[4, 130],
				[5, 222],
				[6, 350],
				[7, 520],
				[8, 738],
				[9, 1010],
				[10, 1342]
			];
var result = regression('linear', data);
console.log("result.data = " + result.points);

