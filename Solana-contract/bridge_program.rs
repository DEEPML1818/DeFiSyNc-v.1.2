use solana_program::{
    account_info::AccountInfo,
    entrypoint,
    entrypoint::ProgramResult,
    program_error::ProgramError,
    pubkey::Pubkey,
    msg,
    program_pack::{Pack, IsInitialized},
};

pub struct Bridge {
    pub locked_tokens: u64,  // Amount of tokens locked
    pub locker: Pubkey,      // User who locked the tokens
}

impl IsInitialized for Bridge {
    fn is_initialized(&self) -> bool {
        self.locked_tokens > 0
    }
}

pub fn process_lock(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let locker = accounts[0].key; // Account locking the tokens
    msg!("Locking {} tokens for {}", amount, locker);

    // Emit event or trigger cross-chain messaging
    msg!("Event: Tokens locked");

    // Here you would actually lock the tokens, omitted for brevity

    Ok(())
}

pub fn process_unlock(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let unlocker = accounts[0].key; // Account unlocking the tokens
    msg!("Unlocking {} tokens for {}", amount, unlocker);

    // Transfer tokens back to user (implement real unlocking logic)
    msg!("Event: Tokens unlocked");

    Ok(())
}

// Define the entrypoint to call the locking/unlocking functions
entrypoint!(process_instruction);
pub fn process_instruction(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    let (operation, amount) = (instruction_data[0], u64::from_le_bytes(instruction_data[1..9].try_into().unwrap()));

    match operation {
        0 => process_lock(_program_id, accounts, amount),
        1 => process_unlock(_program_id, accounts, amount),
        _ => Err(ProgramError::InvalidInstructionData),
    }
}
