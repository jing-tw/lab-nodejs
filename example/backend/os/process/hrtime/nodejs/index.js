"use strict";
function main() {
    var start = process.hrtime.bigint(); // 191051479007711n
    setTimeout(function () {
        var end = process.hrtime.bigint(); // // 191052633396993n
        console.log("Benchmark took " + (end - start) + " nanoseconds."); // Benchmark took 1154389282 nanoseconds
        console.log("Benchmark took " + (end - start) / BigInt(Math.pow(10, 6)) + " milliseconds.");
        console.log("Benchmark took " + (end - start) / BigInt(Math.pow(10, 9)) + " seconds.");
    }, 1000);
}
main();
