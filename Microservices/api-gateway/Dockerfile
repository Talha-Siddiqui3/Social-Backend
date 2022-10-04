#Development stage (used for building the initial image with all the dev dependencies)

FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#Creates nest dist directory with all the nest js generated code
RUN npm run build

#Production stage (uses the previous dev built image and now only installs the production libraries to keep
#image as lightweight as possible)

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

# Copy the dist folder from the developmet stage to dist folder in production stage
COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]