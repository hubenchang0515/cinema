# CINEMA

![预览](./images//preview1.png)
![预览](./images//preview2.png)

## Build & Run

```bash
npm install                             # 安装依赖
npx next build                          # 构建前端
sudo docker image build -t cinema .     # 生成 docker 镜像
sudo docker run -p 80:80 -d cinema      # 启动 docker 容器
```

