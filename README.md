mkdir backend && cd backend
touch .env
mkdir src && cd src

npm init -y
npm i -D typescript
npx tsc --init
npm i -D @types/node

npm i express
npm i -D @types/express

npm i -D nodemon
npm i -D ts-node

# Include into "scripts" of package.json
"start": "nodemon --exec \"node --env-file=.env\" src/server.ts"

# Include into "compilerOptions" of tsconfig.json
"target": "ESNext",
"module": "NodeNext",
"types": ["node"],
"moduleResolution": "NodeNext",
"allowImportingTsExtensions": true,
"noEmit": true,
"esModuleInterop": true,

"sourceMap": false,
"declaration": false,
"declarationMap": false,

// Stricter Typechecking Options
"noUncheckedIndexedAccess": true,
"exactOptionalPropertyTypes": false,


npm i -D eslint
# Configs: JS, To check syntax and find problems, JS modules, None of these, Yes, Node, JS, Yes
npx eslint --init
# Append into the extends of eslint.config.js
, ...tseslint.configs.strict
# Execute code check
npx eslint .

# Include into "scripts" of package.json
"lint": "eslint ."
npm run lint

# Stack Utility
npm i mongoose
npm i envalid
npm i morgan
npm i -D @types/morgan

# Hook Up MongoDB 
npm i mongodb
# Insert into .env MongoDB Connection Key

# Authentication
npm i better-auth
# Insert into .env Better Auth Secret


# Create Frontend Folder
npm create vite@latest frontend -- --template react-ts && cd frontend
# Configs: Yes

npm i better-auth
npm i react-hook-form


# Cross-Origin Resource Sharing Gatekeeper
npm i cors
npm i -D @types/cors

npm i tailwindcss @tailwindcss/vite
npm i -D @types/node
