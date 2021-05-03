export const MEDIA_VIDEO = 1;
export const MEDIA_IMAGE = 2;

export const MEDIA_CONTENT = 0;
export const MEDIA_AVATAR = 1;
export const MEDIA_COVER = 2;
export const MEDIA_STORY = 3;

export const MAX_SIZE_VIDEO_MEDIA_FILE = 50000000;
export const MAX_SIZE_IMAGE_MEDIA_FILE = 5000000;

export const TYPE_JPEG = "image/jpeg";
export const TYPE_PJPEG = "image/pjpeg";
export const TYPE_GIF = "image/gif";
export const TYPE_XPNG = "image/x-png";
export const TYPE_PNG = "image/png";
export const TYPE_MP4 = "video/mp4";
export const TYPE_MOV = "video/quicktime";
export const TYPE_WEBM = "video/webm";
export const TYPE_OGG = "video/ogg";

export const MEDIA_GROUP_TYPE = {
  IMAGE: "Image",
  VIDEO: "Video",
};

export const MEDIA_TYPE = {
  [TYPE_JPEG]: MEDIA_GROUP_TYPE.IMAGE,
  [TYPE_PJPEG]: MEDIA_GROUP_TYPE.IMAGE,
  [TYPE_GIF]: MEDIA_GROUP_TYPE.IMAGE,
  [TYPE_XPNG]: MEDIA_GROUP_TYPE.IMAGE,
  [TYPE_PNG]: MEDIA_GROUP_TYPE.IMAGE,
  [TYPE_MP4]: MEDIA_GROUP_TYPE.VIDEO,
  [TYPE_MOV]: MEDIA_GROUP_TYPE.VIDEO,
  [TYPE_WEBM]: MEDIA_GROUP_TYPE.VIDEO,
  [TYPE_OGG]: MEDIA_GROUP_TYPE.VIDEO,
};

