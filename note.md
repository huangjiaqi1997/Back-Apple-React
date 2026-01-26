- public 中的文件打包不处理直接放入 dist 根目录。
- git 提交错：  
  echo "temp/" >> .gitignore 添加 ignore 规则  
  git rm -r --cached temp 从 git 中移除，但保留本地文件  
  git commit -m "忽略 temp 目录" 提交改动  
- git 保留空文件夹：
  文件夹内新建 .gitkeep
- package.json - name：全部小写无空格
- UI = f (state)
- CSS MODULE
- STYLED COMPONENTS (chrome插件) (CSS in JS)
- npx tsc --init