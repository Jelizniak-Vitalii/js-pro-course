// реализуйте функцию по созданию счётчика

function createCounter(initialValue = 0) {
       return {
        baseValue: initialValue,
      
        showValue(){
         return this.baseValue; 
        },
  
        increment(number = 1){
          return this.baseValue += number;
        },
  
        decrement(number = 1){
            return this.baseValue -= number;
        },
        discard(){
            return this.baseValue = initialValue;
        }
  
      }
  }



module.exports = createCounter;
