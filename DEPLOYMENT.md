# Viza Digital - DigitalOcean Deployment Guide

Target Architecture: **Single Droplet ($12/mo)**
Components: Next.js (Client) + Fastify (Server) + PostgreSQL + Nginx

## Phase 1: Server Provisioning (DigitalOcean)
1. Log in to DigitalOcean.
2. Click **Create** -> **Droplets**.
3. **Region:** Choose one closest to your users (e.g., New York, Frankfurt).
4. **OS:** Ubuntu 24.04 (LTS) x64.
5. **Droplet Type:** Basic -> Regular -> $12/mo (2GB RAM / 1 CPU).
   * *Note: 1GB ($6) is risky for build processes.*
6. **Authentication:** Select "SSH Key" (Recommended) or Password.
7. **Create Droplet**.
8. Copy the **IP Address** once it's created (e.g., `192.168.1.1`).

## Phase 2: Server Setup
Open your local terminal and SSH into the server:
```bash
ssh root@<YOUR_DROPLET_IP>
```

### 1. Update & Install Tools
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y nginx git curl
```

### 2. Install Node.js (v20 LTS)
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2
```

### 3. Install PostgreSQL
```bash
sudo apt install -y postgresql postgresql-contrib
sudo systemctl start postgresql
```

## Phase 3: Database Configuration
1. Switch to postgres user:
   ```bash
   sudo -i -u postgres
   ```
2. Open SQL shell and create user/db:
   ```sql
   psql
   
   -- Inside SQL Shell --
   CREATE DATABASE viza_prod;
   CREATE USER viza_admin WITH ENCRYPTED PASSWORD 'replace_with_secure_password';
   GRANT ALL PRIVILEGES ON DATABASE viza_prod TO viza_admin;
   ALTER DATABASE viza_prod OWNER TO viza_admin;
   \q
   ```
3. Exit postgres user:
   ```bash
   exit
   ```

## Phase 4: Application Deployment
### 1. Clone Repository
```bash
cd /var/www
git clone <YOUR_GITHUB_REPO_URL> viza
cd viza
```

### 2. Setup Backend (Server)
```bash
cd server
cp .env.example .env 
# Edit .env with production values (DB URL, Port 8000)
nano .env 

npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
cd ..
```

### 3. Setup Frontend (Client)
```bash
cd client
nano .env.local
# Add: NEXT_PUBLIC_API_URL=https://<YOUR_DOMAIN>/api

npm ci
npm run build
cd ..
```

## Phase 5: Process Management (PM2)
Start both applications so they run in the background.

```bash
# Start Backend
cd server
pm2 start dist/server.js --name "viza-api"

# Start Frontend
cd ../client
pm2 start npm --name "viza-web" -- start
cd ..

# Save list
pm2 save
pm2 startup
```

## Phase 6: Reverse Proxy (Nginx)
Direct traffic: Domain -> Nginx -> Port 3000 (Web) / Port 8000 (API).

1. Create config:
   ```bash
   nano /etc/nginx/sites-available/viza
   ```

2. Add this configuration:
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com www.yourdomain.com;

       # Frontend (Next.js)
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }

       # Backend (API)
       location /api {
           proxy_pass http://localhost:8000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           
           # Increase limits for uploads if needed
           client_max_body_size 10M;
       }
   }
   ```

3. Enable site and restart Nginx:
   ```bash
   ln -s /etc/nginx/sites-available/viza /etc/nginx/sites-enabled/
   rm /etc/nginx/sites-enabled/default
   nginx -t
   systemctl restart nginx
   ```

## Phase 7: SSL (HTTPS)
Secure your site for free with Certbot.

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

**Done! Your Viza project is live.**
