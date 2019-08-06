class FixBlocks {



  fix() {

    console.log("fix");
  }



}

if (require.main === module) {
  const fix = new FixBlocks();
  fix.fix();
}
