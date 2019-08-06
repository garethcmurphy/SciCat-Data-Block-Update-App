import * as request from "request-promise";
import { FilesInfo } from "./filesinfo";

class ReplaceOrig {
  base_url = "https://scicatapi.esss.dk/api/v3";
  token = "";

  postToScicat() {
    const uri = this.base_url;
    request.get(uri);
    const pid = "";
    // delete old orig for pid
    this.delete_old_orig(pid);
    // fetch file info
    const fileInfo = new FilesInfo("demo/nexus_00000490.hdf");
    const info = fileInfo.files;
    console.log(info);
    // add new orig
    this.add_new_orig(pid, info);
  }

  delete_old_orig(pid: string) {
    const delete_uri =
      this.base_url +
      "/Datasets/" +
      encodeURIComponent(pid) +
      "/origdatablocks";
    // const response = request.delete(delete_uri);
    console.log("deleting", delete_uri);
  }

  add_new_orig(pid: string, fileinfo: Object) {
    const orig = {
      size: 0,
      dataFileList: fileinfo,
      ownerGroup: "ess",
      accessGroups: ["loki"],
      datasetId: pid
    };

    const uri =
      this.base_url +
      "/Datasets/" +
      encodeURIComponent(pid) +
      "/origdatablocks" +
      this.token;
    console.log("adding new orig", pid);
    console.log("adding new orig", orig);
  }
}

if (require.main === module) {
  const fix = new ReplaceOrig();
}
