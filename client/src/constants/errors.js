export const getErrorMaxFileSize = (name, size) => 
  `The file with name '${name}' exceeded a max size ${size}`;

export const getErrorMaxFilesCount = (size) => 
  `Exceeded a max files count ${size}`;