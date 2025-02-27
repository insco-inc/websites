FROM node:18-alpine AS base
LABEL org.opencontainers.image.authors="kjxbyz <kjxbyz888@outlook.com>"
LABEL org.opencontainers.image.source="https://github.com/insco-inc/websites"
LABEL org.opencontainers.image.description="Websites."
LABEL org.opencontainers.image.licenses=MIT
RUN npm install -g pnpm@10.2.1
WORKDIR /app
COPY . .

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

FROM base AS builder
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
ARG GIT_COMMIT_SHA
ARG GOOGLE_ID
ARG COOKIE_BANNER_ID
ARG SHOW_PARTICLES
ARG WEBSITE_GLOBAL_GRAY
ARG DISQUS_SHORTNAME

RUN echo -e "==============================\n\
Build Environment Information\n\
==============================\n\
Vercel Git Commit SHA: ${GIT_COMMIT_SHA:-Not Provided}\n\
Google ID: ${GOOGLE_ID:-Not Provided}\n\
Cookie Banner ID: ${COOKIE_BANNER_ID:-Not Provided}\n\
Show Particles: ${SHOW_PARTICLES:-Not Provided}\n\
Website Global Gray: ${WEBSITE_GLOBAL_GRAY:-Not Provided}\n\
Disqus Shortname: ${DISQUS_SHORTNAME:-Not Provided}\n\
=============================="

ENV COMMIT_REF=${GIT_COMMIT_SHA}
ENV GOOGLE_ID=${GOOGLE_ID}
ENV COOKIE_BANNER_ID=${COOKIE_BANNER_ID}
ENV SHOW_PARTICLES=${SHOW_PARTICLES}
ENV WEBSITE_GLOBAL_GRAY=${WEBSITE_GLOBAL_GRAY}
ENV DISQUS_SHORTNAME=${DISQUS_SHORTNAME}
RUN pnpm build

FROM base AS runner
COPY --from=builder /app/.contentlayer /app/.contentlayer
COPY --from=builder /app/.next /app/.next
COPY --from=prod-deps /app/node_modules /app/node_modules
EXPOSE 3000
CMD ["pnpm", "start"]
