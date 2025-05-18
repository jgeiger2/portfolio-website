#!/bin/bash
# Script to download the profile image

# Try to download directly (might not work due to permissions)
curl -L -o profile/profile.jpg https://cdn-uploads.huggingface.co/uploads/0f5e8a57ebda9cddae92e0dd/5C9FFB1B-4FD1-43F6-8EC0-FC49222D4109_1_105_c.jpeg

# If the above fails, you'll need to manually download the image
echo "If the download failed, please manually save your profile image as:"
echo "/public/images/profile/profile.jpg"
echo ""
echo "File size check:"
ls -la profile/profile.jpg 