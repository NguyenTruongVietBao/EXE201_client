
echo "📥 Pulling latest code..."
git pull

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building project..."
npm run build

echo "🧹 Cleaning old build..."
sudo rm -rf /var/www/html/*

echo "📤 Deploying new build..."
sudo cp -r dist/* /var/www/html/

echo "✅ Done: Frontend deployed successfully!"
