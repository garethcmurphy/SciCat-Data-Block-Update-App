import * as request from "request-promise";
import { FilesInfo } from "./filesinfo";

class ReplaceOrig {
  base_url = "https://scicatapi.esss.dk/api/v3";

  postToScicat() {
    const uri = this.base_url;
    request.get(uri);
    // delete old orig for pid
    // fetch file info
    const fileInfo = new FilesInfo("demo/nexus_00000490.hdf");
    const info = fileInfo.files;
    console.log(info);
    // add new orig
  }

  delete_old_orig(pid: string) {
    console.log("deleting", pid);
  }

  add_new_orig(pid: string) {
    console.log("adding new orig", pid);
  }
}

if (require.main === module) {
  const fix = new ReplaceOrig();
}
