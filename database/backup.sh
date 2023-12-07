#!/bin/bash -x

# Ensure script stops when commands fail.
set -e

# Backup & compress our database to the temp directory.
rm -f /tmp/db-backup
if [ "$PRODUCTION" == "TRUE" ]; then
  sqlite3 /data/database.db "VACUUM INTO '/tmp/db-backup'"
else
  sqlite3 ./database.db "VACUUM INTO '/tmp/db-backup'"
fi
pigz -f /tmp/db-backup

# Upload backup to S3 using a rolling daily naming scheme.
# aws s3 cp /tmp/db.gz s3://mybucket/db-`date +%d`.gz

# about the file
file_to_upload=/tmp/db-backup.gz
bucket=gersomgersomgersom
filepath="/${bucket}/${file_to_upload}-$(date +%d%H)"

# metadata
dateValue=`date -R`
signature="PUT\n\n${contentType}\n${dateValue}\n${filepath}"

#s3 keys
s3_access_key=$S3_ACCESS_KEY_ID
s3_secret_key=$S3_SECRET_ACCESS_KEY

#prepare signature hash to be sent in Authorization header
signature_hash=$(node -e "console.log(require('crypto').createHmac('sha1', process.env.S3_SECRET_ACCESS_KEY).update('${signature}').digest('base64'))")

# actual curl command to do PUT operation on s3
wget --method=PUT \
  --header "Host: ${bucket}.s3.amazonaws.com" \
  --header "Date: ${dateValue}" \
  --header "Authorization: AWS ${s3_access_key}:${signature_hash}" \
  --body-file="${file_to_upload}" \
  "https://${bucket}.s3.amazonaws.com/${file_to_upload}"
# curl -X PUT --insecure -T "${file_to_upload}" \
#   -H "Host: ${bucket}.s3.amazonaws.com" \
#   -H "Date: ${dateValue}" \
#   -H "Authorization: AWS ${s3_access_key}:${signature_hash}" \
#   https://${bucket}.s3.amazonaws.com/${file_to_upload}

# Notify dead man that back up completed successfully.
# curl https://hc-ping.com/7c2484b0-af64-46f9-99e9-1aadc9226345/$? &> /dev/null
