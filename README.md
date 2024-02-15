# YSM Decryptor

这是一个Minecraft模组[`Yes Steve Model`](https://www.curseforge.com/minecraft/mc-mods/yes-steve-model)使用的`.ysm`文件格式的解密工具

解密算法出自[`ysmdumper`](https://github.com/LLKawi/ysmdumper)项目，我仅仅只是将它用TypeScript重新实现了一遍

## 注意

由于Yes Steve Model`1.2.0`版本开始更新了加密算法，所以本项目目前只能解密`1.1.5`版本及更早版本导出的文件，新加密算法相对复杂，目前还没有办法解密

### 如何区分模型是那个版本导出的
  `使用记事本打开.ysm文件`，如果文件的开头有类似这样的标注说明此文件是1.2.0版本导出的
``` 
YSGP
----------------------- [ Property ] -----------------------
<name> xxxxx
<authors> xxxxx
<license> xxxxx
<free> xxxxx
<hash> xxxxx
```
否则就是1.1.5版本及更早版本导出的文件

## 使用方法

安装依赖
```
npm install
```
或
```
pnpm install
```

打开`src/main.ts`，找到以下内容
```typescript
YSMFileDecryptor("input/your_ysm_file.ysm")
```

将里面的`input/your_ysm_file.ysm`替换为你ysm文件的路径

最后运行
```
npm run dev
```
如果没有意外出现，那么在`output`文件夹下会有一个与你文件名称对应的文件夹出现，里面就是解密后的模型、贴图以及动画

## 最后

这个项目是我用来练手的，而且由于我的Java功底稀碎，这个项目用了整整一天才完成，使用TS重写完全是因为我比较熟悉Nodejs加上我觉得Java的环境搭建太麻烦

另外，这个项目目前只能解密本地的.ysm文件，如果你的模型是游戏服务器分发的则无法解密