FROM openjdk:11-jre-slim

ENV APPLICATION_USER app
RUN useradd $APPLICATION_USER

RUN mkdir /opt/app
RUN mkdir /opt/app/jar
RUN mkdir /opt/app/db

RUN chown -R $APPLICATION_USER /opt/app

COPY ./db_data/wortschatz_dev.db /opt/app/db/wortschatz.db
COPY ./build/distributions/wortschatz-api.tar /opt/app/wortschatz-api.tar

WORKDIR /opt/app/

RUN tar -xvf wortschatz-api.tar

USER $APPLICATION_USER

EXPOSE 8080

CMD ["/opt/app/wortschatz-api/bin/wortschatz-api"]
