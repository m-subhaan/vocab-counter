#!/bin/bash

# Navigate to the backend directory
cd backend

# Run the test case
echo "Running test cases..."
echo "Running test case 1 : \"cat dog beautiful\"..."


TEST_RESPONSE=$(serverless invoke local --function calculateWordTypes --data '{"body": "{\"text\": \"cat dog beautiful\"}"}')
EXPECTED_RESPONSE='{"noun":2,"adjective":1}'

TEST_RESPONSE_BODY=$(echo $TEST_RESPONSE | jq -r .body)

if [ "$TEST_RESPONSE_BODY" == "$EXPECTED_RESPONSE" ]; then
    echo "Test case 1 passed!"
else
    echo "Test case 1 failed!"
    echo "Expected: $EXPECTED_RESPONSE"
    echo "Got: $TEST_RESPONSE_BODY"
    exit 1
fi

# Test case for empty message
echo "Running test case 2: empty message..."

TEST_RESPONSE=$(serverless invoke local --function calculateWordTypes --data '{"body": "{\"text\": \"\"}"}')
EXPECTED_RESPONSE="{}"
TEST_RESPONSE_BODY=$(echo $TEST_RESPONSE | jq -r .body)

if [ "$TEST_RESPONSE_BODY" == "$EXPECTED_RESPONSE" ]; then
    echo "Test case 2 passed!"
else
    echo "Test case 2 failed!"
    echo "Expected: $EXPECTED_RESPONSE"
    echo "Got: $TEST_RESPONSE_BODY"
    exit 1
fi

# If tests pass, deploy the Serverless application
echo "Deploying the Serverless application..."

DEPLOYMENT_LOG=$(npm run deploy)

# Extract the endpoint URL
ENDPOINT_URL=$(echo "$DEPLOYMENT_LOG" | grep -o 'https://[^ ]*')

# Navigate back to the root directory
cd ..

# Write the endpoint URL to an .env file in the frontend directory
echo "REACT_APP_API_ENDPOINT=$ENDPOINT_URL" > ./frontend/.env
