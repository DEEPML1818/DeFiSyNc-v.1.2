const anchor = require('@project-serum/anchor');
const { SystemProgram } = anchor.web3;

describe('my-bridge-test', () => {
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.MyBridgeProgram;

  it('Locks tokens', async () => {
    const bridgeAccount = anchor.web3.Keypair.generate();

    // Assuming the token account setup is handled in your program logic
    const userTokenAccount = anchor.web3.Keypair.generate();
    const bridgeTokenAccount = anchor.web3.Keypair.generate();

    const amount = 100;  // The amount of tokens to lock

    // Call the lock function from your program
    await program.rpc.processLock(
      new anchor.BN(amount),
      {
        accounts: {
          bridge: bridgeAccount.publicKey,
          userTokenAccount: userTokenAccount.publicKey,
          bridgeTokenAccount: bridgeTokenAccount.publicKey,
          tokenProgram: anchor.web3.TokenProgram.programId,
        },
        signers: [bridgeAccount]
      }
    );

    console.log("Tokens locked successfully!");
  });

  it('Unlocks tokens', async () => {
    const bridgeAccount = anchor.web3.Keypair.generate();

    const userTokenAccount = anchor.web3.Keypair.generate();
    const bridgeTokenAccount = anchor.web3.Keypair.generate();

    const amount = 100;  // The amount of tokens to unlock

    // Call the unlock function from your program
    await program.rpc.processUnlock(
      new anchor.BN(amount),
      {
        accounts: {
          bridge: bridgeAccount.publicKey,
          userTokenAccount: userTokenAccount.publicKey,
          bridgeTokenAccount: bridgeTokenAccount.publicKey,
          tokenProgram: anchor.web3.TokenProgram.programId,
        },
        signers: [bridgeAccount]
      }
    );

    console.log("Tokens unlocked successfully!");
  });
});
