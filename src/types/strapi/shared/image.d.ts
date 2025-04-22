export interface Image {
  id:                number;
  documentId:        string;
  name:              string;
  alternativeText:   string;
  caption:           null;
  width:             number;
  height:            number;
  formats:           Formats;
  hash:              string;
  ext:               EXT;
  mime:              MIME;
  size:              number;
  url:               string;
  previewUrl:        null;
  provider:          string;
  provider_metadata: null;
  createdAt:         Date;
  updatedAt:         Date;
  publishedAt:       Date;
}

export enum EXT {
  PNG = '.png',
}

export interface Formats {
  large:     Large;
  small:     Large;
  medium:    Large;
  thumbnail: Large;
}

export interface Large {
  ext:         EXT;
  url:         string;
  hash:        string;
  mime:        MIME;
  name:        string;
  path:        null;
  size:        number;
  width:       number;
  height:      number;
  sizeInBytes: number;
}

export enum MIME {
  ImagePNG = 'image/png',
}