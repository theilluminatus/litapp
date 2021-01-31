import { Author } from '../models/author';

export const handleNoCordovaError = (error: any, alternative?: (error: any) => void) => {
  // perhaps multiple ways to check for same error are needed
  if (error === 'cordova_not_available') {
    if (alternative) {
      alternative(error);
    }
  } else {
    console.error(error);
    throw error;
  }
};

export const getAuthorPageUrl = (author: Author): string =>
  `https://www.literotica.com/stories/memberpage.php?uid=${author.id}&page=submissions`;
