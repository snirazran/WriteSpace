import { Injectable } from '@nestjs/common';
import { Configuration } from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenAiService {
  private openAiConfiguration: Configuration;

  constructor(private configService: ConfigService) {
    this.openAiConfiguration = new Configuration({
      organization: 'org-qvVjUpUUuLXeAFquQnr9D2k0',
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  getConfiguration(): Configuration {
    return this.openAiConfiguration;
  }
}
