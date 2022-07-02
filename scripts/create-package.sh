#!/bin/bash
set -euo pipefail

# Required arguments.
if [ "$#" -ne 2 ]; then
    echo "Usage: create-package.sh {OUTPUT_DIR} {VERSION}"
    exit 1
fi

OUTPUT_DIR="$1"
VERSION="$2"

SANDBOX_DIR=/tmp/sandbox
PACKAGE_DIR="${SANDBOX_DIR?}/bowser-jr"
rm -rf "${PACKAGE_DIR?}"
mkdir -p "${PACKAGE_DIR?}" "${OUTPUT_DIR?}"
cp -LR packages/core/. README.md LICENSE "${PACKAGE_DIR?}"
rm -rf "${PACKAGE_DIR?}/src"
rm -rf "${PACKAGE_DIR?}/test"
rm -rf "${PACKAGE_DIR?}/node_modules"
rm -rf "${PACKAGE_DIR?}/tsconfig.json"
rm -rf "${PACKAGE_DIR?}/tsconfig.lib.json"
rm -rf "${PACKAGE_DIR?}/vite.config.ts"

OUTPUT="${OUTPUT_DIR?}/bowser-jr-${VERSION?}.zip"

cd "${PACKAGE_DIR?}" && zip -r "${OUTPUT?}" .

echo "${OUTPUT?}"