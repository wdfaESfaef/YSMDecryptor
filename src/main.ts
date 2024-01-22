import fs from 'fs/promises'
import path from 'path'

import { YSMReader } from './utils/YSMReader'

async function YSMFileDecryptor(filePath:string){
  let fileBuffer:Buffer = await fs.readFile(filePath)
  let fileName:String = path.basename(filePath,path.extname(filePath))
  let fileMap:Map<String,Buffer> = YSMReader(fileBuffer)
  fs.mkdir(`output/${fileName}`,{recursive:true})
  
  fileMap.forEach((buffer,name)=>{
    fs.writeFile(`output/${fileName}/${name}`,buffer)
  })
  console.log(`${fileName} 解密成功`)
}

//替换这里
YSMFileDecryptor("input/your_ysm_file.ysm")