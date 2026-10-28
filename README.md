# myBody 产品官网

myBody Android 应用的独立产品介绍网站。采用静态 HTML、CSS 和 JavaScript，包含产品功能、真实界面展示、Android 内测版下载、常见问题和开源来源。

## 预览与部署

网站入口为 `dist/index.html`，无需安装依赖或执行构建。通过任意静态 HTTP 服务器提供 `dist/` 即可预览。

例如，在仓库根目录执行：

```sh
python -m http.server 4173 --directory dist
```

然后访问 `http://localhost:4173`。

在 Cloudflare Pages 等静态托管平台部署时，将生产分支设置为 `main`，构建命令留空，发布目录设置为 `dist`。

### 当前正式站点

- 正式地址：<https://mybodysite.pages.dev/>
- Cloudflare Pages 项目：`mybodysite`
- 发布方式：Wrangler 直接上传；当前未配置 GitHub 自动部署。
- 后续更新在完成 Git 提交与推送后，执行：

```sh
npx wrangler pages deploy dist --project-name mybodysite --branch main
```

本项目及后续项目默认使用用户自己的 Cloudflare 账号部署，不使用 OpenAI Sites。

## 目录

```text
dist/
  index.html       产品介绍页面
  styles.css       响应式样式
  main.js          导航、截图切换、放大及安装包下载
  assets/          品牌图标和真实 Android 测试截图
  downloads/       Android 安装包静态分片
  LICENSE.txt      页面可访问的 MIT 许可证
```

## Android 下载

网站提供 myBody **0.6.0 Android 内测版**，要求 Android 8.0 及以上。安装包采用调试证书签名，支持 arm64-v8a 和 x86_64。

- 原始文件名：`myBody-0.6.0-internal.apk`
- 完整大小：47,001,102 字节
- SHA-256：`8bebb25845cb830f471511f9400d5f2158f83b574723f5cee69163d44aad56ad`

为适配静态托管单文件大小限制，安装包拆为三个小于 20 MiB 的分片。浏览器按顺序下载、合并并完成 SHA-256 校验后，保存为原始 APK。请完整保留 `dist/downloads/` 中的三个文件。在线下载需 HTTPS，或在 localhost 预览，以使用浏览器加密校验 API。

下载安装前请备份已有数据。iPhone / iPad 入口：[myBody iOS 网页版](https://mybody-ios.pages.dev/)。使用 iOS 17+ Safari 打开，通过“分享 → 添加到主屏幕”使用；首次联网等待离线资源就绪。网页版数据存于独立站点本地，与 Android 不自动同步。官网提供入口及使用步骤，不直接存储身体记录。

## 截图与开源来源

官网使用用户本次提供并授权用于官网的三张深色 Android 实机截图：身体总览、变化趋势、阶段照片。截图数值仅展示应用界面，不代表使用效果。

- [myBody 应用源码](https://github.com/paulwatcegt-ui/myBody)
- [上游 PulseSense](https://github.com/SolarisXD/PulseSense)
- 许可证：MIT，保留 PulseSense 原版权说明，见 [LICENSE](LICENSE)。

官网参考 myGym 产品官网的信息组织方式，页面代码独立实现。采用统一深色视觉、myBody 品牌资源与用户提供的真实应用截图。
