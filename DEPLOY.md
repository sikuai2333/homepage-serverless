# 个人主页部署指南

本文档提供了将个人主页部署到各种serverless平台的详细步骤。由于该项目是纯静态网站，部署过程相对简单，无需配置后端服务。

## 部署选项

以下是几个推荐的serverless部署平台，它们都提供免费计划，适合个人网站使用：

### 1. Vercel

Vercel是一个流行的前端部署平台，特别适合静态网站和JAMstack应用。

**部署步骤：**

1. 注册[Vercel账户](https://vercel.com/signup)
2. 安装Vercel CLI（可选）：
   ```
   npm install -g vercel
   ```
3. 在项目根目录运行：
   ```
   vercel
   ```
   或者直接通过Vercel网站导入您的GitHub/GitLab/Bitbucket仓库

4. 按照提示完成部署配置

**优点：**
- 自动HTTPS
- 全球CDN
- 持续部署
- 自定义域名支持
- 免费计划慷慨

### 2. Netlify

Netlify是另一个流行的静态网站托管平台，提供丰富的功能。

**部署步骤：**

1. 注册[Netlify账户](https://app.netlify.com/signup)
2. 选择"从Git导入项目"或直接拖放您的网站文件夹
3. 如果从Git导入，授权Netlify访问您的仓库并选择要部署的分支
4. 配置构建设置（对于纯静态网站，可以留空）
5. 点击"部署站点