import AtomicLong from "./AtomicLong"

class JavaRandom{
  multiplier:bigint = 25214903917n
  addend:bigint = 11n
  mask:bigint = 281474976710655n
  seed: AtomicLong
  
  constructor(seed:bigint){
    this.seed = new AtomicLong(this.initialScramble(seed))
  }

  nextBytes(buffer:Buffer):void{
    for (let i = 0, len = buffer.length; i < len; ){
      for (let rnd = this.next(32),n = Math.min(len - i, 32/8);n-- > 0; rnd = (rnd >> 8)){
        buffer[i++] = rnd
      }
    }
  }

  initialScramble(seed:bigint):bigint{
    return (seed ^ this.multiplier) & this.mask
  }

  next(bits:number):number{
    let oldseed:bigint,nextseed:bigint
    let seed = this.seed
    do {
      oldseed = seed.value
      nextseed = (oldseed * this.multiplier + this.addend) & this.mask
    } while (!seed.compareAndSet(oldseed,nextseed))
    return javaLongToInt(rightShift(nextseed,BigInt(48 - bits)))
  }
}

function javaLongToInt(bigint:bigint):number{
  if(bigint > 2147483647n){
    return javaLongToInt(bigint - 2147483647n - 2147483649n)
  }else{
    return parseInt(bigint.toString())
  }
}

function rightShift(bigint:bigint,shift:bigint):bigint{
  let result = bigint / (2n ** shift)
  result = result < 0 ? result + 1n : result; 
  return result
}

export default JavaRandom