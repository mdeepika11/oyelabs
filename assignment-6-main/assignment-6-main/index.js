function findMissingNumber(arr){
    const n = 100;
    const expectedSum = (n*(n+1))/2;

    const actualSum = arr.reduce((sum, num)=> sum + num, 0);

    const missingNumber = expectedSum - actualSum;

    return missingNumber;

}

const arr = [1,2,3,5,6,7,8,9,10,11,12,..., 100];
const missingNumber = findMissingNumber(arr);
console.log("MissingNumber:", missingNumber);