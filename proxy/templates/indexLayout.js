module.exports = (title, body, scripts) => `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <link type="text/html" rel="stylesheet" href="/styles.css">
      <link href="https://fonts.googleapis.com/css?family=Raleway:400,700|Roboto:400,700" rel="stylesheet">
      <link rel="shortcut icon" href="http://res.cloudinary.com/madlicorice/image/upload/v1520448614/WeGot-favicon.ico">
      <title>${title}</title>
    </head>
    <body>
    ${body}
    ${scripts}
    </body>
  </html>
`;
