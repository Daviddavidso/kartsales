#!/usr/bin/env bash
# Заливка ФИНСЕЙЛС (число.online) на хостинг клиента по FTP.
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
  echo "FTP_DIR пуст. Открой $CREDS и впиши путь вида /www/xn--h1agjk2a.online"
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

# Панель reg.ru создала две папки под один домен: punycode и кириллическую.
# Какая из них отдаётся вебом — зависит от настроек хостинга, поэтому льём в обе.
DIRS=("$FTP_DIR")
[ -n "${FTP_DIR_ALT:-}" ] && DIRS+=("$FTP_DIR_ALT")

for dir in "${DIRS[@]}"; do
  echo "== $dir"
  for f in "${FILES[@]}"; do
    [ -f "$f" ] || { echo "ПРОПУЩЕН (нет файла): $f"; continue; }
    echo "→ $f"
    # --ftp-create-dirs создаёт css/ и js/ на той стороне; путь кодируем (кириллица в имени папки)
    curl --silent --show-error --fail \
         --ftp-create-dirs \
         --user "$FTP_USER:$FTP_PASS" \
         --upload-file "$f" \
         "ftp://$FTP_HOST$(python3 -c 'import sys,urllib.parse;print(urllib.parse.quote(sys.argv[1]))' "$dir/$f")"
  done
done

echo
echo "Готово. ${SITE_URL:-Сайт} обновлён."
echo "Если правки не видны — это кеш reg.ru на .js/.css (держит до 45 суток мимо .htaccess):"
echo "открой страницу с ?v=$(date +%s) или попроси хостинг сбросить кеш."
