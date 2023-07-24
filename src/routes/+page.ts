import type { PageLoad } from './$types'
import storyblok from '$lib/storyblok'
import type { StoryblokStory, HomeGalleryStoryblok } from '$lib/storyblok'

export const load = (async ({ params }) => {
	const data = (await storyblok.getStory('home-gallery', {})).data
		.story as StoryblokStory<HomeGalleryStoryblok>
	return { assets: data.content.assets }
}) satisfies PageLoad
