# AWS Frontend Deployment

## Bucket Policy

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::frontendmastercard/*"
        }
    ]
}
```

## Deployment Steps

```bash
gatsby build
aws s3 sync public/ s3://mastercardeventbucket
```