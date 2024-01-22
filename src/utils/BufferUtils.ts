import crypto from 'crypto'

export function getMagicNumber(buffer:Buffer,i:number):number{
  let byteArray = bufferToArray(buffer)
  let i2 = 4
  let i3 = 0
  let i4 = i + 4
  for (let i5 = i; i5 < i4; i5++) {
      i2 --
      i3 += (byteArray[i5] & 255) << (i2 * 8)
  }
  return i3
}

export function getBufferMD5(buffer:Buffer):Buffer{
  const hash = crypto.createHash('md5')
  hash.update(buffer)
  let digest = hash.digest('binary')
  return Buffer.from(digest, 'binary')
}

function bufferToArray(buffer:Buffer):number[]{
  let byteArray:number[] = Array.prototype.slice.call(buffer, 0)
  return byteArray.map((item)=>{
    if(item > 127){
      return item - 256
    }else{
      return item
    }
  })
}