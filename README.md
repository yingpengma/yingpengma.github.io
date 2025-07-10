<h1 align="center">Academic-Page</h1>

## 🚀 快速开始

### 环境要求

- Ruby 2.6.0 或更高版本
- Bundler 2.4.22
- Git

### 安装步骤

1. **克隆仓库**
   ```bash
   git clone https://github.com/yingpengma/yingpengma.github.io.git
   cd yingpengma.github.io
   ```

2. **安装依赖**
   ```bash
   # 设置 Ruby Gem 路径
   export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
   
   # 安装 Bundler
   gem install bundler:2.4.22 --user-install
   
   # 配置本地安装路径
   bundle config set --local path 'vendor/bundle'
   
   # 安装项目依赖
   bundle install
   ```

3. **启动本地服务器**
   ```bash
   # 使用提供的脚本
   bash run_server.sh
   
   # 或直接运行
   export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"
   bundle exec jekyll serve
   ```

4. **访问网站**
   
   在浏览器中打开 [http://localhost:4000](http://localhost:4000)


## 🛠️ 常见问题

### 权限问题
如果遇到 Ruby Gem 安装权限问题，使用 `--user-install` 参数：
```bash
gem install bundler --user-install
```

### 端口占用
如果 4000 端口被占用，可以指定其他端口：
```bash
bundle exec jekyll serve --port 4001
```

### 样式不生效
清除缓存并重新构建：
```bash
bundle exec jekyll clean
bundle exec jekyll serve --force_polling
```

## 📄 许可证

本项目基于 MIT 许可证开源。

## 🙏 致谢

本仓库受到以下项目的启发，尤其是AcadHomepage：
- [RayeRen/acad-homepage.github.io](https://github.com/RayeRen/acad-homepage.github.io) (MIT License)
- [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io) (MIT License)