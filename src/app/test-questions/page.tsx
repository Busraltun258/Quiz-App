import Question from "@/components/Question"

async function getData() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const data = await res.json()
  return data.slice(0, 10)
}

const TestQuestion = async () => {
  const data = await getData()
  return (
    <div>
      <Question data={data} />
    </div>
  )
}

export default TestQuestion
