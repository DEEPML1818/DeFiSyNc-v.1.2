use solana_program::{
    account_info::AccountInfo, entrypoint, entrypoint::ProgramResult, msg, pubkey::Pubkey,
    program_error::ProgramError, program_pack::{IsInitialized, Pack},
};
use spl_token::state::Account as TokenAccount;
use spl_token::instruction::transfer;

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
    let token_account = accounts[1]; // User's token account (SPL token)
    let bridge_account = accounts[2]; // Bridge's token account
    let token_program = accounts[3]; // Token Program account

    msg!("Locking {} tokens for {}", amount, locker);

    // Transfer tokens from user's token account to bridge's token account
    let transfer_ix = transfer(
        token_program.key,
        token_account.key,
        bridge_account.key,
        locker,
        &[],
        amount,
    )?;

    solana_program::program::invoke(
        &transfer_ix,
        &[token_account.clone(), bridge_account.clone(), token_program.clone()],
    )?;

    msg!("Event: Tokens locked");

    Ok(())
}

pub fn process_unlock(
    _program_id: &Pubkey,
    accounts: &[AccountInfo],
    amount: u64,
) -> ProgramResult {
    let unlocker = accounts[0].key; // Account unlocking the tokens
    let bridge_account = accounts[1]; // Bridge's token account
    let token_account = accounts[2]; // User's token account
    let token_program = accounts[3]; // Token Program account

    msg!("Unlocking {} tokens for {}", amount, unlocker);

    // Transfer tokens back from bridge's token account to user's token account
    let transfer_ix = transfer(
        token_program.key,
        bridge_account.key,
        token_account.key,
        unlocker,
        &[],
        amount,
    )?;

    solana_program::program::invoke(
        &transfer_ix,
        &[bridge_account.clone(), token_account.clone(), token_program.clone()],
    )?;

    msg!("Event: Tokens unlocked");

    Ok(())
}

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
