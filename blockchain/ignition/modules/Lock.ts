import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

//npx hardhat ignition deploy ./ignition/modules/Lock.ts --network localhost

const ONE_GWEI: bigint = 1_000_000_000n;

const LockModule = buildModule("LockModule", (m) => {
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock");

  return { lock };
});

export default LockModule;