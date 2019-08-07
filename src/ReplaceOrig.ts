import * as request from "request-promise";
import { FilesInfo } from "./FilesInfo";
import { SearchScicat } from "./SearchScicat";
import * as fs from "fs";

class ReplaceOrig {
  base_url = "https://scicatapi.esss.dk/api/v3";
  token = "";

  async login() {
    const rawdata = fs.readFileSync("config.json", "utf-8");
    const config = JSON.parse(rawdata);
    const uri = this.base_url + "/Users/login";
    const loginOptions = {
      uri: uri,
      method: "PUT",
      body: config,
      json: true,
      rejectUnauthorized: false,
      requestCert: true
    };
    const response = await request.post(loginOptions);
    console.log(response);
    this.token = response.id;
  }

  async postToScicat() {
    await this.login();
    const search = new SearchScicat();
    const tag = "nicos_00000489";
    const results = await search.search(tag);
    const result = results[0];
    const uri = this.base_url;
    const pid = result["pid"];
    console.log("pid: ", pid);
    // delete old orig for pid
    this.deleteOldOrig(pid);
    // fetch file info
    const path = result["sourceFolder"]
    const fileInfo = new FilesInfo(path+"/"+tag+".hdf");
    const info = fileInfo.files;
    console.log(info);
    // add new orig
    this.add_new_orig(pid, info);
  }

  deleteOldOrig(pid: string) {
    const delete_uri =
      this.base_url +
      "/Datasets/" +
      encodeURIComponent(pid) +
      "/origdatablocks?access_token=" +
      this.token;
    const deleteOptions = {
      uri: delete_uri,
      rejectUnauthorized: false,
      requestCert: true
    };
    const response = request.delete(deleteOptions);
    console.log("deleting", response);
  }

  add_new_orig(pid: string, fileinfo: Object) {
    const orig = {
      size: fileinfo[0]["size"],
      dataFileList: fileinfo,
      ownerGroup: "ess",
      accessGroups: ["loki"],
      datasetId: pid
    };

    const uri =
      this.base_url +
      "/Datasets/" +
      encodeURIComponent(pid) +
      "/origdatablocks?access_token=" +
      this.token;
    console.log("adding new orig", pid);
    console.log("adding new orig", uri);

    let options3 = {
      url: uri,
      method: "PUT",
      body: orig,
      json: true,
      rejectUnauthorized: false,
      requestCert: true
    };
    request.post(options3);
  }
}

if (require.main === module) {
  const fix = new ReplaceOrig();
  fix.postToScicat();
}
