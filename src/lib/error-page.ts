export function renderErrorPage(message = "Something went wrong. Please try again later."): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Error — YatraNexus</title>
  <style>
    body { font-family: system-ui, sans-serif; display: flex; min-height: 100vh; align-items: center; justify-content: center; margin: 0; background: #f8fafc; color: #0f172a; }
    .box { max-width: 28rem; padding: 2rem; text-align: center; }
    h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
    p { color: #64748b; font-size: 0.875rem; margin: 0; }
  </style>
</head>
<body>
  <div class="box">
    <h1>Something went wrong</h1>
    <p>${message}</p>
  </div>
</body>
</html>`;
}
