import PostUserDto from './post-dto'

describe('PostUserDto', () => {
  const email = 'name@gmail.com'
  const postDto = PostUserDto.with({ email })

  it.concurrent('has an email', () => {
    expect(postDto).toHaveProperty('email')
  })

  it.concurrent('can be created', () => {
    expect(postDto.email).toBe(email)
  })
})
