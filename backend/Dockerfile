FROM gradle:jdk11-alpine
LABEL name = "blueberrypie"
LABEL email = "wjdgmll77@naver.com"

RUN mkdir /srv/docker-server
WORKDIR /srv/docker-server
CMD chmod +x ./gradlew && ./gradlew bootJar && java -jar ./build/libs/backend-0.0.1-SNAPSHOT.jar
