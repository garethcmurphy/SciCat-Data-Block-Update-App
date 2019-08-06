class FixBlocks {
  api_url = "https://scicatapi.esss.dk/api/v3";



  fix() {

    console.log("fix");
  }



}

if (require.main === module) {
  const fix = new FixBlocks();
  fix.fix();
}
