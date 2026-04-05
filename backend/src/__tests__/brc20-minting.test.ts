import WalletControlSystem from '../wallet-control-system';
import bitcoinWalletConfig from '../bitcoin-wallet-config';

describe('BRC-20 Minting', () => {
  it('should create a valid BRC-20 mint inscription', () => {
    const wallet = new WalletControlSystem();
    const inscription = wallet.mintBRC20('smoovhogg', '1000');

    expect(inscription.p).toBe('brc-20');
    expect(inscription.op).toBe('mint');
    expect(inscription.tick).toBe('smoovhogg');
    expect(inscription.amt).toBe('1000');
  });

  it('should update BRC-20 balance after minting', () => {
    const wallet = new WalletControlSystem();
    wallet.mintBRC20('smoovhogg', '1000');

    expect(wallet.getBRC20Balance('smoovhogg')).toBe(1000);
  });

  it('should accumulate BRC-20 balance on multiple mints', () => {
    const wallet = new WalletControlSystem();
    wallet.mintBRC20('smoovhogg', '1000');
    wallet.mintBRC20('smoovhogg', '500');

    expect(wallet.getBRC20Balance('smoovhogg')).toBe(1500);
  });

  it('should return 0 for unminted BRC-20 token', () => {
    const wallet = new WalletControlSystem();
    expect(wallet.getBRC20Balance('unknown')).toBe(0);
  });

  it('should throw on invalid mint amount', () => {
    const wallet = new WalletControlSystem();
    expect(() => wallet.mintBRC20('smoovhogg', 'invalid')).toThrow('Invalid BRC-20 mint amount');
  });

  it('should throw on negative mint amount', () => {
    const wallet = new WalletControlSystem();
    expect(() => wallet.mintBRC20('smoovhogg', '-10')).toThrow('Invalid BRC-20 mint amount');
  });

  it('should throw on empty tick', () => {
    const wallet = new WalletControlSystem();
    expect(() => wallet.mintBRC20('', '1000')).toThrow('BRC-20 tick must not be empty');
  });

  it('should have BRC-20 config in bitcoin wallet config', () => {
    expect(bitcoinWalletConfig.brc20).toBeDefined();
    expect(bitcoinWalletConfig.brc20.inscription).toBeDefined();

    const inscription = bitcoinWalletConfig.brc20.inscription;
    expect(inscription.p).toBe('brc-20');
    expect(inscription.op).toBe('mint');
    expect(inscription.tick).toBe('smoovhogg');
    expect(inscription.amt).toBe('1000');
  });
});
