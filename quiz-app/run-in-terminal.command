#!/bin/zsh
cd "$(dirname "$0")"
export PORT=8765
# Clear bad HOST from environment if inherited
unset HOST
echo "Starting Part 107 Quiz Lab on http://127.0.0.1:8765/"
echo "Leave this Terminal window open while you study."
echo "Press Ctrl+C to stop."
echo
/usr/bin/python3 ./server.py
