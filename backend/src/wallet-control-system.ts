interface BRC20Inscription {
  p: string;
  op: string;
  tick: string;
  amt: string;
}

class WalletControlSystem {
  private brc20Balances: Map<string, number> = new Map();

  mintBRC20(tick: string, amt: string): BRC20Inscription {
    if (!tick) {
      throw new Error('BRC-20 tick must not be empty');
    }

    const amount = Number(amt);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new Error('Invalid BRC-20 mint amount');
    }

    const current = this.brc20Balances.get(tick) ?? 0;
    this.brc20Balances.set(tick, current + amount);

    return {
      p: 'brc-20',
      op: 'mint',
      tick,
      amt,
    };
  }

  getBRC20Balance(tick: string): number {
    return this.brc20Balances.get(tick) ?? 0;
  }
}

export default WalletControlSystem;
