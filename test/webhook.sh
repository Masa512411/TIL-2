#!/bin/bash
url=https://hooks.slack.com/services/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
if [ $# -ge 1 ]; then
msg=$@
else
	msg="HI"
fi
payload='{"text": "'$msg'", "link_names": 1}'
echo Try send $payload to Slack channel
curl -X POST -H 'Content-type: application/json' \
--data "$payload" $url
