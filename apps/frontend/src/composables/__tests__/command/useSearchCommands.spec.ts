import { useCommand, useSearchCommands } from '@/composables/command';
import { beforeAll, beforeEach, describe, expect, it } from 'vitest';

describe('useSearchCommands', () => {
  beforeEach(() => {
    const { resetSearchCommands } = useSearchCommands();

    resetSearchCommands();
  });

  beforeAll(() => {
    const { addCommand } = useCommand();

    addCommand({
      name: '主页',
      execute() {},
    });

    addCommand({
      name: '切换',
      execute() {},
    });
  });

  it('should be search a command', () => {
    const { searchCommands, filteredCommands } = useSearchCommands();

    searchCommands('主页');

    expect(filteredCommands.value.length).toBe(1);
  });

  it('should be search all commands', () => {
    const { searchCommands, filteredCommands } = useSearchCommands();

    searchCommands('');

    expect(filteredCommands.value.length).toBe(2);
  });
});
