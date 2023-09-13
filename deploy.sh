
cd backend

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

echo "Deploying the Serverless application..."

DEPLOYMENT_LOG=$(npm run deploy)

ENDPOINT_URL=$(echo "$DEPLOYMENT_LOG" | grep -o 'https://[^ ]*')

cd ..

echo "REACT_APP_API_ENDPOINT=$ENDPOINT_URL" > ./frontend/.env

cd frontend
echo "Running frontend tests..."
npm test -- --watchAll=false

if [ $? -ne 0 ]; then
    echo "Frontend tests failed!"
    exit 1
fi

echo "Building React frontend..."
npm install
echo ""
npm run build


echo "Deploying frontend to S3..."
aws s3 sync build/ s3://mys3bucketzizo --delete

echo "Deployment complete!"