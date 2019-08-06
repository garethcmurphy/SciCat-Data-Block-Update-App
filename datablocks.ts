class FixBlocks {

    fix() {
        console.log("fix");
    }

}


if (require.main === module) {
    // this module was run directly from the command line as in node xxx.js
    const fix = new FixBlocks()
    fix.fix()
}