import { lstatSync, readdirSync, statSync } from "fs";

export class FilesInfo {
  experimentDateTime = new Date();
  fileNumber = 1;
  files = [];
  sourceFolder = "source_folder";
  totalFileSize = 0;

  constructor(source_folder: string) {
    //this.getDirInfo(source_folder);
    this.sourceFolder = source_folder;
    this.checkIfDirectory(source_folder);
  }

  checkIfDirectory(path: string) {
    const stats = lstatSync(path);
    if (stats.isDirectory()) {
      console.log("is dir");
      this.getDirInfo(path);
    } else {
      console.log("is file");
      const fileEntry = this.getFileInfo(path);
      this.files.push(fileEntry);
      this.totalFileSize = fileEntry.size;
      this.fileNumber = 1;
    }
  }

  getDirInfo(source_folder: string) {
    const file_names = readdirSync(source_folder);
    console.log(source_folder);
    console.log(file_names);

    let fileNumber = 0;

    for (const file of file_names) {
      fileNumber += 1;
      const longName = source_folder + "/" + file;
      const fileEntry = this.getFileInfo(longName);
      this.totalFileSize += fileEntry.size;
      this.files.push(fileEntry);
      if (fileNumber > 1000) {
        break;
      }
      const fileName: string = file;
      if (fileName.endsWith(".nxs")) {
        console.log("NeXus");
        // const h5 = new GetH5Info();
        // const obj = h5.getInfo(longName);
        // console.log(obj);
      }
    }

    this.fileNumber = fileNumber;
    console.log(this.fileNumber);
  }

  private getFileInfo(longName: string) {
    const stats = statSync(longName);
    const relativeName = longName.replace("/users/detector", "/static");
    this.experimentDateTime = new Date(stats.mtime);
    const fileEntry = {
      path: relativeName,
      size: stats.size,
      time: stats.mtime,
      chk: "string",
      uid: stats.uid,
      gid: stats.gid,
      perm: "755"
    };
    return fileEntry;
  }
}

if (require.main === module) {
  const fix = new FilesInfo("demo/nicos_00000490.hdf");
  console.log(fix.files);
}
