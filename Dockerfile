FROM 'cypress/included:10.4.0'
RUN apt-get update && apt-get install -y python3-pip && \
  pip3 install requests
ENV CYPRESS_VIDEO=false
WORKDIR /usr/test
COPY ./package.json ./package.json
RUN npm install
COPY ./merge_launches.py ./merge_launches.py
COPY ./cypress.config.js ./cypress.config.js
COPY ./cypress ./cypress

CMD ["/bin/sh", "-c", "sleep 15"]