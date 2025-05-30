// This function takes an existing array of real story objects from the NYT api, as well as a single story object from Google's ai API.
// It returns a single array of all stories, starting with the AI one.

interface storyObj {
  heading: string
  body: string
}

function generateFullStoryArray(
  aiStory: storyObj,
  nytStories: storyObj[],
): storyObj[] {
  return [aiStory, ...nytStories]
}

export default generateFullStoryArray
