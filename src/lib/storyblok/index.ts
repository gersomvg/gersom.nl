import StoryblokClient from 'storyblok-js-client'

export default new StoryblokClient({
	accessToken: 'wrWBq6NnoZe39hhlW6MhNwtt',
})

export type { StoryblokStory } from 'storyblok-generate-ts'

export { getResized, getSrcset } from './get-resized'

export type * from './storyblok'
