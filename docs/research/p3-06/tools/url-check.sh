#!/usr/bin/env bash
# Read-only availability check of every source URL (GET, follows redirects, 25 s limit, 8 in parallel).
# Usage: bash tools/url-check.sh   (run from docs/research/p3-06; needs sources.json from audit-generate.mjs)
set -u
python3 - <<'PY' > /tmp/p3-06-urls.txt
import json
seen=set()
for s in json.load(open('sources.json')):
    if s['url'] not in seen:
        seen.add(s['url']); print(s['url'])
PY
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
check() { u="$1"; r=$(curl -sL -o /dev/null -A "$2" --max-time 25 -w "%{http_code}\t%{url_effective}\t%{num_redirects}" "$u" 2>/dev/null || echo "000\t-\t0"); printf "%s\t%s\n" "$u" "$r"; }
export -f check
xargs -P 8 -I{} bash -c 'check "$1" "$2"' _ {} "$UA" < /tmp/p3-06-urls.txt | sort > url-status.tsv
awk -F'\t' '{c[$2]++} END{for(k in c) print k, c[k]}' url-status.tsv | sort
