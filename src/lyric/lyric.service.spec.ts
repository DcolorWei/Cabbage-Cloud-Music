import { Test, TestingModule } from '@nestjs/testing';
import { LyricService } from './lyric.service';

describe('LyricService', () => {
  let service: LyricService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LyricService],
    }).compile();

    service = module.get<LyricService>(LyricService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
