import mime from "https://dev.jspm.io/npm:mime/index.js";
async function handleRequest(request: Request) {
    const { pathname } = new URL(request.url);

    // This is how the proxy works:
    // 1. A request comes in for a specific asset.
    // 2. We construct a URL to that asset.
    // 3. We fetch the asset and respond to the request.

    // Check if the request is for style.css.
    var exts = ['.html', '.css', '.js']
    if (exts.some((ext) => pathname.endsWith(ext))) {
        const style = new URL('static'+pathname, import.meta.url)
        const response = await fetch(style)
        response.headers.set("content-type",mime.getType(pathname)+";charset=utf-8")
        return response;
    } else if (pathname.endsWith(".md")) {
        const markdownUrl = new URL(pathname, import.meta.url)
        const response = await fetch(markdownUrl)
        return new Response(await response.text())
    }

    return new Response(
        `<html>
        <head>
          <link rel="stylesheet" href="style.css" />
        </head>
        <body>
          <h1>Example</h1>
        </body>
      </html>`,
        {
            headers: {
                "content-type": "text/html; charset=utf-8",
            },
        },
    );
}

addEventListener("fetch", (event: FetchEvent) => {
    event.respondWith(handleRequest(event.request));
});