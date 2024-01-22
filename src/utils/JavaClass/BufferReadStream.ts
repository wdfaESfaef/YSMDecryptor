class BufferReadStream{
  buffer:Buffer
  index:number
  constructor(buffer:Buffer){
    this.buffer = buffer
    this.index = 0
  }
  read(buffer:Buffer):void{
    let l = buffer.length
    this.buffer.copy(buffer,0,this.index,this.index + l)
    this.index += l
  }
  available():number{
    return this.buffer.length - this.index
  }
}

export default BufferReadStream