const calculateHeuristic = (pregn,gluco,blood,skin,insul,bmi,dpf,age) => {
    return (0.0205919)*pregn+(0.0059203)*gluco+(-0.0023319)*blood+(0.0001545)*skin+(-0.0001805)*insul+(0.0132440)*bmi+(0.1472374)*dpf+(0.0026214)*age
}

//Deep manage function c++ -> &*
const replaceElements = (me,other,position,lastOrFirst = "last") => {
    if(lastOrFirst === "last"){
      for(let i = position;i<me.length;i++){
        me[i] = other[i]
      }
    } else if (lastOrFirst === "first"){
      for(let i = 0;i<position;i++){
        me[i] = other[i]
      }
    }
}

const dec2bin = (number) => {
    let binaryValue = []
    while(number > 0){
      let n = number%2
      binaryValue.push(n)
      number = floor(number / 2)
    }
    binaryValue.reverse()
    return binaryValue  
}

const bin2dec = (arr) => {
    let sum = 0
    let value
    for(let i = arr.length-1 ;i>=0;i--){
      value = 0
      arr[arr.length-1 - i] === 1 ? (value = 2**i) : (value = 0)
      sum = value + sum
    }
    return sum
}