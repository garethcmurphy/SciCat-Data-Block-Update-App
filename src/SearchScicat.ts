import * as request from "request-promise";

export class SearchScicat {
  api_url = "https://scicatapi.esss.dk/api/v3/";

  encoder(filter: Object) {
    const string = JSON.stringify(filter);
    const encode = encodeURIComponent(string);
    return encode;
  }

  async search(searchTerm: string) {
    const filter = { text: searchTerm };
    const limits = { limit: 1, order: "creationTime asc" };

    const encodeFilter = this.encoder(filter);
    const encodeLimit = this.encoder(limits);

    const uri =
      this.api_url +
      "Datasets/anonymousquery?fields=" +
      encodeFilter +
      "&limits=" +
      encodeLimit;
    const response = await request.get(uri);
    const array = JSON.parse(response);
    return array;
  }
}

if (require.main === module) {
  const fix = new SearchScicat();
  fix.search("nicos_00000332");
}
