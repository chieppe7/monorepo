export async function loginRequest(email: string, password: string) {
  const res = await fetch('http://localhost:3333/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  if (!res.ok) {
    throw new Error('Backend offline ou erro de login')
  }

  return await res.json()
}