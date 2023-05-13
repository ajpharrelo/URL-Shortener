# URL Shortener
A very simple URL shortener created using NodeJS and express.

## How it works
This simple URL shortener functions by taking an ordinary long url,
and then saving it locally with an id attached, so that when a user requests the id they will be redirected to the original url.

## Saved data
The processed links are saved locally within the application root folder inside the **/data/** folder, they are stored with the following information.

- url, The original url.
- id, the unique id.
- useCount, the amount of times an id has been requested.

```
    {
        "url": "https://example.com/",
        "id": "mdg2zxnw",
        "useCount": 1
    },
```
The link system also ensures that the same url cannot be saved twice, instead the user will be given the existing id for the url.

## Usage
In ```app.js``` set ```hostname``` to the hostname of the server that will be implementing/running
the NodeJS application, then you should be all set.

```
const hostname = "https://your_host_here:8080";
```

## Screenshots
Index page

![URL shortener image](https://i.imgur.com/UI7wF0n.png)
