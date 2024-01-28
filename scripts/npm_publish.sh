#!/bin/bash

# Check if a version parameter is provided, default to patch if not
if [ -z "$1" ]; then
  VERSION="patch"
else
  VERSION="$1"
fi

# Publish the package with the specified version
npm version "$VERSION" && npm publish --access public
