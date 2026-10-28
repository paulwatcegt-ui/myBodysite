# 官网部署

- 本项目使用用户自己的 Cloudflare Pages，不使用 OpenAI Sites。
- Cloudflare Pages 项目名：`mybodysite`；生产分支：`main`；发布目录：`dist`。
- 正式地址：https://mybodysite.pages.dev/
- 本项目使用 GitHub Actions 调用 Wrangler 发布至现有 Pages 项目。`main` 分支的 `dist/` 或部署工作流变更会触发自动发布，也可在 Actions 中手动运行。首次启用需要仓库 Secret `CLOUDFLARE_API_TOKEN`。
- 手动应急发布可使用 `npx wrangler pages deploy dist --project-name mybodysite --branch main`。
- 复用已有 Cloudflare 登录，不将令牌、登录文件或其他凭据提交至仓库。
