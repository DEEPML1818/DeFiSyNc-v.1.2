async function main() {
    const ZKRollup1 = await ethers.getContractFactory("ZKRollup1");
    const rollup1 = await ZKRollup1.deploy();

    await rollup1.deployed();
    console.log("zk-Rollup 1 deployed to:", rollup1.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
