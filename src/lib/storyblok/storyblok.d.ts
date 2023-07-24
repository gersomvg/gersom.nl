import {StoryblokStory} from 'storyblok-generate-ts'

export type MultiassetStoryblok = {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  [k: string]: any;
}[];

export interface HomeGalleryStoryblok {
  assets: MultiassetStoryblok;
  _uid: string;
  component: "home-gallery";
  [k: string]: any;
}
