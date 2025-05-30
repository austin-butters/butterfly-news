// All other components will be exported into this component in some way - make use of react routing and <Outlet /> s.
import { useEffect, useState } from 'react'
import FrontEndTesting from './FrontEndTesting'
import News from './StoryPreviewBox'
import Nav from './Nav'
import { useQuery } from '@tanstack/react-query'
import { getNews } from '../apis/nytApiClient'
import generateFullStoryArray from '../modules/generate-full-story-array'
import { getAIStory } from '../apis/geminiApiClient'

function App() {
  const [selectedDate, setSelectedDate] = useState('')

  function handleDateChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedDate(event.target.value)
  }

  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ['news'],
    queryFn: () => getNews(),
  })

  const {
    data: aiData,
    isPending: isPendingAi,
    isError: isErrorAi,
    error: errorAi,
  } = useQuery({
    queryKey: ['getAIStory'],
    queryFn: () => getAIStory('today', 'any topic'),
  })

  const getStoryArray = () => {
    return generateFullStoryArray(aiData, data)
  }

  const getAllwaysDisplayedContent = () => {
    return (
      <>
        <hr className="line" />
        <header className="header">
          <div className="headline">
            <div className="icon-left">☰</div>
            <h1>Butterfly News</h1>
          </div>
          <hr className="line" />
          <hr className="line" />
        </header>
      </>
    )
  }

  if (isPending || isPendingAi) {
    return (
      <>
        {getAllwaysDisplayedContent()}
        <p>Loading NYT...</p>
      </>
    )
  }

  if (isError || isErrorAi) {
    return (
      <>
        {getAllwaysDisplayedContent()}
        <p>{error.message}</p>
      </>
    )
  }

  console.log('All objects have been returned in an array: ', data)

  return (
    <div id="news">
      {getAllwaysDisplayedContent()}
      <Nav selectedDate={selectedDate} onDateChange={handleDateChange} />
      <input
        className="date"
        type="date"
        id="date-input"
        value="2025-05-30"
        onChange={() => refetch()}
      />

      <main className="content">
        <section className="featured"></section>

        <section className="grid" id="news-grid">
          {/* News articles will be inserted here */}
          {getStoryArray().map((storyObj, i) => {
            return (
              <>
                <h2>{storyObj.heading}</h2>
                <p>{storyObj.body}</p>
              </>
            )
          })}
        </section>
      </main>

      <div className="app">
        <FrontEndTesting />
        {/* <News /> */}
      </div>
    </div>
  )
}

export default App
