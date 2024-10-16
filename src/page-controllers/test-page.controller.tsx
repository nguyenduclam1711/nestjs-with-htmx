import { Controller, Get, Inject } from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { RenderingService } from 'src/services/rendering.service';
import PageWrapper from 'src/views/commons/page-wrapper';
import Table from 'src/views/components/table';

@Controller('/test-page')
export class TestPageController {
  constructor(
    @Inject(RenderingService)
    private renderingService: RenderingService,
  ) {}

  @Public()
  @Get()
  renderTestPage() {
    return this.renderingService.render(
      <PageWrapper title="Test page">
        <Table
          columns={[
            {
              title: 'Id',
              dataKey: ['id'],
            },
            {
              title: 'Name',
              dataKey: ['name'],
            },
          ]}
          dataSource={Array.from(Array(10)).map((_, index) => ({
            id: index,
            name: `name ${index}`,
          }))}
        />
        ,
      </PageWrapper>,
    );
  }
}
