FROM maven:3.9-eclipse-temurin-17-alpine as builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean install


FROM openjdk:17-alpine

COPY --from=builder /app/target/*.jar java-app.jar

ENTRYPOINT ["java","-jar","/java-app.jar"]