class AtomicLong{
  value:bigint
  constructor(value:bigint){
    this.value = value
  }

  compareAndSet(old:bigint,next:bigint):boolean{
    if(this.value === old){
      this.value = next
      return true
    }
    return false
  }

}

export default AtomicLong