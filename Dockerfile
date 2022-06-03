FROM 'cypress/included:10.0.2'

ENV CYPRESS_VIDEO=false
WORKDIR /usr/test
COPY ./package.json ./package.json
RUN npm install
COPY ./cypress.config.js ./cypress.config.js
COPY ./reporter-config.json ./reporter-config.json
COPY ./cypress ./cypress


ENTRYPOINT ["/bin/sh", "-c" , "npm i && npm run cy:parallel && npm run allure:generate"]
