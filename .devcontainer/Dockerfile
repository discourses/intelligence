# Base Image
FROM python:3.13.13-bookworm

# If the steps of a `Dockerfile` use files that are different from the `context` file, COPY the
# file of each step separately; and RUN the file immediately after COPY
WORKDIR /app
COPY /.devcontainer/requirements.txt /app


# Environment
SHELL [ "/bin/bash", "-c" ]


# Setting-up
RUN apt update && apt -q -y upgrade && apt -y install vim && apt -y install sudo && \
    sudo apt -y install graphviz && sudo apt -y install wget && sudo apt -y install curl && \
    sudo apt -y install unzip && \
    pip install --upgrade pip && \
    pip install --requirement /app/requirements.txt --no-cache-dir


# Port
EXPOSE 8000


# ENTRYPOINT
ENTRYPOINT ["bash"]
