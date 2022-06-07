FROM 'cypress/included:10.0.3'

ENV CYPRESS_VIDEO=false
WORKDIR /usr/test
COPY ./package.json ./package.json
RUN npm install
COPY ./cypress.config.js ./cypress.config.js
COPY ./reporter-config.json ./reporter-config.json
COPY ./cypress ./cypress
