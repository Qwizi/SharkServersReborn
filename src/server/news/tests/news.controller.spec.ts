import { Test, TestingModule } from '@nestjs/testing';
import { CrudRequest } from '@nestjsx/crud';
import { execPath } from 'process';
import { NewsV2Controller } from '../controllers/news.controller';
import { NewsService } from '../services/news.service';

describe('NewsController', () => {
  let controller: NewsV2Controller;
  let service: NewsService;
  const mockNewsService = {};
  const req: CrudRequest = { parsed: null, options: null };
  const newsServiceProvider = {
    provide: NewsService,
    useFactory: () => ({
      createOne: jest.fn(() => []),
      getMany: jest.fn(() => []),
    }),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NewsV2Controller],
      providers: [NewsService],
    })
      .overrideProvider(NewsService)
      .useValue(mockNewsService)
      .compile();

    controller = module.get<NewsV2Controller>(NewsV2Controller);
    service = module.get<NewsService>(NewsService);
  });

  it('shoult be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should be able to get news', async () => {
    const response = {
      data: [],
      count: 0,
      total: 0,
      page: 1,
      pageCount: 1,
    };
    controller.base.getManyBase(req);
    expect(service.repo.getMany()).toHaveBeenCalled();
  });
});
