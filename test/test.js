function processData(input) {
    //Enter your code here
    var array = input.split("\n");
    var length = array[0];
    var inputData = array[1].split(" ");

    var resultArray = [];

    var flag = inputData[0] - inputData[1];
    for(var i = 0; i < length - 1; i++) {
        for(var j = 0; j < length - 1; j++) {
            var number = inputData[i] - inputData[j];
            if(Math.abs(flag) > Math.abs(number) && number !== 0) {
                resultArray = [];
                resultArray.push(inputData[i]);
                resultArray.push(inputData[j]);
                flag = number;
            } else if(flag === number && number !==0) {
                resultArray.push(inputData[i]);
                resultArray.push(inputData[j]);
            }
        }
    }
    console.log(resultArray.sort().join(" "));
}


process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
  console.log("input : ", input);
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
