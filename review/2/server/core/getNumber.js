let number

const getNumber = (forceRestart = false) => {
  // TODO:
  // generate a random number if number is undefined or forceRestart is true
  if(forceRestart === true || typeof(number) === undefined){
    number = Math.floor(Math.random()*100) + 1;
    if(number === 101) number = 100;
  }
  return number//1~100
}

export default getNumber
