import * as request from "request-promise";

export class GetApi {
  api_url: string;

  constructor() {
    this.api_url = "https://scitest.esss.lu.se/api/v3";
    this.api_url = "https://scicat.esss.se/api/v3";
  }

  get() {
    return this.api_url;
  }
}
