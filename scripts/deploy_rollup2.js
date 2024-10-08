async function main() {
    const ZKRollup2 = await ethers.getContractFactory("ZKRollup2");
    const rollup2 = await ZKRollup2.deploy();

    await rollup2.deployed();
    console.log("zk-Rollup 2 deployed to:", rollup2.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
