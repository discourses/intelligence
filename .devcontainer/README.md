<br>

## Development Notes

> [!TIP]
> [lucide](https://lucide.dev)
> [icons & emojis](https://zensical.org/docs/authoring/icons-emojis/#included-icon-sets)

<br>

Launch an interactive environment via

```shell
docker run --rm -i -t -p 8000:8000 -w /app 
  --mount type=bind,src="$(pwd)",target=/app zen
```

Subsequently, launch a web server, i.e., `zensical server`, via

```shell
zensical serve -a 0.0.0.0:8000
```

or build

```shell
zensical build
```

or clean

```shell
zensical build --clean
```

<br>

### Remote Development

For this Python project/template, the remote development environment requires

* [Dockerfile](../.devcontainer/Dockerfile)
* [requirements.txt](../.devcontainer/requirements.txt)

An image is built via the command

```shell
docker build . --file .devcontainer/Dockerfile -t zen
```

On success, the output of

```shell
docker images
```

should include

<br>

| repository | tag    | image id | created  | size     |
|:-----------|:-------|:---------|:---------|:---------|
| zen        | latest | $\ldots$ | $\ldots$ | $\ldots$ |


<br>

Subsequently, run an instance of the image `zen` via:

```shell
docker run --rm -i -t -p 8000:8000 -w /app 
  --mount type=bind,src="$(pwd)",target=/app zen
```

<br>

Herein, `-p 8000:8000` maps the host port `8000` to container port `8000`.  Note, the container's working environment,
i.e., `-w`, must be inline with this project's top directory.  Additionally, visit the links for more about the flags/options $\rightarrow$

* --rm: [automatically remove container](https://docs.docker.com/engine/reference/commandline/run/#:~:text=a%20container%20exits-,%2D%2Drm,-Automatically%20remove%20the)
* -i: [interact](https://docs.docker.com/engine/reference/commandline/run/#:~:text=and%20reaps%20processes-,%2D%2Dinteractive,-%2C%20%2Di)
* -t: [tag](https://docs.docker.com/get-started/02_our_app/#:~:text=Finally%2C%20the-,%2Dt,-flag%20tags%20your)
* -p: [publish the container's port/s to the host](https://docs.docker.com/engine/reference/commandline/run/#:~:text=%2D%2Dpublish%20%2C-,%2Dp,-Publish%20a%20container%E2%80%99s)
* --mount type=bind: [a bind mount](https://docs.docker.com/engine/storage/bind-mounts/#syntax)
* -v: [volume](https://docs.docker.com/engine/storage/volumes/)

<br>

Get the name of a running instance of ``zen`` via:

```shell
docker ps --all
```

**Never deploy a root container**.

<br>

### Remote Development & Integrated Development Environments

An IDE (integrated development environment) is a helpful remote development tool.  The **IntelliJ
IDEA** set up involves connecting to a machine's Docker [daemon](https://www.jetbrains.com/help/idea/docker.html#connect_to_docker), the steps are

> * **Settings** $\rightarrow$ **Build, Execution, Deployment** $\rightarrow$ **Docker** $\rightarrow$ **WSL:** {select the linux operating system}
> * **View** $\rightarrow$ **Tool Window** $\rightarrow$ **Services** <br>Within the **Containers** section connect to the running instance of interest, or ascertain connection to the running instance of interest.

<br>

**Visual Studio Code** has its container attachment instructions; study [Attach Container](https://code.visualstudio.com/docs/devcontainers/attach-container).

<br>
<br>

<br>
<br>

<br>
<br>

<br>
<br>
