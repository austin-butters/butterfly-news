import { useQuery } from '@tanstack/react-query'
import { getAIStory } from '../apis/geminiApiClient'
import { useState } from 'react'
import placeholder from '../../placeholdernews.json'

function FrontEndTesting() {
  const [formState, setFormState] = useState({ prompt: 'any topic' })
  const [date, setDate] = useState('2025-05-30')

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ['getAIStory'],
    queryFn: () => getAIStory(date, formState.prompt),
  })

  if (isPending) {
    return <p>Loading the news</p>
  }

  if (isError) {
    return <p>There was an error loading data.</p>
  }

  async function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault()
    console.log('submit', formState.prompt, date)
    refetch()
  }

  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.currentTarget
    setFormState((prev) => ({ ...prev, [name]: value }))
  }
  function handleDate(evt: ChangeEvent<HTMLInputElement>) {
    setDate(evt.target.value)
  }

  return (
    <>
      {/* <div className="app"> */}
      {/*  <h2>{data.heading}</h2>
        {data.body.split('\n').map((line, i) => {
          return <p key={i}>{line}</p>
        })}
      </div> */}
      {/* <div>
        {placeholder.map((x, i) => {
          return (
            <>
              <h2 key={'h' + i}>{x.heading}</h2>
              <p key={'p' + i}>{x.body}</p>
            </>
          )
        })}
      </div> */}
      <div id="formDiv">
        <form onSubmit={handleSubmit} className="form">
          <div id="bne">Butterfly News Effect: </div>
          <label htmlFor="prompt">What happened: </label>
          <input
            name="prompt"
            id="prompt"
            value={formState.prompt}
            onChange={handleChange}
            autoComplete="off"
          />

          <span> On the date: </span>
          <input
            className="date"
            type="date"
            id="date-input"
            value={date}
            onChange={handleDate}
          />
          <button onClick={handleChange}>ENTER</button>
        </form>
      </div>
    </>
  )
}

export default FrontEndTesting
