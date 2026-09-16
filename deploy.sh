#!/usr/bin/env bash
# Заливка КАРТСЕЙЛС на хостинг клиента по FTP.
# Доступы лежат отдельно от проекта: ~/.kartsales-ftp (не попадают в репозиторий).
#
#   bash deploy.sh          — залить всё
#   bash deploy.sh --list   — только показать, что будет залито
#
set -euo pipefail

CREDS="$HOME/.kartsales-ftp"
[ -f "$CREDS" ] || { echo "Нет файла с доступами: $CREDS"; exit 1; }
# shellcheck disable=SC1090
source "$CREDS"

: "${FTP_HOST:?не задан FTP_HOST}"
: "${FTP_USER:?не задан FTP_USER}"
: "${FTP_PASS:?не задан FTP_PASS}"
if [ -z "${FTP_DIR:-}" ]; then
  echo "FTP_DIR пуст. Клиент ещё не назвал домен — открой $CREDS и впиши путь вида /www/domain.ru"
  exit 1
fi

# Проверка логина до заливки: сервер отдаёт 530 ещё на USER, если аккаунта нет.
if ! curl --silent --show-error --fail --max-time 30 \
          --user "$FTP_USER:$FTP_PASS" "ftp://$FTP_HOST/" >/dev/null 2>&1; then
  echo "FTP не пускает ($FTP_USER@$FTP_HOST)."
  echo "Проверь доступы в $CREDS. Повторно долбить логин не надо — reg.ru банит IP за перебор."
  exit 1
fi

cd "$(dirname "$0")"

# Жёсткий список: заливаем только то, что нужно сайту.
FILES=(
  "index.html"
  "css/style.css"
  "js/data.js"
  "js/app.js"
)

if [ "${1:-}" = "--list" ]; then
  printf '%s\n' "${FILES[@]}"
  exit 0
fi

for f in "${FILES[@]}"; do
  [ -f "$f" ] || { echo "ПРОПУЩЕН (нет файла): $f"; continue; }
  echo "→ $f"
  # --ftp-create-dirs создаёт css/ и js/ на той стороне
  curl --silent --show-error --fail \
       --ftp-create-dirs \
       --user "$FTP_USER:$FTP_PASS" \
       --upload-file "$f" \
       "ftp://$FTP_HOST$FTP_DIR/$f"
done

echo
echo "Готово. ${SITE_URL:-Сайт} обновлён."
echo "Если правки не видны — это кеш reg.ru на .js/.css (держит до 45 суток мимо .htaccess):"
echo "открой страницу с ?v=$(date +%s) или попроси хостинг сбросить кеш."
