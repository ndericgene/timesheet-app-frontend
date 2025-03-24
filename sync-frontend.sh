#!/bin/bash

PEM="$HOME/.ssh/timesheet-backend-key.pem"
REMOTE="ubuntu@3.144.222.214"
APP_PATH="/home/ubuntu/timesheet-app-frontend"

echo "== Syncing updated frontend files..."
rsync -avz --exclude node_modules --exclude build \
  -e "ssh -i $PEM" ~/centralmech-backups/timesheet-frontend/ $REMOTE:$APP_PATH

echo "== Running build remotely..."
ssh -i "$PEM" $REMOTE "cd $APP_PATH && ./deploy.sh"

echo "== ✅ Frontend synced and rebuilt"
