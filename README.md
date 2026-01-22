# Prueba tecnica

Este proyecto corresponde a una prueba tecnica.

## Consumo de datos

Para el consumo de la data se opto por usar una API en Google App Script como proxy para poder consultar `https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json` en localhost.

Dentro del App Script solo se tiene lo siguiente:

```js
function doGet() {
  const url = "https://recruiting-datasets.s3.us-east-2.amazonaws.com/data_melp.json";
  const res = UrlFetchApp.fetch(url, { muteHttpExceptions: true });

  const jsonText = res.getContentText();
  return ContentService
    .createTextOutput(jsonText)
    .setMimeType(ContentService.MimeType.JSON);
}
```
