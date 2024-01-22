import BufferReadStream from "./JavaClass/BufferReadStream"
import { Decryptor } from "./Decryptor"
import { getMagicNumber, getBufferMD5 } from "./BufferUtils"

type version = 1 | 2

export function YSMReader(fileBuffer:Buffer):Map<String,Buffer>{
  let fileMap:Map<String,Buffer> = new Map()

  let version:version = getYSMVersion(fileBuffer)

  let key:Buffer = Buffer.alloc(16)
  fileBuffer.copy(key,0,8,24)

  let data:Buffer = Buffer.alloc(fileBuffer.length - 24)
  fileBuffer.copy(data,0,24,fileBuffer.length)

  if(getBufferMD5(data).equals(key)){
    let bufferStream:BufferReadStream = new BufferReadStream(data)
    
    while (bufferStream.available() > 0) {
      fileMap.set(...Decryptor(bufferStream,version))
    }
  }
  return fileMap
}

function getYSMVersion(fileBuffer:Buffer):version{
  let magicNumber = getMagicNumber(fileBuffer,0)
  let version = getMagicNumber(fileBuffer, 4)
  if (magicNumber != 1498629968) {
    throw new Error('Invalid YSM file')
  }
  if (version == 1 || version == 2) {
    return version
  }else{
    throw new Error('Invalid YSM version')
  }
}