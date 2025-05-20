#!/bin/bash

# Create placeholder images for blog posts
# This script downloads placeholder images from placehold.co

# Ensure we're in the placeholder directory
cd "$(dirname "$0")"

# Download placeholder images
curl -o blog-placeholder-1.jpg "https://placehold.co/800x400/369/fff.jpg?text=Blog+Post+1"
curl -o blog-placeholder-2.jpg "https://placehold.co/800x400/336/fff.jpg?text=Blog+Post+2"
curl -o blog-placeholder-3.jpg "https://placehold.co/800x400/963/fff.jpg?text=Blog+Post+3"

echo "Placeholder images downloaded successfully!" 