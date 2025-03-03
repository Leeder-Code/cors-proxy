# CORS Proxy Server

A simple proxy server built with Express and `http-proxy-middleware` to bypass CORS restrictions.  
It also includes an IP whitelist for security.

## Features
- **Bypass CORS** restrictions for any URL.
- **IP Whitelist** to allow only specific clients.
- **Custom User-Agent** to mimic browser requests.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Leeder-Code/cors-proxy.git
   cd cors-proxy
   ```

2. Install dependencies:
   ```sh
   yarn install
   ```

3. Create a `.env` file (optional) and define the port:
   ```
   PORT=3000
   ALLOWED_IPS=0.0.0.0
   ```

## Usage

Run the server:
```sh
yarn build
yarn start
```

Send a request:
```
http://localhost:3000/?url=https://jsonplaceholder.typicode.com/todos/1
```

## Security

The server only accepts requests from **whitelisted IPs**.  
Modify the `ALLOWED_IPS` array in `.env` to include your IPs:


```typescript
ALLOWED_IPS = 0.0.0.0,1.1.1.1
```

* \* for every ip