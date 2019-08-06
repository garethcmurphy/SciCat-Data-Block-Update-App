import * as request from "request-promise";

class ReplaceOrig {
    base_url = "https://scicatapi.esss.dk/api/v3";

    postToScicat() {
        const uri = this.base_url;
        request.get(uri);

    }

}


if (require.main === module) {
  const fix = new ReplaceOrig();
}