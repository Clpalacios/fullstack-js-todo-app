FROM openjdk:8-jdk-alpine as BUILD

RUN mkdir -p /src/app
WORKDIR /src/app
COPY . ./

RUN ./gradlew --no-daemon build

CMD ["java", "-jar", "./build/libs/todo-app-1.0.0.jar"]