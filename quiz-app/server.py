#!/usr/bin/env python3
from __future__ import annotations

import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT") or "8765")
# Force loopback — avoid bad HOST env values from shells/agents
HOST = "127.0.0.1"


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".css": "text/css",
        ".html": "text/html",
        ".jpg": "image/jpeg",
        ".png": "image/png",
    }


class ReusableServer(ThreadingHTTPServer):
    allow_reuse_address = True


def main() -> None:
    os.chdir(ROOT)
    httpd = ReusableServer((HOST, PORT), Handler)
    print(f"Part 107 Quiz Lab → http://{HOST}:{PORT}/ (pid {os.getpid()})", flush=True)
    httpd.serve_forever()


if __name__ == "__main__":
    main()
