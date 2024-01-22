import Long from 'long'

import BufferReadStream from "./JavaClass/BufferReadStream"
import JavaRandom from "./JavaClass/Random"
import { getMagicNumber, getBufferMD5 } from "./BufferUtils"

const ByteBuffer = require('bytebuffer')
const Cryptojs = require("crypto-js")
const zlib = require('zlib')

type version = 1 | 2

export function Decryptor(bufferStream:BufferReadStream,v:version):[String,Buffer]{

  let filename:string = readString(bufferStream,v)
  let length:number = readInt(bufferStream)
  
  switch(v){
    case 1: {
      let keyBytes:Buffer = Buffer.alloc(16)
      let ivBytes:Buffer = Buffer.alloc(16)
      let dataBytes:Buffer = Buffer.alloc(length)

      bufferStream.read(keyBytes)
      bufferStream.read(ivBytes)
      bufferStream.read(dataBytes)

      let decryptedData:Buffer = AESDecryptor(keyBytes,ivBytes,dataBytes)
      let decompressedBuffer:Buffer = zlib.unzipSync(decryptedData)
      return [filename,decompressedBuffer]
    }
    case 2: {
      let dataBytes:Buffer = Buffer.alloc(readInt(bufferStream))
      let ivBytes:Buffer = Buffer.alloc(16)
      let keyBytes:Buffer = Buffer.alloc(length)
    
      bufferStream.read(dataBytes)
      bufferStream.read(ivBytes)
      bufferStream.read(keyBytes)

      let randomKey:Buffer = generateRandomBytes(keyBytes)

      let trueKey:Buffer = AESDecryptor(randomKey,ivBytes,dataBytes)
      let decryptedData:Buffer = AESDecryptor(trueKey,ivBytes,keyBytes)
      let decompressedBuffer:Buffer = zlib.unzipSync(decryptedData)
      return [filename,decompressedBuffer]
    }
  }
}

function AESDecryptor(key:Buffer,iv:Buffer,data:Buffer):Buffer{
  let sdata = Cryptojs.lib.WordArray.create(data)
  let skey = Cryptojs.lib.WordArray.create(key)
  let siv = Cryptojs.lib.WordArray.create(iv)

  let decrypted = Cryptojs.AES.decrypt(
    { ciphertext: sdata },
    skey,
    { iv: siv, mode: Cryptojs.mode.CBC, padding: Cryptojs.pad.Pkcs7 }
  )

  return Buffer.from(decrypted.toString(Cryptojs.enc.Hex), 'hex')
}

function generateRandomBytes(data:Buffer):Buffer{
  let randomBytes = Buffer.alloc(16)
  new JavaRandom(hashToLong(getBufferMD5(data))).nextBytes(randomBytes)
  return randomBytes
}

function hashToLong(data:Buffer):bigint{
  const buffer = ByteBuffer.wrap(data)
  let result = Long.ZERO
  while (buffer.remaining()) {
    result = result.shiftLeft(8).or(buffer.readUint8())
  }
  return BigInt(result.toString())
}

function readString(bufferStream:BufferReadStream,v:version):string{
  let b:Buffer = Buffer.alloc(readInt(bufferStream))
  bufferStream.read(b)
  return v === 1 ? b.toString('utf-8') : atob(b.toString('utf-8'))
}

function readInt(bufferStream:BufferReadStream):number{
  let b:Buffer = Buffer.alloc(4)
  bufferStream.read(b)
  return getMagicNumber(b,0)
}