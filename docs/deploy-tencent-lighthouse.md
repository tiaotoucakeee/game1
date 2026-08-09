# 腾讯云轻量应用服务器 · 部署指南

> 目标：让《不存在的学生》在国内 **不用 VPN** 可访问。  
> 本项目是 **Next.js 全栈**（含 `/api/ani/chat`），需 Node 运行时，**不能**只当静态网页上传。

---

## 零成本路线：新用户免费试用（推荐先看这节）

适合：**不想花钱、但要稳定链接 1～3 个月**（答辩 / 给同学玩）。

### A. 领取免费试用

1. 注册 [腾讯云](https://cloud.tencent.com) 并完成 **实名认证**（个人即可）
2. 打开 **[云产品免费试用](https://cloud.tencent.com/act/pro/free)** 或 [FreeTier 专场](https://www.tencentcloud.com/act/pro/FreeTier?lang=zh)
3. 找到 **轻量应用服务器（Lighthouse）** → 点 **免费试用 / 立即领取**
4. 常见配置：**2核 2G**（个人），时长 **1～3 个月**（以活动页为准，**每日限量**，建议上午抢）
5. 选 **国内地域**（上海 / 北京 / 广州）、镜像 **Ubuntu 22.04** 或 **Docker CE**
6. 设置 **root 密码**，提交创建

**领不了时常见原因：**

- 该实名主体 **以前买过/试用过** 轻量（换账号也无效，同身份证只能一次）
- 当日 **名额抢完**，隔天再试
- 未完成实名认证

**重要：**

- 试用期内 **0 元**；**到期不续费** 一般不会再扣钱，但实例会停、链接失效
- **不要手动销毁** 试用实例，有的活动销毁后不能再领
- 答辩前在手机日历设 **到期提醒**，需要的话再续费（新用户续费常有折扣，见 [轻量特惠](https://cloud.tencent.com/act/pro/lhsale)）

### B. 试用实例创建后

从下面 **「第 2 步：放行端口」** 开始做到 **第 8 步**，与付费版完全相同。

访问地址仍是：`http://你的公网IP:3000`

---

## 第 0 步：你需要准备

| 物品 | 说明 |
|------|------|
| 腾讯云账号 | [cloud.tencent.com](https://cloud.tencent.com) 注册并完成实名 |
| 代码 | 本地项目或 Gitee/GitHub 仓库 |
| （可选）Kimi API Key | [platform.moonshot.cn](https://platform.moonshot.cn) 创建；不配则 Ani 走演示模式，主线可玩 |
| SSH 工具 | Windows 可用 **PowerShell**、**Windows Terminal**，或 [FinalShell](https://www.hostbuf.com/) / PuTTY |

---

## 第 1 步：购买轻量应用服务器

> 若已按上文 **免费试用** 领取，可 **跳过本节**，直接去第 2 步。

1. 打开 [轻量应用服务器控制台](https://console.cloud.tencent.com/lighthouse)
2. 点击 **新建** / **购买**
3. 推荐配置（课程作业够用）：
   - **地域**：选离玩家近的国内节点（如 **上海 / 北京 / 广州**）
   - **镜像**：**Ubuntu 22.04** 或 **Docker CE**（带 Docker 更省事）
   - **套餐**：2核 2G 或 2核 4G 即可
   - **时长**：1 个月起
4. 设置 **root 密码**（务必记住）
5. 购买完成后，在实例列表记下 **公网 IP**（例如 `43.xxx.xxx.xxx`）

---

## 第 2 步：放行端口（防火墙）

1. 点进你的实例 → **防火墙** 标签
2. **添加规则**：

| 应用类型 | 协议 | 端口 | 策略 |
|----------|------|------|------|
| 自定义 | TCP | 3000 | 允许 |
| HTTP（可选） | TCP | 80 | 允许 |
| HTTPS（可选） | TCP | 443 | 允许 |

> 先用 **3000** 访问即可；以后绑域名再加 80/443。

---

## 第 3 步：SSH 登录服务器

### Windows（PowerShell）

```powershell
ssh root@你的公网IP
```

首次连接输入 `yes`，再输入 root 密码。

### 若连接失败

- 控制台确认实例 **运行中**
- 防火墙已放行 **22**（SSH 默认）
- 本地网络未屏蔽 22 端口

---

## 第 4 步：安装 Docker（镜像里没有的话）

登录后执行：

```bash
curl -fsSL https://get.docker.com | sh
systemctl enable docker
systemctl start docker
docker --version
```

应看到 `Docker version ...`。

---

## 第 5 步：把代码弄到服务器上

### 方式 A：Git 克隆（推荐）

**先把代码推到 Gitee / GitHub**（不要提交 `.env.local`）。

```bash
cd /opt
git clone https://gitee.com/你的用户名/你的仓库.git cuc-game
cd cuc-game
```

### 方式 B：本地上传 zip

1. 本地打包项目（**不要**包含 `node_modules`、`.next`）
2. 用 **WinSCP / FinalShell** 上传到服务器 `/opt/cuc-game`
3. SSH 里：`cd /opt/cuc-game`

---

## 第 6 步：配置环境变量

在项目目录创建 `.env`（仅服务器本地，勿提交 Git）：

```bash
cd /opt/cuc-game
nano .env
```

写入（按需修改）：

```env
ANI_KIMI_API_KEY=sk-你的密钥
ANI_KIMI_MODEL=moonshot-v1-8k
```

- 没有 Kimi Key：**整文件可以不建**，Ani 自动演示模式
- 保存：`Ctrl+O` 回车，`Ctrl+X` 退出

---

## 第 7 步：构建并启动（Docker Compose）

项目根目录已提供 `docker-compose.yml`：

```bash
cd /opt/cuc-game
docker compose up -d --build
```

首次会构建几分钟。完成后：

```bash
docker compose ps
docker compose logs -f --tail=50
```

看到服务在跑、无报错即可 `Ctrl+C` 退出日志。

---

## 第 8 步：浏览器访问

打开：

```text
http://你的公网IP:3000
```

应能看到邮箱首页。把该链接发给同学即可（国内一般无需 VPN）。

---

## 第 9 步：常用运维命令

```bash
cd /opt/cuc-game

# 查看状态
docker compose ps

# 查看日志
docker compose logs -f

# 代码更新后重新部署
git pull          # 若用 Git
docker compose up -d --build

# 停止
docker compose down

# 重启
docker compose restart
```

---

## 第 10 步（可选）：用 80 端口 / 绑域名

### 仅想用 80 端口（仍用 IP 访问）

改 `docker-compose.yml` 端口映射为 `"80:3000"`，防火墙放行 80，然后：

```bash
docker compose up -d
```

访问：`http://你的公网IP`

### 绑定自己的域名

1. 域名 DNS **A 记录** 指向服务器公网 IP  
2. **`.cn` 等国内接入通常需 ICP 备案**（约 1–3 周）；答辩赶时间可继续用 IP  
3. 可在服务器装 Nginx + Let's Encrypt 证书（进阶，可后续再做）

---

## 故障排查

| 现象 | 处理 |
|------|------|
| 浏览器打不开 | 检查防火墙是否放行 3000；`docker compose ps` 是否在跑 |
| 构建失败 | 服务器内存不足：选 4G 套餐，或加 swap |
| Ani 一直演示模式 | 检查 `.env` 里 `ANI_KIMI_API_KEY`；`docker compose up -d --build` 重建 |
| 页面 502 | `docker compose logs` 看 Node 是否崩溃 |
| 更新代码不生效 | 必须 `docker compose up -d --build` 重新构建 |

---

## 安全提醒

- **不要**把 `ANI_KIMI_API_KEY` 提交到 Git  
- 生产环境建议改 SSH 端口、禁用 root 密码登录改用密钥（课程演示可暂缓）  
- 服务器到期记得续费或备份

---

## 与 Netlify 的区别

| | Netlify | 腾讯云轻量 |
|--|---------|------------|
| 国内访问 | 不稳定 | 稳定 |
| 部署方式 | 连 Git 自动构建 | SSH + Docker 自己构建 |
| API 路由 | 支持 | Docker 内支持 |
| 费用 | 有免费档 | 约几十元/月 |

Netlify 可保留作海外备份；**国内分享请用轻量 IP 链接**。
