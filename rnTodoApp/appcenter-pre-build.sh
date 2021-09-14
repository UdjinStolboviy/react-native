#!/bin/bash
#cd ${APPCENTER_SOURCE_DIRECTORY}

FILE=.env
if [ ${ENV} == 'dev' ]
then
  FILE=.env.dev
elif [ ${ENV} == 'staging' ]
then
    FILE=.env.staging
else
  FILE=.env.prod
fi

touch ${FILE}
echo "ENV=${ENV}" >> ${FILE}
echo "APP_NAME=${APP_NAME}" >> ${FILE}
echo "APP_BUNDLE_ID=${APP_BUNDLE_ID}" >> ${FILE}
echo "APP_VERSION=${APPCENTER_BUILD_ID}" >> ${FILE}
echo "FACEBOOK_APP_ID=${FACEBOOK_APP_ID}" >> ${FILE}
echo "LINKED_IN_CLIENT_ID=${LINKED_IN_CLIENT_ID}" >> ${FILE}
echo "LINKED_IN_CLIENT_SECRET=${LINKED_IN_CLIENT_SECRET}" >> ${FILE}
echo "LINKED_IN_REDIRECT_URL=${LINKED_IN_REDIRECT_URL}" >> ${FILE}
echo "GOOGLE_WEB_CLIENT_ID=${GOOGLE_WEB_CLIENT_ID}" >> ${FILE}
echo "DOMAIN=${DOMAIN}" >> ${FILE}
echo "API_VERSION=${API_VERSION}" >> ${FILE}
echo "UPLOAD_CARE_KEY=${UPLOAD_CARE_KEY}" >> ${FILE}
echo "DEEP_LINK_PREFIX=${DEEP_LINK_PREFIX}" >> ${FILE}
echo "GOOGLE_REVERSED_CLIENT_ID=${GOOGLE_REVERSED_CLIENT_ID}" >> ${FILE}
echo "APP_STORE_ID=${APP_STORE_ID}" >> ${FILE}

echo "ENV FILE -->"
echo ${FILE}
echo "All files:"
ls -a
cat ${FILE}


