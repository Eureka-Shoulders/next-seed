FROM node:16-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

RUN echo 'yarn-offline-mirror ".yarn-cache/"' >> .yarnrc
RUN echo 'yarn-offline-mirror-pruning true' >> .yarnrc

COPY package.json yarn.lock ./
COPY .yarn-cache ./.yarn-cache

RUN yarn install --frozen-lockfile

FROM node:16-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG api_url
ENV API_URL=$api_url
ENV NEXT_PUBLIC_SENTRY_DSN=$sentry_dsn
ENV SENTRY_AUTH_TOKEN=$sentry_auth_token
ENV SENTRY_ORG=$sentry_org
ENV SENTRY_PROJECT=$sentry_project
ENV SENTRY_URL=$sentry_url

RUN yarn build

FROM node:16-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ARG api_url
ENV API_URL=$api_url
ENV NEXT_PUBLIC_SENTRY_DSN=$sentry_dsn
ENV PORT 3000

CMD ["node", "server.js"]