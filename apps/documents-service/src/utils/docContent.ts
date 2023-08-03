// document.helper.ts
import { Configuration, OpenAIApi } from 'openai';
export async function docContent(
  genre: string,
  openAiConfiguration: Configuration,
): Promise<string> {
  let prompt;

  switch (genre) {
    case 'Book':
    case 'Short Story':
      prompt = 'Please generate an opening sentence for a book.';
      break;
    case 'Songs':
      prompt = 'Please generate an opening line for a song.';
      break;
    case 'Diary':
      prompt = 'Please generate an opening sentence for a diary entry.';
      break;
    case 'Poems':
      prompt = 'Please generate an opening line for a poem.';
      break;
    case 'General':
      prompt = 'Please generate an opening sentence for a general document.';
      break;
    default:
      return 'Document';
  }

  try {
    const openai = new OpenAIApi(openAiConfiguration);
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 60,
      temperature: 0,
    });

    if (response?.data?.choices?.[0]?.text) {
      return response.data.choices[0].text.trim() + '..';
    } else {
      console.error('Unexpected API response:', response);
      return 'Share whats on your mind...';
    }
  } catch (error) {
    console.error(error);
    return 'Share whats on your mind...';
  }
}
