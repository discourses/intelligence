<br>

### Remote Development

The directive


```shell
docker build . --file .node/Dockerfile -t initial
```

builds an image named *initial*.  Subsequently,


```shell
docker run --rm -i -t -p 5000:5000 -p 5173:5173 -p 4173:4173 -p 3000:3000 -p 6006:6006
    -w /app --mount type=bind,src="$(pwd)",target=/app 
        -v ~/.aws:/root/.aws initial
```

launches an instance of the image *initial*.

<br>
<br>

### Extra

The `npm` version:

```shell
npm --version
```

Listing installations:

```shell
npm ls --omit=dev
```

Installation details of a single package:

```shell
npm list {package.name}
```

<br>
<br>

<br>
<br>

<br>
<br>

<br>
<br>
