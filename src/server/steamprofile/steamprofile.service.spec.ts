import { Test, TestingModule } from '@nestjs/testing';
import { SteamProfileService } from './steamProfile.service';

describe('SteamprofileService', () => {
  let service: SteamProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamProfileService],
    }).compile();

    service = module.get<SteamProfileService>(SteamProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
