export const handleNoCordovaError = (error: any, alternative?: (error: any) => void) => {
  // perhaps multiple ways to check for same error are needed
  if (error === 'cordova_not_available') {
    if (alternative) {
      alternative(error);
    }
  } else {
    throw error;
  }
};

// Used for downloading json files when webapp is used
export const downloadTextFile = (text: string, filename: string): void => {
  const url = window.URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
  const a = document.createElement('a');
  a.style.display = 'none';
  document.body.appendChild(a);
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
