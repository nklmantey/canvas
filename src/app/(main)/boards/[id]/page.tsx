export default async function BoardPage({
  params,
}: {
  params: { id: string }
}) {
  const board = { name: 'test' }

  return <div>{board.name}</div>
}
