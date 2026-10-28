# 官网部署

- 本项目使用用户自己的 Cloudflare Pages，不使用 OpenAI Sites。
- Cloudflare Pages 项目名：`mybodysite`；生产分支：`main`；发布目录：`dist`。
- 正式地址：https://mybodysite.pages.dev/
- 本项目采用 Wrangler 直接上传。代码推送至 GitHub 后，还需执行 `npx wrangler pages deploy dist --project-name mybodysite --branch main` 才会更新正式站点。
- 复用已有 Cloudflare 登录，不将令牌、登录文件或其他凭据提交至仓库。
