# 部署说明文档

流浪动物救助领养平台部署说明，涵盖前端、后端和基础设施配置。

## 系统要求

### 服务器配置
- 操作系统：Ubuntu 20.04 LTS 或 CentOS 8+
- CPU：至少 2 核
- 内存：至少 4GB
- 存储：至少 50GB SSD
- 网络：稳定公网连接

### 软件依赖
- Node.js v16.x 或更高版本
- MySQL 8.0 或 PostgreSQL 12+
- Redis 6.x
- Nginx 1.18+
- Docker & Docker Compose（推荐）

## 部署步骤

### 1. 环境准备

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 安装 Node.js (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MySQL
sudo apt install mysql-server -y

# 安装 Nginx
sudo apt install nginx -y

# 安装 PM2 (全局)
sudo npm install -g pm2
```

### 2. 项目部署

```bash
# 克隆或上传项目代码到服务器
cd /var/www/
sudo git clone https://github.com/your-repo/love-home-platform.git

# 设置权限
sudo chown -R www-data:www-data love-home-platform
sudo chmod -R 755 love-home-platform
```

### 3. 后端配置

```bash
# 进入后端目录
cd /var/www/love-home-platform/backend

# 安装依赖
npm install

# 创建环境配置文件
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接和其他环境变量：

```bash
# 数据库配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=love_home_db
DB_USER=db_user
DB_PASS=password

# Redis 配置
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT 密钥
JWT_SECRET=your-super-secret-jwt-key

# 邮件配置
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# 七牛云或其他云存储配置
IMAGE_STORAGE_BUCKET=your-bucket-name
IMAGE_STORAGE_DOMAIN=your-domain.com
IMAGE_ACCESS_KEY=your-access-key
IMAGE_SECRET_KEY=your-secret-key
```

初始化数据库：

```bash
# 启动 MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# 登录 MySQL 并创建数据库
mysql -u root -p
CREATE DATABASE love_home_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'db_user'@'localhost' IDENTIFIED BY 'strong-password';
GRANT ALL PRIVILEGES ON love_home_db.* TO 'db_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# 运行数据库迁移（如果有迁移脚本）
npm run migrate
```

### 4. 启动后端服务

```bash
# 使用 PM2 启动后端
pm2 start app.js --name love-home-backend
pm2 startup
pm2 save
```

### 5. Nginx 配置

创建 Nginx 配置文件：

```bash
sudo nano /etc/nginx/sites-available/love-home-platform
```

配置内容：

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # 前端静态文件
    location / {
        root /var/www/love-home-platform/frontend/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # API 请求代理到后端
    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
    
    # 图片等静态资源
    location /uploads/ {
        alias /var/www/love-home-platform/uploads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}

# HTTPS 重定向配置（推荐）
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    
    # 同上配置...
}
```

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/love-home-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL 证书配置（推荐）

使用 Let's Encrypt 获取免费 SSL 证书：

```bash
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### 7. 定期备份配置

创建备份脚本：

```bash
sudo nano /var/www/love-home-platform/scripts/backup.sh
```

```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/love-home-platform"

mkdir -p $BACKUP_DIR

# 数据库备份
mysqldump -u db_user -p'password' love_home_db > $BACKUP_DIR/db_backup_$DATE.sql

# 配置文件备份
tar -czf $BACKUP_DIR/config_backup_$DATE.tar.gz /var/www/love-home-platform/config/

# 删除7天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete
```

设置定时任务：

```bash
crontab -e
# 添加以下行：每天凌晨2点执行备份
0 2 * * * /var/www/love-home-platform/scripts/backup.sh
```

### 8. 监控和日志

设置日志轮转：

```bash
sudo nano /etc/logrotate.d/love-home-platform
```

```
/var/www/love-home-platform/logs/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    copytruncate
    notifempty
}
```

## 维护命令

```bash
# 查看服务状态
pm2 status

# 查看日志
pm2 logs love-home-backend

# 重启服务
pm2 restart love-home-backend

# 部署更新
git pull origin main
npm install
# 如果有数据库变更，运行迁移
# npm run migrate
pm2 reload love-home-backend

# 查看系统资源使用情况
pm2 monit
```

## 安全考虑

1. 定期更新系统和软件包
2. 使用防火墙限制不必要的端口访问
3. 定期更换密码和密钥
4. 启用双因素认证
5. 监控异常登录尝试
6. 定期备份并测试恢复过程

## 故障排除

- 如果无法访问网站，检查 Nginx 和后端服务是否正在运行
- 如果数据库连接失败，检查 .env 文件中的配置
- 如果静态资源无法加载，检查 Nginx 配置和文件权限
- 如果 API 调用失败，检查后端服务日志