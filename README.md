This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use Google Sheets for store addresses

1. Create project and API on [Google Cloud Console](https://console.cloud.google.com/)
2. Download the API Key in JSON format and insert the file in the root with the name `credentials.json`
3. Create a Sheet file on your Drive and get the ID of the sheet from the URL
4. The sheet file must have in Cell A1 written `Address`
