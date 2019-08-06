var H5Type = require("hdf5/lib/globals.js").H5Type;

const hdf5 = require("hdf5").hdf5;
const h5lt = require("hdf5").h5lt;
var bignum = require("bignum");

const Access = require("hdf5/lib/globals").Access;

var HLType = require("hdf5/lib/globals.js").HLType;

export class GetH5Info {
  filename: string;
  constructor() {
    this.filename = "V20_ESSIntegration_2018-12-10_1009.nxs";
  }

  geth5member(id: string, name: string) {
    const member = h5lt.readDataset(id, name);
    return member;
  }

  getInfo(fileName: string) {
    const file = new hdf5.File(fileName, Access.ACC_RDONLY);
    let nexusInfo = {};
    const rootGroups = file.getMemberNames();
    const attrs = file.getDatasetAttributes("/");
    console.log(attrs);
    console.log("rootGroups", rootGroups);
    if (rootGroups.includes("entry")) {
      let entryGroup = file.openGroup("/entry/");
      let entryMembers = entryGroup.getMemberNames();
      if (entryMembers.includes("start_time")) {
        const type = entryGroup.getChildType("start_time");
        console.log("type", type);
        const starttimeBuffer = h5lt.readDatasetAsBuffer(
          entryGroup.id,
          "start_time",
          {count: [25]}
        );
        console.log("start_time buffer length", starttimeBuffer.length);
        console.log("ascii string", starttimeBuffer.toString("ascii"));
        console.log("utf8 string", starttimeBuffer.toString("utf8"));
        console.log("raw buffer", starttimeBuffer);
        //console.log("dtime", JSON.stringify(dtime.readUIntBE(0,2),null,2));
      }

      if (entryMembers.includes("instrument")) {
        nexusInfo["instrument"] = {};
        const instrumentGroup = entryGroup.openGroup("instrument");
        const instrumentMembers = instrumentGroup.getMemberNames();
        let myvar = "name";
        if (instrumentMembers.includes(myvar)) {
          const name = h5lt.readDataset(instrumentGroup.id, myvar);
          console.log("name", name);
        }
      }
      if (entryMembers.includes("features")) {
        const featBuf = h5lt.readDatasetAsBuffer(entryGroup.id, "features", {
          count: [3]
        });
        console.log("feature length", featBuf.length);
        console.log(featBuf);
        const feature1 = featBuf.slice(0, 8);
        const feature2 = featBuf.slice(8, 16);
        const feature3 = featBuf.slice(16, 24);
        console.log(
          bignum.fromBuffer(feature1, { size: 8, endian: "little" }).toString()
        );
        console.log(
          bignum.fromBuffer(feature2, { size: 8, endian: "little" }).toString()
        );
        console.log(
          bignum.fromBuffer(feature3, { size: 8, endian: "little" }).toString()
        );
        //console.log("features2", JSON.stringify(features,null,2));
      }

      if (entryMembers.includes("sample")) {
        nexusInfo["sample"] = {};
        const sampleGroup = entryGroup.openGroup("sample");
        const sampleMembers = sampleGroup.getMemberNames();

        let myvar = "description";
        if (sampleMembers.includes(myvar)) {
          console.log("there is ", myvar);
          var array = h5lt.readDataset(sampleGroup.id, myvar);
          console.dir(array.length);
          if (array.constructor.name === "Array") {
            for (var mIndex = 0; mIndex < array.length; mIndex++) {
              console.dir(array[mIndex]);
            }
          }
          console.log("description", array);
          console.log("description", array.toString());
          console.log("description", array[0]);
        } else {
          console.log("no description ");
        }
      }
    } else {
      console.log("no field called entry in nxs groups");
    }
    file.close();
    return nexusInfo;
  }
}

if (require.main === module) {
  const h5 = new GetH5Info();
  const nxinfo = h5.getInfo("demo/v20-2018-12-19T08:17:32+0100.nxs");
  console.log(JSON.stringify(nxinfo, null, 2));
}
