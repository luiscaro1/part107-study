#!/bin/zsh
set -e
cd "$(dirname "$0")"
open "$PWD/run-in-terminal.command"
# wait until up
for i in {1..40}; do
  if curl -fsS "http://127.0.0.1:8765/" >/dev/null 2>&1; then
    echo "OK → http://127.0.0.1:8765/"
    open "http://127.0.0.1:8765/"
    exit 0
  fi
  sleep 0.25
done
echo "Server did not come up — check the Terminal window."
exit 1
