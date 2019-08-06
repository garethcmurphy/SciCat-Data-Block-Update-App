import { expect } from "chai";
import "mocha";
import { FilesInfo } from "../src/filesinfo";

describe("check files", () => {
  it("should have property files", () => {
    const result = new FilesInfo("demo");
    expect(result).to.have.property("files");
  });

  it("should not fail for single file", () => {
    const result = new FilesInfo("demo/x.h5");
    expect(result).to.have.property("files");
  });
});
