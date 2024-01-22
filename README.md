# YSM Decryptor

这是一个Minecraft模组[`Yes Steve Model`](https://www.curseforge.com/minecraft/mc-mods/yes-steve-model)使用的`.ysm`文件格式的解密工具

解密算法出自[`ysmdumper`](https://github.com/LLKawi/ysmdumper)项目，我仅仅只是将它用TypeScript重新实现了一遍

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