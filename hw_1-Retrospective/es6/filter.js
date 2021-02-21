// you need to write a function, which accepts infinite number parameters
// and returns an array, which has the same parameter only once

function filter (){
  return Array.from(new Set (arguments))
}
filter(2,3,2,4,2,4)


module.exports = filter;
 